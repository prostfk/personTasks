import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './animate.css';
import NavBar from "./components/NavBar";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "normalize.css/normalize.css";
import 'react-notifications/lib/notifications.css';
import {Provider} from "react-redux";
import {createStore} from "redux";
import allReducers from "./reducers/allReducers";
import {BrowserRouter as Router} from 'react-router-dom'
import {Route} from "react-router";
import AnonIndexPage from "./components/pages/anonIndexPage";
import UserIndexPage from "./components/pages/userIndexPage";
import {NotificationContainer} from "react-notifications";

class App extends Component {


    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route path={'/*'} render={(props)=><NotificationContainer/>}/>
                        <Route path={'/*'} component={NavBar}/>
                        <Route exact path={'/'} component={localStorage.getItem('Authorization') ? UserIndexPage : AnonIndexPage}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

const store = createStore(allReducers);

export default App;
