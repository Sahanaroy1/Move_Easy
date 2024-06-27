import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import AppNavbar from './Components/Navbar';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Property from './pages/Property';
import Footer from './Components/Footer';



const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL server URI
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
        <Route path="/properties/:id" element={<Property />} />
      </Routes>
      <Footer />
      </>
      </Router>
   </ApolloProvider>
  );
};

export default App;
