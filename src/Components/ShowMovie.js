import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

export default class ShowMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid:'',
            title: '',
            img: '',
            overview: '',
            release_date: '',
            vote_average: '',
            favMovieArray:[]
        }
    }

    async componentDidMount() {

        const uid = sessionStorage.getItem('_id');
        console.log(uid);
        if (uid !== null) {
            const [movie, favMovieArray] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=f7f07ca3fd7b0e7cc28183c3af31f32d&language=en-US`),
                axios.get(`/user/${uid}/favourite`)
            ]);
            
            this.setState({
                uid: sessionStorage.getItem('_id'),
                title: movie.data.title,
                img: `https://image.tmdb.org/t/p/original/${movie.data.poster_path}`,
                overview: movie.data.overview,
                release_date: movie.data.release_date,
                vote_average: movie.data.vote_average,
                favMovieArray: favMovieArray.data
            });
        }
        else {
            const movie = await axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=f7f07ca3fd7b0e7cc28183c3af31f32d&language=en-US`);
            this.setState({
                uid: sessionStorage.getItem('_id'),
                title: movie.data.title,
                img: `https://image.tmdb.org/t/p/original/${movie.data.poster_path}`,
                overview: movie.data.overview,
                release_date: movie.data.release_date,
                vote_average: movie.data.vote_average
            });
        }
    }

    addHandler = async (e) => {
        const uid = sessionStorage.getItem('_id');
        console.log(uid);

        if (uid !== null) {
            const [movie, favMovieArray] = await Promise.all([
                axios.post(`/user/${this.state.uid}/favourite/${this.props.match.params.id}`),
                axios.get(`/user/${sessionStorage.getItem('_id')}/favourite`)
            ]);
            
            this.setState({
                favMovieArray: favMovieArray.data
            });
        }
        else {
            window.alert('Login to continue...');
        }

    }

    removeHandler = async (e) => {
        const uid = sessionStorage.getItem('_id');
        console.log(uid);

        if (uid !== null) {
            const [movie, favMovieArray] = await Promise.all([
                axios.delete(`/user/${this.state.uid}/favourite/${this.props.match.params.id}`),
                axios.get(`/user/${sessionStorage.getItem('_id')}/favourite`)
            ]);

            this.setState({
                favMovieArray: favMovieArray.data
            });
        }
        else {
            window.alert('Login to continue...');
        }
    }

    gotoHandler = async () => {
        this.props.history.push('/discover/favourite');
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
            <div className='d-flex flex-row justify-content-center align-items-center'>
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
                                ? <Button onClick={this.addHandler} variant="secondary">Add to Favourites</Button>

                                : <Button onClick={this.removeHandler} variant="danger">Remove from Favourites</Button>
                            }
                            <Button onClick={this.gotoHandler} variant="info">See Favourites</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}