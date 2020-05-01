import React from 'react';
import Header from "./common/Header";
import Footer from "./common/Footer";
import PageRoutes from "./Routes";
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <PageRoutes />
      <Footer />
    </div>
  )
}

export default App;
