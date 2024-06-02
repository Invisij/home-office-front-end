import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import cartProductService from '../../services/cartProductService';
import productService from '../../services/productService';
import userService from '../../services/userService';
import allCodeService from '../../services/allCodeService';
import orderService from '../../services/orderService';
import orderProductService from '../../services/orderProductService';

import './PayPage.scss';

class PayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartId: this.props.match.params.id,
            userInfo: {},
            cartProductArr: [],
            productArr: [],
            total: 0,
            paymentArr: [],
            payment: '',
            description: '',
        };
    }

    async componentDidMount() {
        if (this.state.cartId) {
            await this.readCart();
            await Promise.all(this.state.cartProductArr.map((item) => this.readProduct(item.productId)));
        }
        this.loadUserDetails();
        this.loadAllCodePayment();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.cartId !== this.state.cartId) {
            await this.readCart();
            await Promise.all(this.state.cartProductArr.map((item) => this.readProduct(item.productId)));
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

    loadAllCodePayment = async () => {
        const response = await allCodeService.readAllCode('PAYMENT');
        if (response && response.errCode === 0) {
            const paymentArr = response.data;
            this.setState({
                paymentArr,
                payment: paymentArr[0].key,
            });
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
            this.calculateTotal();
        }
    };

    onChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState.userInfo[type] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    onChangeSelect = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleCreateOrder = async () => {
        const response = await orderService.createOrder({
            customerId: this.props.userInfo.id,
            amount: this.state.total,
            orderAddress: this.state.userInfo.billingAddress,
            orderStatus: 'Đã tiếp nhận',
            description: this.state.description,
        });

        if (response && response.errCode === 0 && response.data) {
            const orderId = response.data.id;
            try {
                for (const item of this.state.productArr) {
                    await this.addOrderProduct(item, orderId);
                }
                this.props.history.push('/');
                toast.success(`Thêm đơn hàng thành công`);
            } catch (error) {
                toast.warning(`Thêm đơn hàng thất bại`);
            }
        } else {
            toast.warning(`Thêm đơn hàng thất bại`);
        }
        await cartProductService.deleteCartProduct({ cartId: this.state.cartId });
    };

    addOrderProduct = async ({ id: productId, price, quantity }, orderId) => {
        const response = await orderProductService.createOrderProduct({
            orderId,
            productId,
            price,
            quantity,
        });
        if (response && response.errCode === 0) {
            toast.success(`Thêm sản phẩm thành công`);
        } else {
            toast.warning(`Thêm sản phẩm thất bại`);
        }
    };

    render() {
        const { productArr, total, userInfo, payment, paymentArr } = this.state;
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
                                        value={userInfo.lastName}
                                        onChange={(event) => this.onChangeInput(event, 'lastName')}
                                    />
                                </div>
                                <div className="col-3 mb-3">
                                    <label className="form-label">Tên</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Nhập tên..."
                                        value={userInfo.firstName}
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
                                        value={userInfo.email}
                                    />
                                </div>
                                <div className="col-12"></div>
                                <div className="col-8 mb-3">
                                    <label className="form-label">Điện thoại</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Nhập điện thoại..."
                                        value={userInfo.phoneNumber}
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
                                        value={userInfo.billingAddress}
                                        onChange={(event) => this.onChangeInput(event, 'billingAddress')}
                                    />
                                </div>
                                <div className="col-12"></div>
                                <div className="col-3 mb-3">
                                    <label className="form-label">Phương thức thanh toán</label>
                                    <select
                                        className="form-select"
                                        value={payment}
                                        onChange={(event) => this.onChangeSelect(event, 'payment')}
                                    >
                                        {paymentArr.map((item) => (
                                            <option key={item.key} value={item.key}>
                                                {item.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12"></div>
                                <div className="col-8 mb-3">
                                    <label className="form-label">Để lại lời nhắn cho chúng tôi</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Nhập mô tả..."
                                        onChange={(event) => this.onChangeSelect(event, 'description')}
                                        value={this.state.description}
                                    ></textarea>
                                </div>
                                <div className="col-12"></div>
                                <div className="col-3">
                                    <button className="btn btn-success" onClick={() => this.handleCreateOrder()}>
                                        Hoàn tất đặt hàng
                                    </button>
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
