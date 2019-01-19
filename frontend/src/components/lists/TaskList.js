import React, {Component} from 'react';
import {Row, Input, Button, Table, ProgressBar, Col} from 'react-materialize'
import {NotificationManager} from 'react-notifications';
import {SET_TASKS} from "../../constants/taskActionTypes";
import {connect} from "react-redux";
import AddTaskModal from "../modal/addTaskModal";
import AcceptModal from "../modal/AcceptModal";
import axios from 'axios';

export class TaskList extends Component {

    state = {
        initial: true
    };

    componentDidMount(){
        if (this.props.loadTasks){
            this.props.loadTasks().then(data=>{
                this.props.setTasks(data.data);
                this.setState({initial: false});
            });
        }else{
            this.setState({initial: false});
            NotificationManager.info("no content")
        }
    }


    deleteFunc = async (id) => {
        let formData = new FormData();
        formData.append('id', id);
        let resp = await axios.delete('/api/user/deleteTask',{data: formData, headers:  {auth: localStorage.getItem('Authorization')}}).then(response=>response).catch(err=>NotificationManager.warning(err.toString()))
        if (resp){
            if (resp.data.error){
                NotificationManager.warning(resp.data.error);
            }else {
                NotificationManager.info("Status", "Deleted")
            }
        }
    };

    render() {
        return (
            <div>
                {
                    this.state.initial ? <Col s={12}>
                        <ProgressBar />
                    </Col> :
                        this.props.tasks.length > 0 ?
                            <Table>
                                <thead>
                                <tr>
                                    <th/>
                                    <th data-field="user">User</th>
                                    <th data-field="date">Date</th>
                                    <th data-field="task">Task</th>
                                    <th data-field="edit">Edit</th>
                                    <th data-field="delete">Delete</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.props.tasks.map((task,index)=>{
                                        return <tr key={index} style={{overFlow: 'hidden'}}>
                                            <td width="8%"/>
                                            <td>{task.username}</td>
                                            <td>{(task.date)}</td>
                                            <td>{task.content}</td>
                                            <td><AddTaskModal className={'amber accent-4'}
                                                              buttonText={'edit'}
                                                              task={task}
                                            /></td>
                                            <td><AcceptModal button={<Button className={'deep-orange darken-4'}>Delete</Button>}
                                            acceptFunc={this.deleteFunc}
                                            parameterToFunc={task._id}/></td>
                                        </tr>

                                    })
                                }
                                </tbody>
                            </Table> : <div/>

                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        tasks: state.taskReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        setTasks: (payload) => {
            dispatch({
                type: SET_TASKS, payload
            })
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
