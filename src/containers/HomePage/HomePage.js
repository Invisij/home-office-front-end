import React, { Component } from 'react';
import { connect } from 'react-redux';

import BannerSlider from './BannerSlider/BannerSlider';

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
                <div className="section">1</div>
                <div className="section">2</div>
                <div className="section">3</div>
                <div className="section">4</div>
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
