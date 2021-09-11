import jwt from 'jsonwebtoken';
import { NextApiResponse, NextApiRequest } from 'next';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

// API를 요청하여 쿠키가 잘 전달되었는지 확인
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const accessToken = req.headers.cookie;
      if (!accessToken) {
        res.statusCode = 400;
        return res.send('access_token이 없습니다.');
      }
      const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);

      const user = Data.user.find({ id: Number(userId) });
      if (!user) {
        res.statusCode = 404;
        return res.send('해당 유저가 없습니다.');
      }
      const userWithoutPassword: Partial<Pick<StoredUserType, 'password'>> = user;

      delete userWithoutPassword.password;
      res.statusCode = 200;
      return res.send(userWithoutPassword);
    } catch (error) {
      res.statusCode = 500;
      return res.send(error);
    }
  }
  res.statusCode = 405;

  return res.end();
};
