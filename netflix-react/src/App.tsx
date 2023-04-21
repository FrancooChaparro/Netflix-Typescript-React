import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom" 
import { Loginx } from './components/Login';
import { Register } from './components/Register';
import { Home } from "./components/Home"

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/Home' element={<Home />}  />
      <Route path='/Register' element={<Register />} />
      <Route path='/Login' element={<Loginx />} />
      </Routes>    
    </div>
  );
}

export default App;
