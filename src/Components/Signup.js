import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = async (e) => {
        e.preventDefault();
        await axios.post('/user/signup', this.state)
            .then(res => {
                if (res.status === 200) {
                    window.alert(res.data.success);
                    this.props.history.push('/user/login');
                }
            })
            .catch((error) => {
                if (error.response) {
                    window.alert(error.response.data.error);
                }
                this.props.history.push('/user/signup');
            })
    }

    render() {
        return (
            <div className="formdiv">
                <h4 className="text-center display-4">Signup</h4>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username"
                            onChange={this.changeHandler} placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email"
                            onChange={this.changeHandler} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password"
                            onChange={this.changeHandler} placeholder="Enter Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Signup
                    </Button>
                </Form>
            </div>
        )
    }
}
