import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

import userService from '../../../../services/userService';

import './UserManage.scss';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArr: [],
        };
    }

    componentDidMount() {
        this.readUser();
    }

    readUser = async () => {
        const response = await userService.readUser();
        if (response && response.errCode === 0) {
            this.setState({
                userArr: response.data,
            });
        }
    };

    handleName = async (event) => {
        const response = await userService.readUser(event.target.value);
        if (response && response.errCode === 0) {
            this.setState({
                userArr: response.data,
            });
        }
    };

    handleCreateUser = () => {
        this.props.history.push('/system/user-create');
    };

    handleUpdateUser = (user) => {
        this.props.history.push({
            pathname: `/system/user-update/${user.id}`,
        });
    };

    handleDeleteUser = async (user) => {
        const response = await userService.deleteUser(user.id);
        if (response && response.errCode === 0) {
            this.readUser();
            toast.success('Xóa người dùng thành công');
        } else {
            toast.warning('Xóa người dùng thất bại');
        }
    };

    render() {
        return (
            <div className="user-container container mt-5">
                <div className="title text-center mb-5">Quản lý người dùng</div>
                <div className="row">
                    <div className="col-2">
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control input-name"
                                    name="firstName"
                                    placeholder="Tên người dùng..."
                                    onChange={(event) => this.handleName(event)}
                                />
                                <label htmlFor="firstName">Tên người dùng</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-7"></div>
                    <div className="col-3 text-right text mt-1">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg button-text"
                            onClick={() => this.handleCreateUser()}
                        >
                            Tạo người dùng mới
                        </button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Vai trò</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Họ</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ nhận hàng</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userArr.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user.roleId}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.billingAddress}</td>
                                    <td>
                                        <div onClick={() => this.handleUpdateUser(user)} className="icon-action">
                                            <FontAwesomeIcon className="icon-edit" icon={faPenToSquare} />
                                        </div>
                                        <div onClick={() => this.handleDeleteUser(user)} className="icon-action">
                                            <FontAwesomeIcon className="icon-delete" icon={faTrashCan} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
