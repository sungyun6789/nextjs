// UserType이 아닌 StoredUserType이라고 한 이유는 클라이언트에서 사용하는 user 데이터에는 password를 제공하지 않을 예정이기 때문
export type StoredUserType = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};
