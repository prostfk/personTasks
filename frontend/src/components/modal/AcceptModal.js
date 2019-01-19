import React,{Component} from 'react';
import {Modal,Button, Icon, Row} from 'react-materialize'
import AddTimeForm from "../forms/addTaskForm";


export default class AcceptModal extends Component {

    state = {
        open: false
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        })
    };


    render() {
        console.log(this.props.parameterToFunc)
        return (
            <div>
                <Modal
                    header="Are you sure?"
                    open={this.state.open}
                    trigger={this.props.button}>
                    <Row>
                        <Button onClick={()=>{
                            this.props.acceptFunc(this.props.parameterToFunc);
                            this.toggle();
                        }}>Accept</Button>
                        <Button onClick={()=>this.toggle()}>Cancel</Button>
                    </Row>
                </Modal>
            </div>
        );
    }

}