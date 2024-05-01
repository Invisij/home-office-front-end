import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from '../containers/HomePage/HomePage';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import HomeFooter from '../components/HomeFooter/HomeFooter';

import './Home.scss';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <HomeHeader />
                <div className="home-body">
                    <Switch>
                        {/* <Route path="" component={HomePage} /> */}
                        {/* <Route path="/home" component={HomePage} /> */}
                        <Route path="" component={HomePage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
