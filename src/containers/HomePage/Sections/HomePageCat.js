import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

import discountService from '../../../services/discountService';

import './HomePageCat.scss';

const introductList = [
    {
        id: 1,
        title: 'CHẤT LIỆU ƯU VIỆT',
        description:
            'Chất liệu tạo nên sản phẩm nội thất luôn là yếu tố quan trọng nhất được Homeoffice chú trọng lựa chọn. Từ các vật liệu gỗ, kim loại các loại phụ kiện sơn điều được các chuyên gia của Homeoffice lựa chọn kỹ càng từ các nhà cung cấp tốt nhất.',
    },
    {
        id: 2,
        title: 'SẢN XUẤT HOÀN THIỆN',
        description:
            'HomeOffice trở nên hoàn hảo qua quá trình sản xuất và chất lượng thi công, từ bàn tay những người thợ lành nghề của chúng tôi. Các sản phẩm của HomeOffice đa phần được chúng tôi làm từ khâu đầu tiên đến khâu cuối cùng.',
    },
    {
        id: 3,
        title: 'THIẾT KẾ PHÙ HỢP',
        description:
            'Thiết kế đơn giản dựa trên các nguyên tắc chuẩn trong thiết kế, sản phẩm HomeOffice được chúng tôi nghiên cứu từ kiểu dáng đến quy cách phù hợp với các tiêu chuẩn, bên cạnh việc phù hợp các chất liệu tốt và thi công hoàn thiện.',
    },
    {
        id: 4,
        title: 'CÁ NHÂN HÓA',
        description:
            'HomeOffice chính là những người thợ may đo trong ngành nội thất mà các bạn đang tìm kiếm. Bạn cần một kích thước khác, bạn cần một sự tùy biến về màu sắc, việc của bạn chỉ đơn giản là liên hệ với chúng tôi.',
    },
];

class HomePageCat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discountArr: [],
        };
    }

    componentDidMount() {
        this.readDiscount();
    }

    readDiscount = async () => {
        const response = await discountService.readDiscount();
        if (response && response.errCode === 0) {
            this.setState({
                discountArr: response.data,
            });
        }
    };

    getRandomRating() {
        const randomRating = (Math.random() * 5).toFixed(1);
        return Math.round(randomRating * 2) / 2;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        return (
            <div className="home-page-cat-item-rating-3">
                {[...Array(fullStars)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} />
                ))}
                {halfStar && <FontAwesomeIcon icon={faStarHalfStroke} />}
            </div>
        );
    }

    formatCurrency(number) {
        const numStr = Number(number).toString();
        const numArr = numStr.split('');
        numArr.reverse();
        for (let i = 3; i < numArr.length; i += 4) {
            numArr.splice(i, 0, ',');
        }
        numArr.reverse();
        const formattedNumber = numArr.join('') + ' vnđ';
        return formattedNumber;
    }

    render() {
        const { type, title, content } = this.props;
        return (
            <div className="home-page-cat">
                {type == 'image&name' && content && (
                    <div className="cat-item">
                        <h2 className="home-page-cat-title">{title}</h2>
                        <div className="home-page-cat-list-1">
                            {content.map((item) => (
                                <div key={item} className="home-page-cat-item-1">
                                    <Link to={`/sub-cat-page/${item.id}`}>
                                        <img className="home-page-cat-item-img-1" src={item.image} alt={item.name} />
                                        <span className="home-page-cat-item-title-1">{item.name}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {type == 'image' && content && (
                    <div className="cat-item">
                        <div className="home-page-cat-list-2">
                            {content.map((item) => (
                                <div key={item} className="home-page-cat-item-2">
                                    <Link to={`/main-cat-page/${item.id}`}>
                                        <img className="home-page-cat-item-img-2" src={item.image} alt={item.name} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {type == 'full' && content && (
                    <div className="cat-item">
                        {title && <h2 className="home-page-cat-title">{title}</h2>}
                        <div className="home-page-cat-list-3">
                            {content.map((item) => {
                                const discount = this.state.discountArr.find(
                                    (discountItem) => discountItem.id == item.discountId,
                                );
                                let fixprice;
                                if (discount) {
                                    fixprice = (item.price * (100 - discount.number)) / 100;
                                }
                                return (
                                    <div key={item.id} className="home-page-cat-item-3">
                                        <div className="home-page-cat-item-img-3">
                                            <Link to={`/product-page/${item.id}`}>
                                                <img src={item.image} alt={item.name} />
                                            </Link>
                                        </div>
                                        {discount && discount.name != 'không khuyến mãi' && (
                                            <div className="home-page-cat-item-discount-3">
                                                <span>{discount.name}</span>
                                            </div>
                                        )}
                                        {discount && discount.number > 0 && (
                                            <div className="home-page-cat-item-discount-value-3">
                                                <span>-{discount.number}%</span>
                                            </div>
                                        )}
                                        <div className="home-page-cat-item-name-3">
                                            <Link to={`/product-page/${item.id}`}>
                                                {item.name} {item.sku}
                                            </Link>
                                        </div>
                                        {discount && discount.number > 0 ? (
                                            <div className="home-page-cat-item-price-3">
                                                <span className="price">{this.formatCurrency(item.price)}</span>
                                                <span className="price-update">{this.formatCurrency(fixprice)}</span>
                                            </div>
                                        ) : (
                                            <div className="home-page-cat-item-price-3">
                                                <span className="price white">~</span>
                                                <span className="price-update">{this.formatCurrency(item.price)}</span>
                                            </div>
                                        )}
                                        {this.renderStars(this.getRandomRating())}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {type == 'introduce' && (
                    <div className="cat-item">
                        <h2 className="home-page-cat-title">{title}</h2>
                        <div className="home-page-cat-list-4">
                            {introductList.map((item) => (
                                <div key={item.id} className="home-page-cat-item-4">
                                    <div className="home-page-cat-item-index-4">
                                        <span>{item.id}</span>
                                    </div>
                                    <div className="home-page-cat-item-title-4">
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
