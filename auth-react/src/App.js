import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';

import Login from './auth/Login';
import Register from './auth/Register';
import JokesList from './components/JokesList';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <h3>Jokes on Jokes</h3>
        <nav>
          <NavLink to="/login"> Login </NavLink>
          <NavLink to="/register"> Register </NavLink>
          <NavLink to="/jokes"> Jokes </NavLink>
          <button onClick={this.logoutHandler}> Logout </button>
        </nav>
        
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/jokes" component={JokesList} />
      </div>
    );
  }
}

export default App;
