import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}

        }

    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }



    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,

        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);

            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false,

                })
                emitter.emit('ENVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (e) {
            console.log(e)
        }

    }

    handleDeleteUser = async (user) => {
        // console.log('click delete', user)
        try {
            let response = await deleteUserService(user.id);
            // console.log(response)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();

            }
        } catch (e) {
            console.log(e)
        }


    }

    handleEditUser = async (user) => {
        try {
            // console.log('check edit user', user)
            this.setState({
                isOpenModalEditUser: true,
                userEdit: user
            })

        } catch (e) {
            console.log(e)
        }
    }

    doEditUser = async (user) => {
        // console.log('click save', user);
        try {
            let response = await editUserService(user);

            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalEditUser: false,

                })
            }
        } catch (e) {
            console.log(e)
        }

    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

                <div className='title text-center'>Manage users</div>
                <div className='mx-2'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus">  Add New User</i>

                    </button>

                </div>
                <div className='user-table mt-3 mx-2'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                // console.log(item, index)
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className='btn-edit'
                                                onClick={() => { this.handleEditUser(item) }}
                                            >Edit</button>
                                            <button
                                                className='btn-delete'
                                                onClick={() => { this.handleDeleteUser(item) }}
                                            >Delete</button>

                                        </td>

                                    </tr>

                                )

                            })
                            }


                        </tbody>
                    </table>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
