import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { EmitterUtils } from '../../utils';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
        };
        this.listenToEmitter();
    }

    listenToEmitter = () => {
        EmitterUtils.on(`clear modal data`, () => {
            this.setState({
                email: '',
                password: '',
                role: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
            });
        });
    };

    componentDidMount() {}

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnchangeInput = (event, name) => {
        let copyState = { ...this.state };
        copyState[name] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    validateInput = () => {
        let isValid = true;
        const arrInput = ['email', 'password', 'role'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('missing parameter');
                break;
            }
        }
        return isValid;
    };

    handleAddUser = () => {
        const isValid = this.validateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }
    };

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} {...this.props}>
                    <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                    <ModalBody>
                        <div className="modal-body-user">
                            <div className="input-container">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="type your email..."
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="type your password..."
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="role">Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    placeholder="type your role..."
                                    value={this.state.role}
                                    onChange={(event) => this.handleOnchangeInput(event, 'role')}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="type your first name..."
                                    value={this.state.firstName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="type your last name..."
                                    value={this.state.lastName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="type your phone number..."
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="type your address..."
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="px-3" onClick={() => this.handleAddUser()}>
                            Add new
                        </Button>{' '}
                        <Button color="secondary" className="px-3" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
