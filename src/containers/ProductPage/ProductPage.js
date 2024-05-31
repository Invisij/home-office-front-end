import React, { Component } from 'react';
import { connect } from 'react-redux';

import productService from '../../services/productService';
import discountService from '../../services/discountService';
import HomePageCat from '../../components/Sections/HomePageCat';

import './ProductPage.scss';

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            discount: {},
            fixPrice: null,
            savePrice: null,
            productArr: [],
        };
    }

    async componentDidMount() {
        await this.readProduct();
        await this.readDiscount(this.state.product.discountId);
        this.readProductBySubCatId(this.state.product.subCatId);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({ productArr: [] });
            await this.readProduct();
            await this.readDiscount(this.state.product.discountId);
            this.readProductBySubCatId(this.state.product.subCatId);
        }
    }

    readProduct = async () => {
        const productId = this.props.match.params.id;
        const response = await productService.readProductById(productId);
        if (response && response.errCode === 0) {
            await response.data.forEach((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
            });
            this.setState({
                product: response.data[0],
            });
        }
    };

    readProductBySubCatId = async (subCatId) => {
        const response = await productService.readProductBySubCatId(subCatId);
        if (response && response.errCode === 0) {
            const products = response.data.map((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
                return item;
            });
            this.setState((prevState) => ({
                productArr: [...prevState.productArr, ...products],
            }));
        }
    };

    readDiscount = async (discountId) => {
        const response = await discountService.readDiscountById(discountId);
        console.log(response);
        if (response && response.errCode === 0) {
            const discount = response.data[0];
            const { product } = this.state;
            let fixPrice, savePrice;
            if (discount.number > 0) {
                fixPrice = (product.price * (100 - discount.number)) / 100;
                savePrice = product.price * discount.number;
            }
            this.setState((prevState) => ({
                discount: discount,
                fixPrice,
                savePrice,
            }));
        }
    };

    formatCurrency(number) {
        const numStr = Number(number).toString();
        const numArr = numStr.split('');
        numArr.reverse();
        for (let i = 3; i < numArr.length; i += 4) {
            numArr.splice(i, 0, ',');
        }
        return numArr.reverse();
    }

    render() {
        const { product, discount, fixPrice, savePrice } = this.state;
        return (
            <div className="product-page container">
                <div className="product-detail">
                    <div className="product-image">
                        <img src={product.image} />
                        {discount && discount.name != 'không khuyến mãi' && (
                            <div className="discount">
                                <span>{discount.name}</span>
                            </div>
                        )}
                        {discount && discount.name && discount.number > 0 && (
                            <div className="discount-value">
                                <span>-{discount.number}%</span>
                            </div>
                        )}
                    </div>
                    <div className="product-content">
                        <div className="product-name">
                            <h1>{product.name}</h1>
                        </div>
                        <div className="product-block">
                            {fixPrice ? (
                                <div className="product-price block-item">
                                    <div className="price-item">
                                        <span>Giá cũ:</span>
                                        <span className="text-decoration">
                                            {this.formatCurrency(product.price)} vnđ
                                        </span>
                                    </div>
                                    <div className="price-item">
                                        <h1>{this.formatCurrency(fixPrice)}</h1>
                                        <span>vnđ</span>
                                    </div>
                                    <span className="price-item red">
                                        <span>Tiết kiệm:</span>
                                        <span>{savePrice}</span>
                                        <span>vnđ</span>
                                        <span>{`(${discount.number}%)`}</span>
                                    </span>
                                </div>
                            ) : (
                                <div className="product-price block-item">
                                    <div className="price-item">
                                        <h1>{this.formatCurrency(product.price)}</h1>
                                        <span>vnđ</span>
                                    </div>
                                </div>
                            )}
                            <div className="product-sku block-item">
                                <span className="label">Mã sản phẩm:</span>
                                <span>{product.sku}</span>
                            </div>
                            <div className="product-status block-item">
                                <span className="label">Tình trạng:</span>
                                <span className="status">{product.status}</span>
                            </div>
                            <div className="product-quantity-order block-item">
                                <span className="label">Số lượng:</span>
                                <span>1</span>
                            </div>
                            <div className="product-slogan">
                                <span>ĐẶT HÀNG ONLINE - GIAO HÀNG NHANH HƠN</span>
                            </div>
                            <div className="product-action mt-3">
                                <div className="action-box">
                                    <button className="action-btn btn btn-primary green">Thêm vào giỏ</button>
                                    <button className="action-btn btn btn-warning orange">mua ngay</button>
                                </div>
                            </div>
                        </div>
                        <div className="product-policy">
                            <ul>
                                <li>
                                    Giao hàng & lắp đặt MIỄN PHÍ các quận HCM & Cần Thơ với đơn hàng &gt; 1 triệu, gồm:
                                    <p>
                                        HCM: Q.1, Q.3, Q.4, Q.5, Q.6, Q.8, Q.10, Q.Tân Bình, Q.Bình Tân, Q.Tân Phú,
                                        Q.Phú Nhuận, Q.Gò Vấp, Q.Bình Thạnh.
                                    </p>
                                </li>
                                <li>Giao hàng tiêu chuẩn dự kiến 1-7 ngày</li>
                                <li>Các quận ngoại thành và tỉnh khác sẽ có phí thỏa thuận từ 50-200k</li>
                                <li>Giá chưa bao gồm 10% VAT(HOMEOFFICE xuất hóa đơn điện tử)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="product-tabs container">
                    <HomePageCat type="full" title="Sản phẩm liên quan" content={this.state.productArr} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
