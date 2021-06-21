import './styles.css';

import { crearTodoHtml } from './js/componentes'
import { Todo, TodoList} from './classes'

export const todoList = new TodoList();
// Mandar a llamar el procedimiento crearTodoHtml por cada todo
todoList.todos.forEach( crearTodoHtml );
// todoList.todos.forEach( todo => crearTodoHtml( todo ));

