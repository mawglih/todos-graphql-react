import ApolloClient from 'apollo-boost';

const CLIENT = new ApolloClient({
  uri: "http://web-server.oleg-dev.com:4444/graphql",
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError}) => {
    if(networkError) {
      console.log('Network error: ', networkError);
      if(networkError.statusCode === 401) {
        localStorage.removeItem('token');
      }
    }
  }
});

export default CLIENT;