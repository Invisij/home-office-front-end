import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../../store/actions';
import userService from '../../services/userService';

import './Register.scss';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
            repeatPassword: undefined,
            errMessage: '',
        };
    }
    handleOnChangeInput = (event, type) => {
        const copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    checkPassword = () => {
        if (this.state.password === this.state.repeatPassword) return true;
        return false;
    };

    handleRegister = async () => {
        this.setState({
            errMessage: '',
        });
        if (!this.checkPassword) {
            this.setState({
                errMessage: 'Nhập lại mật khẩu!!!',
            });
            return;
        }
        const response = await userService.createUser({ email: this.state.email, password: this.state.password });

        if (response && response.errCode === 0) {
            this.props.userLoginSuccess(response.data);
        } else {
            this.setState({
                errMessage: '! ' + response.message,
            });
        }
    };

    render() {
        return (
            <div className="register-background">
                <div className="register-container container">
                    <div className="register-content row">
                        <div className="col-12 text-center">
                            <span className="text-register">Đăng ký</span>
                        </div>
                        <div className="col-12 form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="nhập email"
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                            ></input>
                            <FontAwesomeIcon className="icon-input" icon={faUser} />
                        </div>
                        <div className="col-12 form-group">
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nhập mật khẩu"
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                            ></input>
                            <FontAwesomeIcon className="icon-input" icon={faLock} />
                        </div>
                        <div className="col-12 form-group">
                            <label>Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nhập lại mật khẩu"
                                value={this.state.repeatPassword}
                                onChange={(event) => this.handleOnChangeInput(event, 'repeatPassword')}
                            ></input>
                            <FontAwesomeIcon className="icon-input" icon={faLock} />
                        </div>
                        <div className="col-5 text-left ms-4 err-message forgot-password">
                            <span>{this.state.errMessage || ''}</span>
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn-register" onClick={() => this.handleRegister()}>
                                đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
