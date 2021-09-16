import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default class ShowMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            isaDisabled: false,
            isrDisabled: false,
            title: '',
            img: '',
            overview: '',
            release_date: '',
            vote_average: '',
            favMovieArray: []
        }
    }

    async componentDidMount() {
        const token = sessionStorage.getItem('jsonwebtoken');
        if (token !== null) {
            const decodedData = jwt_decode(token);
            const [movie, favMovieArray] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`),
                axios.get(`/user/${decodedData._id}/favourite`)
            ]);

            this.setState({
                uid: decodedData._id,
                title: movie.data.title,
                img: `https://image.tmdb.org/t/p/original/${movie.data.poster_path}`,
                overview: movie.data.overview,
                release_date: movie.data.release_date,
                vote_average: movie.data.vote_average,
                favMovieArray: favMovieArray.data
            });
        } else {
            const movie = await axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
            this.setState({
                title: movie.data.title,
                img: `https://image.tmdb.org/t/p/original/${movie.data.poster_path}`,
                overview: movie.data.overview,
                release_date: movie.data.release_date,
                vote_average: movie.data.vote_average
            });
        }
    }

    aDisableHandler = () => {
        if (this.state.uid) {
            this.setState({
                isaDisabled: true
            });
            this.addHandler();
        } else {
            window.alert('Unable to add. Please login first');
        }
    }

    rDisableHandler = () => {
        this.setState({
            isrDisabled: true
        });
        this.removeHandler();
    }
    addHandler = async (e) => {
        const favMovieArray = await axios.post(`/user/${this.state.uid}/favourite/${this.props.match.params.id}`);
        this.setState({
            favMovieArray: favMovieArray.data,
            isrDisabled: false
        });
    }

    removeHandler = async (e) => {
        const favMovieArray = await axios.delete(`/user/${this.state.uid}/favourite/${this.props.match.params.id}`);
        this.setState({
            favMovieArray: favMovieArray.data,
            isaDisabled: false
        });
    }

    render() {
        const card = {
            width: '85%',
            height: 'auto',
            color: 'whitesmoke'
        }
        const body = {
            border: 'none'
        }

        return (
            <div className=' row d-flex flex-row justify-content-center align-items-center'>
                <div className="col col-lg-4 col-sm-6 col-6 m-4">
                    <Card style={card}>
                        <Card.Img src={this.state.img} alt="Card image" />
                    </Card>
                </div>
                <div className="col col-lg-4 col-sm-6 col-6 m-4">
                    <Card style={body}>
                        <Card.Body>
                            <Card.Title><h1 className='display-4'>{this.state.title}</h1></Card.Title>
                            <Card.Text>
                                <h5 className='display-5'>Release Date : {this.state.release_date}</h5>
                                <h6 className='display-6'>Rating : {this.state.vote_average}</h6>
                            </Card.Text>
                            <Card.Text>{this.state.overview}</Card.Text>
                            {!this.state.favMovieArray.includes(this.props.match.params.id)
                                ? <Button onClick={this.aDisableHandler} variant="secondary" disabled={this.state.isaDisabled}>Add to Favourites</Button>

                                : <Button onClick={this.rDisableHandler} variant="danger" disabled={this.state.isrDisabled}>Remove from Favourites</Button>
                            }
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}