import React, { Component } from 'react';
import { connect } from 'react-redux';

import productService from '../../services/productService';

import BannerSlider from './BannerSlider/BannerSlider';
import HomePageCat from '../../components/Sections/HomePageCat';

import ban1 from '../../assets/images/ban/banner-small-2023-19.jpg';
import ban2 from '../../assets/images/ban/banner-small-2023-22.jpg';
import ban3 from '../../assets/images/ban/banner-small-2023-23.jpg';
import ban4 from '../../assets/images/ban/banner-small-2023-24.jpg';
import ghe1 from '../../assets/images/ghe/banner-small-2023-25.jpg';
import ghe2 from '../../assets/images/ghe/banner-small-2023-26.jpg';
import ghe3 from '../../assets/images/ghe/banner-small-2023-27.jpg';
import ghe4 from '../../assets/images/ghe/banner-small-2023-28.jpg';

import './HomePage.scss';

const banList = [
    {
        id: 1,
        name: 'Ảnh bàn 1',
        image: ban1,
    },
    {
        id: 2,
        name: 'Ảnh bàn 2',
        image: ban2,
    },
    {
        id: 3,
        name: 'Ảnh bàn 3',
        image: ban3,
    },
    {
        id: 4,
        name: 'Ảnh bàn 4',
        image: ban4,
    },
];
const gheList = [
    {
        id: 1,
        name: 'Ảnh ghế 1',
        image: ghe1,
    },
    {
        id: 2,
        name: 'Ảnh ghế 2',
        image: ghe2,
    },
    {
        id: 3,
        name: 'Ảnh ghế 3',
        image: ghe3,
    },
    {
        id: 4,
        name: 'Ảnh ghế 4',
        image: ghe4,
    },
];

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subCatArr: [],
            allProductArr: [],
            productSubCatArr: [],
        };
    }

    componentDidMount() {
        this.readProduct();
        this.readProductBySubCatId(1);
        this.readProductBySubCatId(3);
    }

    readProduct = async () => {
        const response = await productService.readProduct();
        if (response && response.errCode === 0) {
            response.data.forEach((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
            });
            this.setState({
                allProductArr: response.data,
            });
        }
    };
    readProductBySubCatId = async (subCatId) => {
        const response = await productService.readProductBySubCatId(subCatId);
        if (response && response.errCode === 0) {
            response.data.forEach((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
            });
            const copyState = { ...this.state };
            copyState.productSubCatArr[subCatId] = response.data;
            this.setState({
                ...copyState,
            });
        }
    };

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

                {/* <HomePageCat type="image&name" title="Danh Mục Nổi Bật" content={this.state.allProductArr} /> */}
                <HomePageCat type="full" title="mẫu mới 2024" content={this.state.allProductArr} />
                <HomePageCat type="image" content={banList} />
                <HomePageCat type="full" title="Bàn làm việc" content={this.state.productSubCatArr[1]} />
                <HomePageCat type="image" content={gheList} />
                <HomePageCat type="full" title="Ghế sofa" content={this.state.productSubCatArr[3]} />
                <HomePageCat type="introduce" title="SẢN PHẨM NỘI THẤT HOMEOFFICE" />
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
