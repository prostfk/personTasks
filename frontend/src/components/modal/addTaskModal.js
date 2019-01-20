import React,{Component} from 'react';
import {Modal,Button, Icon} from 'react-materialize'
import AddTimeForm from "../forms/addTaskForm";


export default class AddTaskModal extends Component {

    render() {
        return (
            <div>
                <Modal
                    header={`${this.props.task ? 'Edit' : 'Add'} your task`}
                    fixedFooter
                    trigger={<Button className={this.props.className}>{
                        this.props.buttonText ? this.props.buttonText : `Add task`
                    }</Button>}>
                    <AddTimeForm task={this.props.task} mode={this.props.task ? 'edit' : 'add'}
                                 updateFunc={this.props.updateFunc}/>
                </Modal>
            </div>
        );
    }

}