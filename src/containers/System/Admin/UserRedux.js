import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import "./UserRedux.scss";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: "",
            isOpen: false,

            email: "",
            password: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",

            action: "",
            userEditId: "",
        };
    }

    async componentDidMount() {
        this.props.getGenderRequest();
        this.props.getRoleRequest();
        this.props.getPositionRequest();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            });
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            });
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            });
        }

        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderRedux
            let arrPosition = this.props.positionRedux
            let arrRole = this.props.roleRedux
            this.setState({
                email: "",
                password: "",
                address: "",
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',

                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',

                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                firstName: "",
                lastName: "",
                phoneNumber: "",
                avatar: "",
                previewImgUrl: "",
                action: CRUD_ACTIONS.CREATE,
            }, () => {
                // console.log("callback", this.state)
            }
            )
        }
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true,
        });
    };
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;

        let { action } = this.state

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create action
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit action
            this.props.editUserRequest({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
            console.log(this.state.avatar)
        }

    };

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address', 'gender', 'role', 'position']
        console.log(this.state)
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('this input is required: ' + arrCheck[i])
                break
            }
        }

        return isValid

    }



    onChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState(
            {
                ...copyState,
            }
        );
    };

    handleEditUser = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary')
        }


        this.setState({
            email: user.email,
            password: 'hardcode ',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        }, () => {
            // console.log("callback check base64", this.state)
        })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;

        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
        } = this.state;

        return (
            <div className="user-redux-container">
                <div className="title">MANAGE USERS (LEARN ON REDUX)</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                                {" "}
                                <FormattedMessage id="manage-user.title" />{" "}
                            </div>
                            <div className="col-12">
                                {isGetGender === true ? "loading gender" : ""}
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    type="email"
                                    className="form-control"

                                    onChange={(e) => {
                                        this.onChangeInput(e, "email");
                                    }}
                                    value={email}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={(e) => {
                                        this.onChangeInput(e, "password");
                                    }}
                                    value={password}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>

                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    onChange={(e) => {
                                        this.onChangeInput(e, "firstName");
                                    }}
                                    value={firstName}
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"

                                    onChange={(e) => {
                                        this.onChangeInput(e, "lastName");
                                    }}
                                    value={lastName}
                                />
                            </div>

                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phoneNumber"


                                    onChange={(e) => {
                                        this.onChangeInput(e, "phoneNumber");
                                    }}
                                    value={phoneNumber}
                                />
                            </div>

                            <div className="col-9">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"

                                    onChange={(e) => {
                                        this.onChangeInput(e, "address");
                                    }}
                                    value={address}
                                />
                            </div>

                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(e) => {
                                        this.onChangeInput(e, "gender");
                                    }}
                                    value={gender}
                                >
                                    {/* <option defaultValue>Choose...</option> */}
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.EN
                                                        ? item.valueEn
                                                        : item.valueVi}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(e) => {
                                        this.onChangeInput(e, "role");
                                    }}
                                    value={role}
                                >
                                    {/* <option defaultValue>Choose...</option> */}
                                    {roles && (roles.length > 0) &&
                                        roles.map((item, index) => {
                                            return (

                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.EN
                                                        ? item.valueEn
                                                        : item.valueVi}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(e) => {
                                        this.onChangeInput(e, "position");
                                    }}
                                    value={position}
                                >
                                    {/* <option defaultValue>Choose...</option> */}
                                    {positions && (positions.length > 0) &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.EN
                                                        ? item.valueEn
                                                        : item.valueVi}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-container">
                                    <input
                                        id="previewImg"
                                        type="file"
                                        hidden
                                        onChange={(e) => this.handleOnChangeImage(e)}
                                    />
                                    <div
                                        className="preview-img mb-2"
                                        style={{
                                            backgroundImage: `url(${this.state.previewImgUrl})`,
                                        }}
                                        onClick={(e) => this.openPreviewImage()}
                                    ></div>

                                    <label className="label-upload" htmlFor="previewImg">
                                        Upload Image
                                        <i className="fas fa-upload"></i>
                                    </label>

                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    type="submit"
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={(e) => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />
                                    }

                                </button>
                            </div>

                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUser={this.handleEditUser}
                                />
                            </div>


                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.user.genders,
        positionRedux: state.user.positions,
        roleRedux: state.user.roles,
        isLoadingGender: state.user.isLoadingGender,
        isLoadingRole: state.user.isLoadingRole,
        isLoadingPosition: state.user.isLoadingPosition,
        users: state.user.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderRequest: () => dispatch(actions.fetchGenderRequest()),
        getPositionRequest: () => dispatch(actions.fetchPositionRequest()),
        getRoleRequest: () => dispatch(actions.fetchRoleRequest()),
        createNewUser: (data) => dispatch(actions.createNewUserRequest(data)),
        fetchUserRequest: () => dispatch(actions.fetchAllUserRequest()),
        editUserRequest: (data) => dispatch(actions.editUserRequest(data)),

        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
