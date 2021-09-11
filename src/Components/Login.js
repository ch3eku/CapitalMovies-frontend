import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
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
                    sessionStorage.setItem('_id', res.data._id);
                    sessionStorage.setItem('username', res.data.username);
                    this.props.history.push('/');
                }
            })
            .catch(err => {
                window.alert("Invalid Credentials");
                this.props.history.push('/user/login');
            })
    }

    render() {
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
