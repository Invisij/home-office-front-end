import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HomePageCat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

class HomePageCat extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const list1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const list2 = [1, 2, 3, 4];
        const list3 = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
        ];
        return (
            <div className="home-page-cat">
                <h2 className="home-page-cat-title">Danh Mục Nổi Bật</h2>
                <div className="home-page-cat-list-1">
                    {list1.map((item) => (
                        <div key={item} className="home-page-cat-item-1">
                            <a href="/">
                                <img
                                    className="home-page-cat-item-img-1"
                                    src="https://homeoffice.com.vn/images/companies/1/banner/2021/ban-TaUPDesk-140x70cm-go-tram-chan-sat-rectang-01.jpg"
                                    alt="item"
                                />
                                <span className="home-page-cat-item-title-1">Bàn làm việc</span>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="home-page-cat-list-2">
                    {list2.map((item) => (
                        <div key={item} className="home-page-cat-item-2">
                            <a href="/">
                                <img
                                    className="home-page-cat-item-img-2"
                                    src="https://homeoffice.com.vn/images/companies/1/Image/homepage/banner-small-2023-19.jpg"
                                    alt="item"
                                />
                            </a>
                        </div>
                    ))}
                </div>
                <h2 className="home-page-cat-title">Mẫu mới 2024</h2>
                <div className="home-page-cat-list-3">
                    {list3.map((item) => (
                        <div key={item} className="home-page-cat-item-3">
                            <div className="home-page-cat-item-img-3">
                                <a href="/">
                                    <img
                                        src="https://homeoffice.com.vn/images/thumbnails/300/300/detailed/98/ban-lam-viec-co-hoc-di-day-go-tram-1.jpg"
                                        alt="item"
                                    />
                                </a>
                            </div>
                            <div className="home-page-cat-item-discount-3">
                                <span>KM T5</span>
                            </div>
                            <div className="home-page-cat-item-discount-value-3">
                                <span>-15%</span>
                            </div>
                            <div className="home-page-cat-item-name-3">
                                <a href="/">Bàn làm việc có hộp đi dây 120x70cm gỗ tràm chân chữ A SPD68217</a>
                            </div>
                            <div className="home-page-cat-item-price-3">
                                <span className="price">2,950,000 vnđ</span>
                                <span className="price-update">2,655,000 vnđ</span>
                            </div>
                            <div className="home-page-cat-item-rating-3">
                                <span>
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStarHalfStroke} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <h2 className="home-page-cat-title">SẢN PHẨM NỘI THẤT HOMEOFFICE</h2>
                <div className="home-page-cat-list-4">
                    {list2.map((item) => (
                        <div key={item} className="home-page-cat-item-4">
                            <div className="home-page-cat-item-index-4">
                                <span>{item}</span>
                            </div>
                            <div className="home-page-cat-item-title-4">
                                <h2>Chất Liệu Ưu Việt</h2>
                                <p>
                                    Chất liệu tạo nên sản phẩm nội thất luôn là yếu tố quan trọng nhất được Homeoffice
                                    chú trọng lựa chọn. Từ các vật liệu gỗ, kim loại các loại phụ kiện sơn điều được các
                                    chuyên gia của Homeoffice lựa chọn kỹ càng từ các nhà cung cấp tốt nhất.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePageCat);
