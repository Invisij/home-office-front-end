import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import HomeFooter from '../components/HomeFooter/HomeFooter';

import CartPage from '../containers/CartPage/CartPage';

import './Cart.scss';

class Cart extends Component {
    render() {
        return (
            <div className="cart-container">
                <div className="cart-header container">
                    <Link to="/" className="cart-logo" />
                </div>
                <div className="cart-body">
                    <Switch>
                        <Route path="/cart/:id" component={CartPage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
