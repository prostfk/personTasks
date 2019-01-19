import React, {Component} from 'react';
import {Row, Input, Button, Col} from 'react-materialize'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {SET_TASKS} from "../../constants/taskActionTypes";
import connect from "react-redux/es/connect/connect";

export class AddTaskForm extends Component {

    constructor(props) {
        super(props);
        if (this.props.task){
            this.state = {
                date: new Date(this.props.task.date).toDateString(),
                task: this.props.task.content
            };
            console.log(this.props.task);
        }else{
            this.state = {
                date: new Date(),
                task: '',
            };
        }


    }


    changeInput = (e, valueDate) => {
        let timeStamp = e.timeStamp;
        if (e.target.id === 'date'){
            this.setState({
                date: timeStamp
            })
        }else{
            this.setState({
                [e.target.id]: e.target.value
            })
        }

    };

    confirm = async () => {
        let formData = new FormData();
        formData.append('date', this.state.date);
        formData.append('task', this.state.task);
        if (this.props.mode === 'edit'){
            formData.append('id', this.props.task.id);
        }
        let resp = await axios.post(`/api/user/${this.props.mode}Task`, formData,{headers: {auth: localStorage.getItem('Authorization')}}).then(response=>response).catch(err=>NotificationManager.warning(err.toString()));
        if (resp.error){
            NotificationManager.warning(resp.error);
        }else{
            NotificationManager.success("Success", "Added");
            this.setState({
                time: '',
                date: '',
                task: ''
            });
            this.props.setTasks(this.props.updateFunc());
        }
    };

    render() {
        return (
            <div>
                <Row/>
                <Row/>
                <Row>
                    <Col s={4}/>
                    <Col s={4}>
                        <Input id={'date'} name='on' type='date' label="Date" onChange={(e,value)=>this.changeInput(e,value)} />
                    </Col>
                </Row>
                <Row>
                    <Col s={4}/>
                    <Col s={4}>
                        <Input id={'task'} value={this.state.task} onChange={this.changeInput} label="Task"/>
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
