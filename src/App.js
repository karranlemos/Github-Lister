import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import HomePage from './components/pages/Home';
import AboutPage from './components/pages/About';

import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/about" component={AboutPage}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
