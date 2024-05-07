import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';

import userService from '../../services/userService';
import { EmitterUtils } from '../../utils';
import ModalUser from './ModalUser';
import ModalUpdateUser from './ModalUpdateUser';

import './UserManage.scss';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalUpdateUser: false,
            UpdateUser: {},
        };
    }

    async componentDidMount() {
        this.readUser();
    }
    readUser = async () => {
        const response = await userService.getUser();
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.data,
            });
        }
    };

    handleName = async (event) => {
        const response = await userService.getUser(event.target.value);
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.data,
            });
        }
    };

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };
    toggleModalUpdateUser = () => {
        this.setState({
            isOpenModalUpdateUser: !this.state.isOpenModalUpdateUser,
        });
    };

    createNewUser = async (data) => {
        const response = await userService.createUser(data);
        if (response && response.errCode === 0) {
            this.readUser();
            this.setState({
                isOpenModalUser: !this.state.isOpenModalUser,
            });
            EmitterUtils.emit(`clear modal data`);
        } else {
            alert(response.message);
        }
    };

    handleDeleteUser = async (user) => {
        const response = await userService.deleteUser(user.id);
        if (response && response.errCode === 0) {
            this.readUser();
        } else {
            alert(response.message);
        }
    };
    handleUpdateUser = async (user) => {
        this.setState({
            isOpenModalUpdateUser: !this.state.isOpenModalUpdateUser,
            UpdateUser: user,
        });
    };
    UpdateUser = async (user) => {
        const response = await userService.updateUser(user);
        if (response && response.errCode === 0) {
            this.readUser();
            this.setState({
                isOpenModalUpdateUser: !this.state.isOpenModalUpdateUser,
            });
        } else {
            alert(response.message);
        }
    };

    render() {
        return (
            <div className="user-container container mt-5">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                    className="modal-container-user"
                    size="xl"
                    backdrop={true}
                    fade={true}
                    centered={true}
                />
                {this.state.isOpenModalUpdateUser && (
                    <ModalUpdateUser
                        isOpen={this.state.isOpenModalUpdateUser}
                        toggleFromParent={this.toggleModalUpdateUser}
                        currentUser={this.state.UpdateUser}
                        UpdateUser={this.UpdateUser}
                        className="modal-container-user"
                        size="xl"
                        backdrop={true}
                        fade={true}
                        centered={true}
                    />
                )}
                <div className="title text-center mb-5">Manage users</div>
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
                                    placeholder="Username"
                                    onChange={(event) => this.handleName(event)}
                                />
                                <label htmlFor="firstName">Username</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-8"></div>
                    <div className="col-2 text-right text mt-1">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg button-text"
                            onClick={() => this.toggleModalUser()}
                        >
                            Create new user
                        </button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Billing address</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.arrUser.map((user, index) => {
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
