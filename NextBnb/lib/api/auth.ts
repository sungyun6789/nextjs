// 사용자 인증에 관련된 api를 모아놓은 파일
import axios from 'axios';
import { UserType } from './../../types/user.d';

export const signupAPI = (body: UserType) => axios.post<UserType>('/api/auth/signup', body);
