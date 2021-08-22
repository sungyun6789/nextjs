// d.ts는 타입스크립트 코드의 타입 추론을 돕는 파일이다.
export type TodoType = {
  id: number;
  text: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy';
  checked: boolean;
};
