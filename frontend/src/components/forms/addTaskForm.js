import React, {Component} from 'react';
import {Button, Col, Input, Row} from 'react-materialize'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {SET_TASKS} from "../../constants/taskActionTypes";
import connect from "react-redux/es/connect/connect";
import $ from "jquery";

export class AddTaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            task: ''
        }
    }

    componentDidMount(){
        if (this.props.task){
            this.setState({
                date: this.props.task.date,
                task: this.props.task.content
            });
        }else{
            this.setState({
                date: '',
                task: '',
            });
        }
    }

    confirm = async () => {
        let formData = new FormData();
        formData.append('date', this.state.date);
        formData.append('task', this.state.task);
        if (this.props.mode === 'edit'){
            formData.append('id', this.props.task._id);
        }
        let resp = await this.props.mode === 'edit' ? this.editRequest(formData) : this.createRequest(formData);
        resp.then(resp=>{
            if (resp.error){
                NotificationManager.warning(resp.error);
            }else{
                NotificationManager.success("Success", "Added");
                if (this.props.mode !== 'edit'){
                    this.setState({
                        time: '',
                        date: '',
                        task: ''
                    });
                }
                let tasks = this.props.updateFunc();
                this.props.setTasks(tasks);
                let btns = document.querySelector('.modal-close');
                for (let i = 0; i < btns.length; i++) {
                    btns[i].click()
                }
            }
        });

    };

    editRequest = async (formData) => {
        return await axios.put(`/api/user/${this.props.mode}Task`, formData, {
            headers:
                {auth: localStorage.getItem('Authorization')}
        }).then(response => response).catch(err => NotificationManager.warning(err.toString()));
    };

    createRequest = async (formData) => {
        return await axios.post(`/api/user/${this.props.mode}Task`, formData, {
            headers:
                {auth: localStorage.getItem('Authorization')}
        }).then(response => response).catch(err => NotificationManager.warning(err.toString()));
    };

    render() {
        return (
            <div>
                <Row/>
                <Row/>
                <Row>
                    <Col s={4}/>
                    <Col s={4}>
                        <Input value={this.state.date} type='date' placeholder="Date" onChange={(e,value)=>{
                            this.setState({date: value});
                        }} />
                    </Col>
                </Row>
                <Row>
                    <Col s={4}/>
                    <Col s={4}>
                        <Input value={this.state.task} onChange={e=>{
                            this.setState({task: e.target.value})
                        }} placeholder="Task"/>
                    </Col>
                </Row>
                <Row>
                    <Col s={5}/>
                    <Col s={4}>
                        <Button onClick={this.confirm}>Submit</Button>
                    </Col>
                </Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
