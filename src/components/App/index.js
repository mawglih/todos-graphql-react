import React from 'react';
import { GET_ALL_TODOS } from '../../queries';
import { Query } from 'react-apollo';
import TodoList from '../Todos/TodoList';
import Spinner from '../Spinner';
import './App.css';

const App = () => (
  <div className="App">
    <h1>LIST OF ALL TODOS</h1>
    <Query query={GET_ALL_TODOS}>
      {({
        data,
        loading,
        error
      }) => {
        if(loading) return <Spinner />
        if(error) return <div>Error occured</div>
        console.log('data in App: ', data);
        return <TodoList data={data} />
      }}
    </Query>
  </div>
);

export default App;
