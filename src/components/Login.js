import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { users } from '../actions';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            loggedin : false
        }
    }
    login = () => {
        console.log(this.props);

        let { userName, password } = this.state;
        const user = {
            userName: userName,
            password: password
        };

        axios.post(`http://localhost:5000/users/login`, {
            user
        })
            .then(res => {

                if (!res.data.error) {
                    this.props.users(res.data);
                 //   this.setState({loggedin: true})
                //  this.context.history.push('/users');
                    this.props.history.push('/users');
                }
                else {
                    window.alert(res.data.error);
                }
            })
            .catch(err => {
                console.log(err);
                window.alert(err.error);
            })
    }
    render() {
        return (
            <div>
            
                <Form inline>

                <h4 className="link"><Link to={'/register'}>Register</Link></h4>
                <h3>Login</h3>

                <FormGroup>
                    <label>User Name: </label>
                    <FormControl onChange={event => this.setState({ userName: event.target.value })}
                        type="text" placeholder="user name"></FormControl>
                </FormGroup>
                <br /><br />
                <FormGroup>
                    <label>Password: </label>
                    <FormControl onChange={event => this.setState({ password: event.target.value })}
                        type="password" placeholder="password"></FormControl>
                </FormGroup>
                <br /><br />
                <Button onClick={() => this.login()}>Login</Button>
            </Form>
            </div>
        )
    }
}
const connectingWthRoute = connect(null, { users })(Login);
export default withRouter(connectingWthRoute);