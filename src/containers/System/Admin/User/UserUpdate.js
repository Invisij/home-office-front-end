import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import userService from '../../../../services/userService';
import * as action from '../../../../store/actions';

import './UserUpdate.scss';

class UserUpdate extends Component {
    constructor(props) {
        super(props);
        const { id, email, roleId, firstName, lastName, phoneNumber, billingAddress } = this.props.location.state.user;
        this.state = {
            roleArr: [],
            id,
            email,
            roleId,
            firstName,
            lastName,
            phoneNumber,
            billingAddress,
        };
    }

    componentDidMount() {
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roleArr !== this.props.roleArr) {
            this.setState({
                roleArr: this.props.roleArr,
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

    handleUpdateUser = async () => {
        const response = await userService.updateUser({
            id: this.state.id,
            roleId: this.state.roleId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            billingAddress: this.state.billingAddress,
        });
        if (response && response.errCode === 0) {
            this.props.history.push('/system/user-manage');
            toast.success('Sửa thông tin thành công');
        } else {
            toast.warning('Sửa thông tin thất bại');
        }
    };

    handleBack = () => {
        this.props.history.push('/system/user-manage');
        return;
    };

    render() {
        return (
            <div className="user-update-container">
                <div className="title">Cập nhật thông tin người dùng</div>
                <div className="user-update-body mt-5">
                    <div className="container">
                        <div className="mb-3 btn-back" onClick={() => this.handleBack()}>
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                            <span className="ms-3">Quay lại</span>
                        </div>
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Nhập email..."
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    value={this.state.email}
                                    disabled
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
