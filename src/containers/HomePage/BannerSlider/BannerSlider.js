import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './BannerSlider.scss';

class BannerSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const settings = {
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            adaptiveHeight: false,
        };
        return (
            <div className={'image-slider-container ' + this.props.className}>
                <Slider {...settings}>
                    <div className="image-slider">
                        <img src="https://homeoffice.com.vn/images/promo/99/banner-homeoffice.jpg" />
                    </div>
                    <div className="image-slider">
                        <img src="https://homeoffice.com.vn/images/promo/99/banner-ghe-van-phong-a1.jpg" />
                    </div>
                    <div className="image-slider">
                        <img src="https://homeoffice.com.vn/images/promo/93/banner-nhan-san-xuat-theo-yeu-cau-a2.jpg" />
                    </div>
                </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerSlider);
