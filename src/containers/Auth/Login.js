import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import * as actions from '../../store/actions';

import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hiddenPassword: 'false',
        };
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };
    handleLogin = (event) => {
        // console.log('all state: ', this.state);
    };
    handleHiddenPassword = () => {
        this.setState({ hiddenPassword: !this.state.hiddenPassword });
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-conteiner">
                    <div className="login-content">
                        <div className="col-12 text-center">
                            <span className="text-login">Login</span>
                        </div>
                        <div className="col-12 form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
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
                        <div className="col-12 text-right forgot-password">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn-login" onClick={(event) => this.handleLogin(event)}>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
