// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import NewsList from './components/NewsList';
import UpdateNews from './components/UpdateNews';
import './App.css'

function App() {
    return (

            <div className="App">
              <Routes>
              <Route path="/" exact element={<NewsList/>} />
              <Route path="/update/:id" element={<UpdateNews/>} />       
              </Routes>
                    

            </div>

    );
}

export default App;
