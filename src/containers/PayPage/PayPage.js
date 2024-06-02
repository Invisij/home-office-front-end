import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import cartProductService from '../../services/cartProductService';
import productService from '../../services/productService';
import userService from '../../services/userService';

import './PayPage.scss';

class PayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartId: this.props.match.params.id,
            userId: null,
            userInfo: {},
            cartProductArr: [],
            productArr: [],
            total: 0,
        };
    }

    async componentDidMount() {
        if (this.state.cartId) {
            await this.readCart();
            this.state.cartProductArr.forEach((item) => {
                this.readProduct(item.productId);
            });
        }
        this.loadUserDetails();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.cartId !== this.state.cartId) {
            await this.readCart();
            this.state.cartProductArr.forEach((item) => {
                this.readProduct(item.productId);
            });
        }
        if (prevProps.userInfo !== this.props.userInfo) {
            if (this.props.userInfo && prevProps.userInfo.id !== this.props.userInfo.id) {
                this.setState({
                    userId: this.props.userInfo.id,
                });
            }
        }
    }

    loadUserDetails = async () => {
        const userId = this.props.match.params.id;
        if (userId) {
            const response = await userService.readUserById(userId);
            if (response && response.errCode === 0) {
                const user = response.data[0];
                this.setState({
                    userInfo: user,
                });
            } else {
                toast.warning('Không tìm thấy người dùng');
                this.props.history.push('/login');
            }
        }
    };

    readCart = async () => {
        const { cartId } = this.state;
        const response = await cartProductService.readCartProduct(cartId);
        if (response && response.errCode === 0) {
            this.setState({
                cartProductArr: response.data,
            });
        }
    };

    readProduct = async (productId) => {
        const response = await productService.readProductById(productId);
        if (response && response.errCode === 0) {
            response.data.forEach((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
                const cartProduct = this.state.cartProductArr.find((cartItem) => cartItem.productId === item.id);
                if (cartProduct) {
                    item.price = cartProduct.price;
                    item.quantity = cartProduct.quantity;
                }
            });
            this.setState(
                (prevState) => ({
                    productArr: [...prevState.productArr, ...response.data],
                }),
                this.calculateTotal,
            );
        }
    };

    calculateTotal = () => {
        const { productArr } = this.state;
        const total = productArr.reduce((acc, product) => acc + product.price * product.quantity, 0);
        this.setState({ total });
    };

    formatCurrency(number) {
        const numStr = Number(number).toString();
        const numArr = numStr.split('');
        numArr.reverse();
        for (let i = 3; i < numArr.length; i += 4) {
            numArr.splice(i, 0, ',');
        }
        return numArr.reverse().join('');
    }

    handleDeleteCartProduct = async (productId, productName) => {
        const response = await cartProductService.deleteCartProduct({ productId });
        if (response && response.errCode === 0) {
            this.setState((prevState) => ({
                productArr: prevState.productArr.filter((product) => product.id !== productId),
                cartProductArr: prevState.cartProductArr.filter((cartProduct) => cartProduct.productId !== productId),
            }));
        }
    };

    render() {
        const { productArr, total, userInfo } = this.state;
        console.log(this.state);
        return (
            <div className="pay-page-container container">
                <div className="pay-content">
                    <div className="main-content me-5">
                        <div className="main-title">
                            <span className="me-3">Thông tin thanh toán</span>
                            <FontAwesomeIcon icon={faLock} className="icon" />
                        </div>
                        <div className="main-box">
                            <div className="box-title"></div>
                            <div className="row">
                                <div className="col-5 mb-3">
                                    <label className="form-label">Họ và tên đệm</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Nhập họ..."
                                        value={this.state.lastName}
                                        onChange={(event) => this.onChangeInput(event, 'lastName')}
                                    />
                                </div>
                                <div className="col-3 mb-3">
                                    <label className="form-label">Tên</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Nhập tên..."
                                        value={this.state.firstName}
                                        onChange={(event) => this.onChangeInput(event, 'firstName')}
                                    />
                                </div>
                                <div className="col-12"></div>
                                <div className="col-8 mb-3 ">
                                    <label className="form-label">Email</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="Nhập email..."
                                        onChange={(event) => this.onChangeInput(event, 'email')}
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="col-12"></div>
                                <div className="col-8 mb-3">
                                    <label className="form-label">Điện thoại</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Nhập điện thoại..."
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-12"></div>
                                <div className="col-8 mb-3">
                                    <label className="form-label">Địa chỉ giao hàng</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Nhập địa chỉ..."
                                        value={this.state.billingAddress}
                                        onChange={(event) => this.onChangeInput(event, 'billingAddress')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="side-content">
                        <div className="side-item">
                            <div className="side-title">thông tin đặt hàng</div>
                            <div className="side-content">
                                <div className="side-text">
                                    <span>Số lượng</span>
                                    <span>{productArr.length} sản phẩm</span>
                                </div>
                                <div className="side-text">
                                    <span>Tổng hóa đơn</span>
                                    <span>{this.formatCurrency(total)} vnđ</span>
                                </div>
                            </div>
                        </div>
                        <div className="side-item">
                            <div className="side-title">sản phẩm trong đơn hàng</div>
                            <ul className="cart-content-list">
                                {productArr.map((product) => (
                                    <li key={product.id} className="item">
                                        <div className="item-desc">
                                            <Link to={`/product-page/${product.id}`} className="link">
                                                {product.name}
                                            </Link>
                                            <p className="text">
                                                <span>{product.quantity}&nbsp;</span>
                                                <span>x&nbsp;</span>
                                                <span>{this.formatCurrency(product.price)}&nbsp;</span>
                                                <span>vnđ</span>
                                            </p>
                                        </div>
                                        <span
                                            className="delete-product"
                                            onClick={() => this.handleDeleteCartProduct(product.id)}
                                        >
                                            x
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PayPage);
