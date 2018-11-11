import React from 'react';
import { formatDate } from '../../Constants';
import { Link } from 'react-router-dom';
import './Profile.css';

const UserInfo = ({ session }) => (
  <div className="userinfo">
    <div className="userBlock">
      <h3>User Info</h3>
      <p>Username: {session.getCurrentUser.username}</p>
      <p>Email: {session.getCurrentUser.email}</p>
      <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
    </div>
    <h2>{session.getCurrentUser.username}'s Completed Todos</h2>
    <ul className="completedProfileTodo">
      {session.getCurrentUser.completed.map(todo => (
        <li key={todo._id}>
          <Link to={`/todos/${todo._id}`}>
            <h4>{todo.name}</h4>
          </Link>
        </li>
      ))}
    </ul>
    {!session.getCurrentUser.completed.length && (
      <p>You have no completed todos currently. Start working!</p>
    )}
  </div>
);

export default UserInfo;
