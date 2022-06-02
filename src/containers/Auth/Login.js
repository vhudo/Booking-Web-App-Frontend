import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { KeyCodeUtils } from "../../utils";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            acceptBtnRef: React.createRef()

        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown);
    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            if (!this.state.acceptBtnRef.current || this.state.acceptBtnRef.current.disabled) return;
            this.state.acceptBtnRef.current.click();
        }
    }

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
        // console.log(e.target.value)
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
        // console.log(e.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                // console.log(data.user)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {
        //JSX

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUsername(e)}
                            />
                        </div>
                        <div className='col-12 form-group login-input mt-2'>
                            <label>Password</label>
                            <input
                                type={this.state.isShowPassword ? 'text' : 'password'}
                                className='form-control'
                                placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(e) => this.handleOnChangePassword(e)}
                            />


                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className='col-12 showPassword mt-2'>
                            <input
                                onClick={() => { this.handleShowHidePassword() }}
                                type='checkbox'

                            />
                            <label>Show password</label>
                        </div>

                        <div className='col-12'>
                            <button ref={this.state.acceptBtnRef} className='btn-login mt-3' onClick={(e) => { this.handleLogin() }}>
                                Log In</button>
                        </div>

                        <div className='col-12 mt-2'>
                            <span className='forgot-password'>Forget Password</span>
                        </div>
                        <div className='col-12 text-center mt-4'>
                            <span className='text-social-login'> Or sign it with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus google-icon"></i>
                            <i className="fab fa-facebook-f facebook-icon"></i>
                            <i className="fab fa-apple apple-icon"></i>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
