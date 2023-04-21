import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom" 
import { Loginx } from './components/Login';
import { Register } from './components/Register';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/Register' element={<Register />} />
      <Route path='/Login' element={<Loginx />} />
      </Routes>    
    </div>
  );
}

export default App;
