import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: ''

        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '',
                roleId: ''

            })
        })
    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent();
    }


    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;

        this.setState({
            ...copyState
        }, () => {
            // console.log(this.state)
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api create modal
            this.props.createNewUser(this.state);
        }


    }


    render() {
        // console.log('check child props', this.props)

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle}
                size="lg"

            >
                <ModalHeader toggle={() => this.toggle()}>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className="form-group col-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => { this.handleOnChangeInput(e, 'email') }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="inputPassword4">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => { this.handleOnChangeInput(e, 'password') }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="inputFirstName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                placeholder="First Name"
                                onChange={(e) => { this.handleOnChangeInput(e, 'firstName') }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="inputLastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={(e) => { this.handleOnChangeInput(e, 'lastName') }}
                                value={this.state.lastName}
                            />
                        </div>

                        <div className="form-group col-12">
                            <label htmlFor="inputAddress">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                placeholder="1234 Main St"
                                onChange={(e) => { this.handleOnChangeInput(e, 'address') }}
                                value={this.state.address}
                            />
                        </div>

                        <div className="form-group col-6">
                            <label htmlFor="inputPhoneNumber">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phoneNumber"
                                onChange={(e) => { this.handleOnChangeInput(e, 'phonenumber') }}
                                value={this.state.phoneNumber}
                            />

                        </div>
                        <div className="form-group col-3">
                            <label htmlFor="inputGender">Gender</label>
                            <select
                                name="gender"
                                className="form-control"
                                onChange={(e) => { this.handleOnChangeInput(e, 'gender') }}
                                value={this.state.gender}
                            >
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="form-group col-3">
                            <label htmlFor="inputRole">Role</label>
                            <select
                                name="roleId"
                                className="form-control"
                                onChange={(e) => { this.handleOnChangeInput(e, 'roleId') }}
                                value={this.state.roleId}
                            >

                                <option value="R1">Admin</option>
                                <option value="R2">Doctor</option>
                                <option value="R3">Patient</option>
                            </select>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="submit"
                        color="primary"
                        onClick={() => this.handleAddNewUser()}

                    >
                        Add new
                    </Button>
                    {' '}
                    <Button onClick={() => this.toggle()}>

                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


