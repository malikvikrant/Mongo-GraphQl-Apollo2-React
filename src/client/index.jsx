import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.css';
// component
import App from './component/App';
import Client from './client';

ReactDOM.render(
  <ApolloProvider client={Client}>
    <App style={{ width: 'inherit', height: 'inherit' }} />
  </ApolloProvider>, document.getElementById('app'), //eslint-disable-line
);
