// .은 ./index 와 같은 의미
import axios from '.';
import { TodoType } from '../../types/todo';

// 투두리스트 불러오기
export const getTodosAPI = () => axios.get<TodoType[]>('api/todos');

// 투두 체크하기
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);
