import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from '../containers/Header/Header';
import UserManage from '../containers/System/Admin/User/UserManage';
import UserCreate from '../containers/System/Admin/User/UserCreate';
import UserUpdate from '../containers/System/Admin/User/UserUpdate';
import MainCatCreate from '../containers/System/Admin/Category/MainCatCreate';
import SubCatCreate from '../containers/System/Admin/Category/SubCatCreate';
import ProductCreate from '../containers/System/Admin/Product/ProductCreate';

import './System.scss';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <Header />
                <div className="system-body">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-create" component={UserCreate} />
                        <Route path="/system/user-update" component={UserUpdate} />
                        <Route path="/system/main-cat-create" component={MainCatCreate} />
                        <Route path="/system/suv-cat-create" component={SubCatCreate} />
                        <Route path="/system/product-create" component={ProductCreate} />

                        <Route
                            component={() => {
                                return <Redirect to={systemMenuPath} />;
                            }}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
