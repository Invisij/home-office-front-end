import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'tippy.js/dist/tippy.css';
import './UserPopper.scss';

class UserPopper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
        };
    }
    render() {
        return (
            <div className="user-popper-wrapper">
                <a href="/login" className="btn-signin user-btn">
                    Đăng nhập
                </a>
                <a href="/" className="btn-signup user-btn">
                    Đăng ký
                </a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPopper);
