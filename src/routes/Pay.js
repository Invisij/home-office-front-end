import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import HomeFooter from '../components/HomeFooter/HomeFooter';

import PayPage from '../containers/PayPage/PayPage';

import './Pay.scss';

class Pay extends Component {
    render() {
        return (
            <div className="pay-container">
                <div className="pay-header container">
                    <Link to="/" className="pay-logo" />
                </div>
                <div className="pay-body">
                    <Switch>
                        <Route path="/pay/:id" component={PayPage} />
                        <Route exact render={() => <Redirect to="/" />} />
                    </Switch>
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
