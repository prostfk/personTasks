import React,{Component} from 'react';
import {Modal,Button, Icon} from 'react-materialize'
import AddTimeForm from "../forms/addTaskForm";


export default class AddTaskModal extends Component {

    render() {
        return (
            <div>
                <Modal
                    header='Modal Header'
                    fixedFooter
                    trigger={<Button>Add task</Button>}>
                    <AddTimeForm updateFunc={this.props.updateFunc}/>
                </Modal>
            </div>
        );
    }

}