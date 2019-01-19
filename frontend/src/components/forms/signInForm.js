import React, {Component} from 'react';
import {FormGroup, InputGroup} from "@blueprintjs/core";
import axios from 'axios';
import {NotificationManager} from "react-notifications";
// import { browserHistory } from 'react-router';
import { withRouter } from "react-router-dom";

export class SignInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            username: '',
            password: ''
        };
    }


    changeInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    sendForm = async () => {
        let ref  = this;
        if (this.state.password.length > 5 && this.state.password.length < 15){
            let resp = await axios.post(this.props.url,{username: this.state.username, password: this.state.password}).then(response => response).catch(err => NotificationManager.warning(err.toString()));
            if (resp.data.error) {
                NotificationManager.warning(resp.data.error);
            } else {
                if (resp.data.token){
                    localStorage.setItem('Authorization', resp.data.token);
                }
                ref.redirect('/')
            }
        }else {
            NotificationManager.warning('Check password');
        }
    };

    redirect = (url) => {
        this.props.history.push(url)
    };

    render() {
        return (
            <div style={{margin: '10%'}}>
                <FormGroup>

                    <InputGroup
                        large={false}
                        small={false}
                        placeholder="Enter your username..."
                        id={'username'}
                        value={this.state.username}
                        type={'text'}
                        onChange={this.changeInput}

                    />

                    <InputGroup
                        large={false}
                        small={false}
                        placeholder="Enter your password..."
                        rightElement={() => {
                            this.setState({showPassword: !this.state.showPassword})
                        }}
                        onChange={this.changeInput}
                        id={'password'}
                        value={this.state.password}
                        type={this.state.showPassword ? "text" : "password"}
                    />


                </FormGroup>
                <button className="bp3-button bp3-icon-confirm"
                        onClick={() => this.sendForm()}>Submit
                </button>
            </div>
        );
    }

}
export default withRouter(SignInForm);
