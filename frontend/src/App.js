import './App.css';
import BookList from './comp/BookList';
import {ApolloProvider} from 'react-apollo';
import AddBooks from './comp/AddBooks';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};


const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,

  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions
});
// Set defaultOptions on the link in the ApolloClient instance
function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <BookList></BookList>
      <AddBooks></AddBooks>
    </div>
    </ApolloProvider>
  );
}

export default App;
