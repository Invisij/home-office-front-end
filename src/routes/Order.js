import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import HomeFooter from '../components/HomeFooter/HomeFooter';

import OrderPage from '../containers/OrderPage/OrderPage';

import './Order.scss';

class Order extends Component {
    render() {
        return (
            <div className="order-container">
                <div className="order-header container">
                    <Link to="/" className="order-logo" />
                </div>
                <div className="order-body">
                    <Switch>
                        <Route path="/order/:id" component={OrderPage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Order);
