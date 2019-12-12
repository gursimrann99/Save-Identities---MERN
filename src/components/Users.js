import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { users, remove } from '../actions';
import '../styles/index.css';

class Users extends Component {
    constructor() {
        super();

        this.state = {
            disableediting: true,
            pan: '',
            panNameExtension: '',
            aadhaar: '',
            aadhaarNameExtension: ''
        }
    }
    submit = (userName) => {
        let { pan, panNameExtension } = this.state;
        const user = {
            userName: userName,
            pan: pan,
            panNameExtension: panNameExtension
        };
        axios.post(`http://localhost:5000/users/updates`, {
            user
        })
            .then(res => {
                if (!res.data.error) {
                    this.setState({ disableediting: true })
                    this.props.users(res.data);
                }
                else {
                    window.alert(res.error);
                }
            })
            .catch(err => {
                window.alert(err.error);
            })
    }
    handleImageChange = (event, value) => {

        event.preventDefault();
        let filename = value.replace(/^.*[\\\/]/, '')
        console.log(filename);
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            let base64 = reader.result.split("base64,");
            this.setState({
                panNameExtension: filename,
                pan: base64[1]
            });
        };
    }
    downloadFileData = (ext) => {
        let { panCard } = this.props.use

        let ex = ext.split('.');
        let extension = ex[ex.length - 1];
        // axios({
        //     url: `http://localhost:5000/users/update/${_id}`,
        //     method: 'GET',
        // }).then((response) => {
        //    console.log(response.data)
        const url = `data:application/${extension};base64,${panCard}`;
        const link = document.createElement('a');
        const filename = ext;
        link.href = url;
        link.download = filename;
        link.click();
        // });
    }
    editFile = (bol) => {
        this.setState({ disableediting: bol })
    }
    reRoute = () => {
        this.props.remove([]);
    }
    render() {
        let { firstName, lastName, userName, panNameExtension } = this.props.use;
        return (

            <Form inline>
                <h4 className="link" onClick={()=> this.reRoute()}><Link to={'/login'}>Logout</Link></h4>
                <h3>Welcome {firstName} {lastName}</h3>
                <Card>
                    <label>Pan Card</label><br />
                    {(panNameExtension && this.state.disableediting) ?
                        <div>
                            <h5 className="file">{panNameExtension}</h5>
                            <Button onClick={() => this.downloadFileData(panNameExtension)}>Download</Button>{' '}
                            <Button onClick={() => this.editFile(false)}>Edit</Button>
                        </div> :
                        <FormGroup>
                            <FormControl onChange={event => this.handleImageChange(event, event.target.value)}
                                type="file" ></FormControl><br />
                            {panNameExtension ?<Button onClick={() => this.editFile(true)}>Cancel</Button>:''}{' '}
                            <Button onClick={() => this.submit(userName)}>Submit</Button>
                        </FormGroup>
                    }
                </Card>
            </Form>

        )
    }
}

function mapStateToProps(state) {
    return { use: state.users };
}

export default connect(mapStateToProps, { users, remove })(Users);