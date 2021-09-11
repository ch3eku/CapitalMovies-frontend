import { Button } from 'react-bootstrap';
import React, { Component } from 'react'

export default class Error extends Component {

    gotoHandler = async () => {
        this.props.history.push('/');
    }

    render() {
        
        const h1 = {
            margin: '100px auto 0 auto',
            color: 'gray'
        }
        const h2 = {
            margin: '20px auto 30px auto',
            color: 'gray'
        }
        
        return (
            <div>
                <h1 style={h1} className='display-1 text-center'>500</h1>
                <h2 style={h2} className='display-2 text-center'>Unexpected Error <b>:(</b></h2>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <Button onClick={this.gotoHandler} variant="info">Back to Home</Button>
                </div>
            </div>
        )
    }
}
