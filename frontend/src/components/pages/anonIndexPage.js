import React, {Component} from 'react';
import SignInForm from "../forms/signInForm";

export default class AnonIndexPage extends Component {

    state = {
        auth: true
    };

    render() {
        return (
            <div>
                <button type="button" className="bp3-button bp3-icon-user .modifier"
                    onClick={()=>this.setState({auth: !this.state.auth})}
                >Switch to {this.state.auth ? ' registration' : ' auth'}</button>
                {
                    this.state.auth ? <SignInForm url={'/api/auth'}/> : <SignInForm url={'/api/registration'}/>
                }
            </div>
        );
    }

}