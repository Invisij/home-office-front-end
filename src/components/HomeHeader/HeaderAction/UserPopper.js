import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../../store/actions';

import 'tippy.js/dist/tippy.css';
import './UserPopper.scss';

class UserPopper extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { processLogout, isLoggedIn, userInfo } = this.props;
        return (
            <div className="user-popper-wrapper">
                {isLoggedIn && userInfo ? (
                    <div className="user-popper-content">
                        {(userInfo.roleId == 'R1' || 'R2' == userInfo.roleId) && (
                            <div className="user-popper-item">
                                <Link to={`/system`} className="user-popper-link">
                                    Trang quản lý
                                </Link>
                            </div>
                        )}
                        <div className="user-popper-item">
                            <Link to={`/user-info-page/${userInfo.id}`} className="user-popper-link">
                                Thông tin tài khoản
                            </Link>
                        </div>
                        <div className="user-popper-item">
                            <Link to={`/order/order-search/${this.props.userInfo.id}`} className="user-popper-link">
                                Đơn hàng
                            </Link>
                        </div>
                        <div className="user-popper-item">
                            <div className="btn-signin user-btn" onClick={processLogout}>
                                Đăng xuất
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="user-popper-content">
                        <div className="user-popper-item">
                            <Link to="/login" className="user-popper-link">
                                Đăng nhập
                            </Link>
                        </div>
                        <div className="user-popper-item">
                            <Link to="/register" className="user-popper-link">
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPopper);
