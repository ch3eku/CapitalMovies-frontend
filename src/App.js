import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Signup from './Components/Signup'
import Login from './Components/Login'
import MovieList from './Components/MovieList'
import PopMovieList from './Components/PopMovieList'
import LatMovieList from './Components/LatMovieList'
import FavMovieList from './Components/FavMovieList'
import ShowMovie from './Components/ShowMovie'
import Error from './Components/Error'
import axios from 'axios';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            user: {}
        }
    }

    async componentDidMount() {
        await axios.get(`/user`)
            .then(res => {
                if (res.status===200) {
                    this.setUser(res.data);
                }
            })
            .catch(err => {
                console.log('In App.js');
                this.setUser(null);
                console.log(err);
            })
    }

    setUser = user => {
        this.setState({
            user: user
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className='div'>
                    <NavBar user={this.state.user} setUser={this.setUser} />
                    <Switch>
                        <Route exact path="/" component={MovieList} />
                        <Route exact path="/discover/popular" component={PopMovieList} />
                        <Route exact path="/discover/latest" component={LatMovieList} />
                        <Route exact path="/discover/favourite" component={FavMovieList} />
                        <Route exact path="/show/movie/:id" component={ShowMovie} />
                        <Route exact path="/user/signup" component={Signup} />
                        <Route exact path="/user/login" component={() => <Login setUser={this.setUser} />} />
                        <Route exact path="*" component={Error} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
