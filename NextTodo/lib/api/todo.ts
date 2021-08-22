// .은 ./index 와 같은 의미
import axios from '.';
import { TodoType } from '../../types/todo';

// 투두리스트 불러오기
export const getTodosAPI = () => axios.get<TodoType[]>('api/todos');

// 투두 체크하기
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);

// 투두 추가하기 API Body
interface AddTodoAPIBody {
  text: string;
  color: TodoType['color'];
}

// 투두 추가하기 API
export const addTodoAPI = (body: AddTodoAPIBody) => axios.post('/api/todos', body);

// 투두 삭제하기 API
export const deleteTodoAPI = (id: number) => axios.delete(`/api/todos/${id}`);