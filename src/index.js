/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache
} from '@apollo/client';

import './index.css';

import Register from './pages/Register';

  
const httpLink = createHttpLink({	uri: 'http://localhost:4000'
});
  
const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});
  
export default function App(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="register" element={<Register />}/>
			</Routes>
		</BrowserRouter>
	);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>		
		<ChakraProvider>
			<ApolloProvider client={client}>			
				<App />
			</ApolloProvider>
		</ChakraProvider>
	</React.StrictMode>
);

