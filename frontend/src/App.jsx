import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RegisterPatient from './pages/register/RegisterPatient';
import GenerateToken from './pages/gernatetoken/GenerateToken';
// import TokenList from './pages/tokenlist/TokenList';
import Home from './pages/home/Home';
import Registration from './pages/register/Registration.JSX';
import Tokens from './pages/tokenlist/Tokens';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/registration/new" element={<RegisterPatient />} />
        <Route path='/registration' element={<Registration />}/>
        <Route path="/tokens/new" element={<GenerateToken />} />
        <Route path="/tokens" element={<Tokens />} />
      </Routes>
      <ToastContainer />
    </Router>
    
  );
}

export default App;
