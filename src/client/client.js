import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-client-preset';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
// import { withClientState } from 'apollo-link-state';


// create http link
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/notes',
});

// Set up Cache
const cache = new InMemoryCache();

// Initialize the Apollo Client
const Client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache,
});

export default Client;
