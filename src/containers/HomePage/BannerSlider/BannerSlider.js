import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BannerSlider.scss';

import slider1 from '../../../assets/banner/slider1.jpg';
import slider2 from '../../../assets/banner/slider2.jpg';
import slider3 from '../../../assets/banner/slider3.jpg';

class BannerSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    settings = {
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        adaptiveHeight: false,
    };
    render() {
        return (
            <div className={'image-slider-container ' + this.props.className}>
                <Slider {...this.settings}>
                    {/* <div className="image-slider">
                        <img src={slider1} alt="" />
                    </div> */}
                    <div className="image-slider">
                        <img src={slider2} alt="" />
                    </div>
                    <div className="image-slider">
                        <img src={slider3} alt="" />
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
