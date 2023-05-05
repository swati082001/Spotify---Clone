import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {onError} from "@apollo/client/link/error"
import {ApolloClient,InMemoryCache,ApolloProvider,HttpLink,from} from "@apollo/client"
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom"

//error catching system from Graphql
const errorLink = onError(({graphqlErrors,networkError})=>{
  if(graphqlErrors){
      graphqlErrors.map(({message,location,path})=>{
        alert(`graphql Error ${message}`)
      })
  }
})

const link = from([
   errorLink, //if there is any error , we are telling how to respond to the error
   new HttpLink({uri:"https://api.ss.dev/resource/api"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </BrowserRouter>
  </ApolloProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
