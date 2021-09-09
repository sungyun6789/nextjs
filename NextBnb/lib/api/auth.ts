// 사용자 인증에 관련된 api를 모아놓은 파일
import axios from 'axios';
import { UserType } from './../../types/user.d';

//* 회원가입 body
interface SingUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

export const signupAPI = (body: SingUpAPIBody) => axios.post<UserType>('/api/auth/signup', body);

// 로그인 api
export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>('/api/auth/login', body);
