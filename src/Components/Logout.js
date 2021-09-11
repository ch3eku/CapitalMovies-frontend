import axios from 'axios';
import { Component } from 'react'

export default class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
        await axios.get(`/user/logout`)
            .then(res => {
                if (res.status === 200) {
                    sessionStorage.clear();
                    this.props.history.push('/');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return null;
    }
}
