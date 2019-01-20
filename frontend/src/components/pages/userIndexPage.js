import React, {Component} from 'react';
import TaskList from "../lists/TaskList";
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import AddTaskModal from "../modal/addTaskModal";


export default class UserIndexPage extends Component {

    loadTasks = async () => {
        return await axios.get('/api/user/myTasks', {headers: {auth: localStorage.getItem('Authorization')}}).then(response => response).catch(err => NotificationManager.warning(err.toString()));
    };

    render() {
        return (
            <div>
                <AddTaskModal id={'create'} updateFunc={this.loadTasks}/>
                <TaskList loadTasks={this.loadTasks}/>
            </div>
        );
    }

}