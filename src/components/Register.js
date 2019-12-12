import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            password: ''
        }
    }

    register = () => {
        let { firstName, lastName, userName, password } = this.state;

        const user = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password
        };

        axios.post(`http://localhost:5000/users/register`, {
            user
        })
            .then(res => {
                if (!res.data.error && !res.data.includes('ValidationError:')) {
                    this.props.history.push("/login");
                }
                else {
                    window.alert(res.data.error ? res.data.error : res.data);
                }
            })
            .catch(err => {
                window.alert(err.error);
            })
    }

    // fileToBase64 = (filename, filepath) => {
    //     console.log(filepath);
    //     return new Promise(resolve => {
    //         var file = new File([filename], filepath);
    //         var reader = new FileReader();
    //         reader.onload = function (event) {
    //             resolve(event.target.result);
    //         };
    //         reader.readAsDataURL(file);
    //     });
    // };

    render() {
        return (

            <Form inline>
                <h4 className="link"><Link to={'/login'}>Login</Link></h4>
                <h3>Register Identity</h3>
                <FormGroup>
                    <label>First Name: </label>
                    <FormControl onChange={event => this.setState({ firstName: event.target.value })}
                        type="text" placeholder="first name"></FormControl>
                </FormGroup>
                <br /><br />
                <FormGroup>
                    <label>Last Name: </label>
                    <FormControl onChange={event => this.setState({ lastName: event.target.value })}
                        type="text" placeholder="last name"></FormControl>
                </FormGroup>
                <br /><br />
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
                <Button onClick={() => this.register()}>Register</Button>
            </Form>
        )
    }

}
export default (Register);