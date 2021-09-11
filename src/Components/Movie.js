import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './Movie.css'
import { Link } from 'react-router-dom';

export default class Movie extends Component {
    render() {
        return (
            <div>
                <Card className='movie'>
                    <Card.Img className='img' variant="top" src={this.props.img} />
                    <Card.Body className='body'>
                        <Card.Title className='title'>{this.props.title}</Card.Title>
                    </Card.Body>
                    <Link to={`/show/movie/${this.props.id}`}>
                        <Button className='btn' variant="outline-secondary" size="sm">View more</Button>
                    </Link>
                </Card>
            </div>
        )
    }
}