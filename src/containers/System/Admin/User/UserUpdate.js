import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import userService from '../../../../services/userService';
import * as action from '../../../../store/actions';

import './UserUpdate.scss';

class UserUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleArr: [],
            user: this.props.location.user,
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
        let copyState = { ...this.state.user };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleUpdateUser = async () => {
        const response = await userService.updateUser({
            id: this.state.user.id,
            roleId: this.state.user.roleId,
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            phoneNumber: this.state.user.phoneNumber,
            billingAddress: this.state.user.billingAddress,
        });
        console.log(this.props);
        if (response && response.errCode === 0) {
            this.props.history.push('/system/user-manage');
            toast.success('Sửa thông tin thành công');
        } else {
            toast.warning('Sửa thông tin thất bại');
        }
    };

    render() {
        if (!this.props.location.user) {
            this.props.history.push('/system/user-manage');
        }
        return (
            <div className="user-redux-container">
                <div className="title">Cập nhật thông tin người dùng</div>
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
                                    value={this.state.user.email}
                                    disabled
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <label className="form-label">Vai trò</label>
                                <select
                                    className="form-select"
                                    value={this.state.user.roleId}
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
                            <div className="col-12"></div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Họ</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập họ..."
                                    value={this.state.user.lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <label className="form-label">Tên</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập tên..."
                                    value={this.state.user.firstName}
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
                                    value={this.state.user.phoneNumber}
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
                                    value={this.state.user.billingAddress}
                                    onChange={(event) => this.onChangeInput(event, 'billingAddress')}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-3"
                                    onClick={() => this.handleUpdateUser()}
                                >
                                    Sửa thông tin
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

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);
