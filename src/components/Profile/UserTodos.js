import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_USER_TODOS } from '../../queries';
import { formatDate } from '../../Constants';
import Spinner from '../Spinner';
import './Profile.css'

const UserTodos = ({
  username,
}) => (
  <Query query={GET_USER_TODOS} variables={{ username }}>
    {({ data, loading, error }) => {
      if(loading) return <Spinner />
      if(error) return <div>Error...</div>
      console.log(data);
      return (
        <div className="userinfo">
          <h3>Your Todos</h3>
          <ul>
            {data.getUserTodos.map(todo => (
              <li key={todo._id}>
                <Link to={`/todos/${todo._id}`}>
                  <h4>{todo.name}</h4>
                </Link>
                <img className="thumbnail" src={todo.imageUrl} alt={todo.name} />
                <p>{formatDate(todo.due)}</p>
              </li>
            ))}
          </ul>
          {!data.getUserTodos.length && (
            <p>You currently have no todos. Add one!</p>
          )}
        </div>
      )
    }}
  </Query>
);

export default UserTodos;
