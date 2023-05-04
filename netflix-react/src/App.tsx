import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom" 
import { Loginx } from './components/Login';
import { Register } from './components/Register';
import { Home } from "./components/Home"
import { Watching } from './components/Watching';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>

      <Route path='/Home' element={
      <Home />
      }/>
      <Route path='/Register' element={<Register />} />
      <Route path='/Login' element={<Loginx />} />
      <Route path='/User' element={<Watching />}  />
      </Routes>  
    <Footer />
    </div>
  );
}

export default App;
