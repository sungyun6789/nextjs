/*
회원가입 프로세스
1. api method가 POST인지 확인한다.
2. req.body에 필요한 값이 전부 들어 있는지 확인한다.
3. email이 중복인지 확인한다.
4. 패스워드를 암호화한다.
5. 유저 정보를 추가한다.
6. 추가된 유저의 정보와 token을 전달한다.
*/
import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import bcrypt from 'bcryptjs';
import { StoredUserType } from '../../../types/user';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // 1
  if (req.method === 'POST') {
    // 2
    const { email, firstname, lastname, password, birthday } = req.body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }

    // 3
    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 409;
      res.send('이미 가입된 이메일입니다.');
    }

    // 4
    const hashedPassword = bcrypt.hashSync(password, 8);

    // 5
    const users = Data.user.getList();
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }
    const newUser: StoredUserType = {
      id: userId,
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      profileImage: '/static/image/user/default_user_profile_image.jpg',
    };

    Data.user.write([...users, newUser]);

    // access_token 이라는 쿠키명에 토큰을 저장하며 path는 '/', expires로 지금 시간에 3일을 더해 만료일을 정하고 httponly를 사용하여
    // api통신에서만 쿠키 값을 불러올 수 있고, http 이외의 접근은 불가능하도록 하였습니다.
    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
    const Expires = new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toUTCString();
    res.setHeader('Set-Cookie', `access_token=${token}; Expires=${Expires}; HttpOnly; Path=/;`);

    const newUserWithPassword: Partial<Pick<StoredUserType, 'password'>> = newUser;

    delete newUserWithPassword.password; // 비밀번호는 보안상 전달하지 않음
    res.statusCode = 200;
    return res.send(newUser);
  }

  res.statusCode = 405;

  return res.end();
};
