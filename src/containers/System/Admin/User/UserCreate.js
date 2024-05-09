import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import userService from '../../../../services/userService';
import * as action from '../../../../store/actions';

import './UserCreate.scss';

class UserCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleArr: [],
            email: '',
            roleId: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            billingAddress: '',
        };
    }

    componentDidMount() {
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roleArr !== this.props.roleArr) {
            this.setState({
                roleArr: this.props.roleArr,
                roleId: this.props.roleArr[2].key,
            });
        }
    }

    onChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    validateEmail = () => {};

    validatePassword = () => {};

    validateConfirmPassword = () => {
        if (this.state.password === this.state.confirmPassword) {
            return true;
        }
        return false;
    };

    handleAddUser = async () => {
        if (!this.validateConfirmPassword()) {
            return;
        }
        const response = await userService.createUser({
            email: this.state.email,
            password: this.state.password,
            roleId: this.state.roleId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            billingAddress: this.state.billingAddress,
        });
        console.log(this.props);
        if (response && response.errCode === 0) {
            this.props.history.push('/system/user-manage');
            toast.success('Thêm người dùng thành công');
        } else {
            toast.warning('Thêm người dùng thất bại');
        }
    };

    render() {
        return (
            <div className="user-redux-container">
                <div className="title">Tạo người dùng</div>
                <div className="user-redux-body mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Nhập email..."
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <label className="form-label">Vai trò</label>
                                <select
                                    className="form-select"
                                    value={this.state.roleId}
                                    onChange={(event) => this.onChangeInput(event, 'roleId')}
                                >
                                    {this.state.roleArr.map((item) => (
                                        <option key={item.key} value={item.key}>
                                            {item.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Mật khẩu</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Nhập mật khẩu..."
                                    value={this.state.password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                />
                            </div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Nhập lại mật khẩu</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu..."
                                    value={this.state.confirmPassword}
                                    onChange={(event) => this.onChangeInput(event, 'confirmPassword')}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Họ</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập họ..."
                                    value={this.state.lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <label className="form-label">Tên</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập tên..."
                                    value={this.state.firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Điện thoại</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập điện thoại..."
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-6 mb-3">
                                <label className="form-label">Địa chỉ giao hàng</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập địa chỉ..."
                                    value={this.state.billingAddress}
                                    onChange={(event) => this.onChangeInput(event, 'billingAddress')}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-3"
                                    onClick={() => this.handleAddUser()}
                                >
                                    Thêm người dùng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        roleArr: state.admin.roleArr,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRoleStart: () => dispatch(action.getRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
