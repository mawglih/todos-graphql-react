import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter,
} from 'react-router-dom';
import { RootWithSession } from './route';
import CLIENT from './components/Client';
import './index.css';

ReactDOM.render(
  <ApolloProvider client={CLIENT}>
    <BrowserRouter>
      <RootWithSession />
    </BrowserRouter>
  </ApolloProvider>,
 document.getElementById('root'));
