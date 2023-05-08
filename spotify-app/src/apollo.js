import {ApolloClient,InMemoryCache} from "@apollo/client"

const client = new ApolloClient({
    uri: 'https://api.ss.dev/resource/api', // Your GraphQL server endpoint
    cache: new InMemoryCache()
  });
  
  export default client;