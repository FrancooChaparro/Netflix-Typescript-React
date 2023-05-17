import React, { useEffect} from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Loginx } from './components/Login';
import { Register } from './components/Register';
import { Home } from "./components/Home"
import { Watching } from './components/Watching';
import { Footer } from './components/Footer';
import { Search } from './components/Search';
import { GetMovies } from './redux/actions';
import { useDispatch } from 'react-redux';
import { Details } from './components/Details';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const moviesAction = await GetMovies();
      dispatch(moviesAction);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
      <Route path='/Home' element={<Home />}/>
      <Route path='/Register' element={<Register />} />
      <Route path='/Login' element={<Loginx />} />
      <Route path='/User' element={<Watching />}  />
      <Route path='/Search' element={<Search />}  />
      <Route path='/Details/:id' element={<Details />}  />
      </Routes>  
    {/* <Footer /> */}
    </div>
  );
}

export default App;
