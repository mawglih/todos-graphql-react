import React, { Fragment } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import App from './components/App';
import Signin from './components/Signin';
import Signup from './components/Signup';
import withSession from './components/WithSession';
import Navbar from './components/Navbar';
import Search from './components/Todos/Search';
import AddTodo from './components/Todos/addTodo';
import Profile from './components/Profile';
import TodoItem from './components/TodoItem';

const Root = ({ refetch, session }) => (
  <Fragment>
    <Navbar session={session} />
    <Switch>
      <Route path="/signin" render={() => <Signin refetch={refetch} />} />
      <Route path="/signup" render={() => <Signup refetch={refetch} />} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/" component={App} />
      <Route exact path="/profile" render={() => <Profile session={session} />} />
      <Route path="/todos/add" render={() => <AddTodo session={session} />} />
      <Route exact path="/todos/:_id" render={() => <TodoItem session={session} />} />
      <Redirect to="/" />
    </Switch>
  </Fragment>
  
);

export const RootWithSession = withSession(Root);

export default {};