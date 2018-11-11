import React from "react";
import { Link } from 'react-router-dom';
import { formatDate } from "../../Constants";
import "./TodoList.css";

export const TodoList = ({ data }) => (
  <div>
    <div className="todoList">
      {data.getAllTodos.map(todo => (
        <div
          key={todo._id}
          className="todoListSingle"
          style={{ background: `url(${todo.imageUrl}) center center / cover no-repeat`}}
        >
          <div>
            <Link to={`/todos/${todo._id}`}>
              <h2>{todo.name}</h2>
            </Link>
          </div>
          <div className={`category ${todo.category}`}>
            <h4>{todo.category}</h4>
          </div>
          <div className="dueTodo">Due: {formatDate(todo.due)}</div>
        </div>
      ))}
    </div>
  </div>
);
export default TodoList;
