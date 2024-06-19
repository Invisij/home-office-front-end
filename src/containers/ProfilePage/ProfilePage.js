import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './ProfilePage.scss';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
        if (this.props.userInfo !== prevProps.userInfo) {
            this.setState({
                userInfo: this.props.userInfo,
            });
        }
    }

    render() {
        return (
            <div className="profile-container container">
                <h1 className="title">Thông tin tài khoản</h1>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
