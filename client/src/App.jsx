import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import AppNavbar from './Components/Navbar';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Property from './pages/Property';
import Footer from './Components/Footer';
import Agent from './pages/Agents';
import Saved from './pages/Saved';


import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>

        <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:propertyId" element={<Property />} />
        <Route path="/agents" element={<Agent />} />
        <Route path="/saved" element={<Saved />} />


      </Routes>
      <Footer />
      </>
      </Router>
   </ApolloProvider>
  );
};

export default App;
