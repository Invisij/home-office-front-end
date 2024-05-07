import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import * as actions from '../../store/actions';
import userService from '../../services/userService';

import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
            hiddenPassword: 'false',
            errMessage: '',
        };
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    };
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleLogin = async () => {
        this.setState({
            errMessage: '',
        });
        const response = await userService.handleLogin(this.state.email, this.state.password);
        console.log(response);

        if (response && response.errCode === 0) {
            this.props.userLoginSuccess(response.data);
        } else {
            this.setState({
                errMessage: '! ' + response.message,
            });
        }
    };

    handleHiddenPassword = () => {
        this.setState({ hiddenPassword: !this.state.hiddenPassword });
    };
    render() {
        return (
            <div className="login-background">
                <div className="login-container container">
                    <div className="login-content row">
                        <div className="col-12 text-center">
                            <span className="text-login">Login</span>
                        </div>
                        <div className="col-12 form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type your email"
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            ></input>
                            <FontAwesomeIcon className="icon-input" icon={faUser} />
                        </div>
                        <div className="col-12 form-group">
                            <label>Password</label>
                            <input
                                type={this.state.hiddenPassword ? 'password' : 'text'}
                                className="form-control"
                                placeholder="Type your password"
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassword(event)}
                            ></input>
                            <FontAwesomeIcon className="icon-input" icon={faLock} />
                            <FontAwesomeIcon
                                className="hidden-password"
                                icon={this.state.hiddenPassword ? faEyeSlash : faEye}
                                onClick={() => this.handleHiddenPassword()}
                            />
                        </div>
                        <div className="col-5 text-left ms-4 err-message forgot-password">
                            <span>{this.state.errMessage || ''}</span>
                        </div>
                        <div className="col-6 text-right forgot-password">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn-login" onClick={() => this.handleLogin()}>
                                Login
                            </button>
                        </div>
                        <div className="col-12 text-center text-other-login">
                            <span>Or Login Using</span>
                        </div>
                        <div className="col-12 text-center social-login">
                            <FontAwesomeIcon className="google" icon={faGoogle} />
                            <FontAwesomeIcon className="facebook" icon={faFacebook} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
