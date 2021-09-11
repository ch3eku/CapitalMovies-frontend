import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Signup from './Components/Signup'
import Login from './Components/Login'
import Logout from './Components/Logout'
import MovieList from './Components/MovieList'
import PopMovieList from './Components/PopMovieList'
import LatMovieList from './Components/LatMovieList'
import FavMovieList from './Components/FavMovieList'
import ShowMovie from './Components/ShowMovie'
import Error from './Components/Error'

export default class App extends Component {
  render() {
    return (
      <div className='div'>
        <NavBar />
        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route exact path="/discover/popular" component={PopMovieList} />
          <Route exact path="/discover/latest" component={LatMovieList} />
          <Route exact path="/discover/favourite" component={FavMovieList} />
          <Route exact path="/show/movie/:id" component={ShowMovie} />
          <Route exact path="/user/signup" component={Signup} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/logout" component={Logout} />
          <Route exact path="*" component={Error} />
        </Switch>
      </div>
    )
  }
}
