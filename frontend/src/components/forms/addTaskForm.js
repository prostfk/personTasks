import React, {Component} from 'react';
import {Row, Input, Button, Col} from 'react-materialize'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

export default class AddTaskForm extends Component {

    state = {
        time: '',
        date: new Date(),
        task: '',
    };

    changeInput = (e, valueDate) => {
        let timeStamp = e.timeStamp;
        console.log(valueDate);
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
        let resp = await axios.post('/api/user/addTask', formData,{headers: {auth: localStorage.getItem('Authorization')}}).then(response=>response).catch(err=>NotificationManager.warning(err.toString()));
        console.log(resp);
        if (resp.error){
            NotificationManager.warning(resp.error);
        }else{
            NotificationManager.info("Success", "Added");
            this.setState({
                time: '',
                date: new Date(),
                task: '',
            });
            this.props.updateFunc();
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