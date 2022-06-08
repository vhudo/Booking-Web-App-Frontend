import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
            userEditRedux: {},
        };
    }

    componentDidMount() {
        this.props.fetchUserRequest()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                userRedux: this.props.users
            })
        }
    }

    handleDeleteUser = (user) => {
        // console.log('click delete', user)
        this.props.deleteUser(user.id)
    }

    handleEditUser = (user) => {
        // console.log('click save', user);
        this.props.handleEditUser(user)
    }

    render() {
        let arrUsers = this.state.userRedux;
        return (
            <Fragment>
                < table id="TableManageUser" >
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                // console.log(item, index)
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => {
                                                    this.handleEditUser(item);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => {
                                                    this.handleDeleteUser(item);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table >

                {/* <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.user.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRequest: () => dispatch(actions.fetchAllUserRequest()),
        deleteUser: (id) => dispatch(actions.deleteUserRequest(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
