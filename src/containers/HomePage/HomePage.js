import React, { Component } from 'react';
import { connect } from 'react-redux';

import BannerSlider from './BannerSlider/BannerSlider';
import HomePageCat from './Sections/HomePageCat';

import './HomePage.scss';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="home-page ">
                <div className="banner">
                    <BannerSlider className="banner-slider" />
                    <div className="banner-image">
                        <span className="banner-image-1" />
                        <span className="banner-image-2" />
                    </div>
                </div>
                <HomePageCat />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
