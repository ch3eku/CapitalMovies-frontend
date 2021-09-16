import React, { Component } from 'react'
import axios from 'axios';
import Movie from './Movie'
import { Button } from 'react-bootstrap';
import './MovieList.css'


export default class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            movies: []
        }
    }

    async componentDidMount() {
        let movieName = this.props.match.params.id;
        movieName = movieName.replace('%20', ' ');
        const fetchmovies = await axios.get(`
https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${movieName}&page=${this.state.page}`);
        this.setState({ movies: fetchmovies.data.results });
    }

    pPageHandler = async () => {
        let movieName = this.props.match.params.id;
        movieName = movieName.replace('%20', ' ');
        let newPage = this.state.page - 1;
        const fetchmovies = await axios.get(`
https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${movieName}&page=${newPage}`);
        this.setState({ movies: fetchmovies.data.results });
        this.setState({ page: newPage });
    }

    nPageHandler = async () => {
        let movieName = this.props.match.params.id;
        movieName = movieName.replace('%20', ' ');
        let newPage = this.state.page + 1;
        const fetchmovies = await axios.get(`
https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${movieName}&page=${newPage}`);
        this.setState({ movies: fetchmovies.data.results });
        this.setState({ page: newPage });
    }

    render() {
        let movielist = this.state.movies.map((movie) => {
            return <Movie
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
        })

        const page = this.state.page;

        return (
            <div>
                <div className='movielist'>
                    {movielist}
                </div>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    {page > 1
                        ? <Button onClick={this.pPageHandler} variant="secondary">&#8636;</Button>
                        : null
                    }
                    <strong>&nbsp;&nbsp;{this.state.page}&nbsp;&nbsp;</strong>
                    <Button onClick={this.nPageHandler} variant="secondary">&#8641;</Button>
                </div>
            </div>
        )
    }
}
