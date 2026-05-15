import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import Home from './Components/Home/Home';
import EachItem from './Components/ItemPage/EachItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/item/:id' element={<EachItem/>}/>
      </Routes>
    </Router>
  );
}

export default App;
