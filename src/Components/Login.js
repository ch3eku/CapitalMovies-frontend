import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = async (e) => {
        e.preventDefault();
        await axios.post('/user/login', this.state)
            .then(res => {
                if (res.status === 200) {
                    window.alert(res.data.success);
                    sessionStorage.setItem('jsonwebtoken', res.data.token);
                    const decodedData = jwt_decode(res.data.token);
                    this.setState({
                        loggedIn: true
                    });
                    //Clear storage after specific time
                    setTimeout(function () {
                        sessionStorage.clear();
                    },
                        (60*60*1000)
                    );
                    this.props.setUser(decodedData);
                }
            })
            .catch(error => {
                if (error.response) {
                    window.alert(error.response.data.error);
                }
            })
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to='/'/>
        }

        return (
            <div className="formdiv">
                <h4 className="text-center display-4">Login</h4>
                <Form onSubmit={this.submitHandler}>
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
                        Login
                    </Button>
                </Form>
            </div>
        )
    }
}
