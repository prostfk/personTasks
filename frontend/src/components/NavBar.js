import React, {Component} from 'react';
import {Navbar, NavItem, Icon} from 'react-materialize'

export default class NavBar extends Component {

    link = (link) => {

        this.props.history.push(link);
    };

    render() {
        return <div>
            <Navbar brand='| logo' className={'blue-grey'} color={'black'} right>
                <NavItem onClick={() => this.link('/addTask')}><Icon>view_module</Icon></NavItem>
                <NavItem onClick={() => this.link('/refresh')}><Icon>refresh</Icon></NavItem>
                <NavItem onClick={() => this.link('/more_vert')}><Icon>more_vert</Icon></NavItem>
            </Navbar>
        </div>;
    }

}