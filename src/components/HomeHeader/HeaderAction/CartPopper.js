import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import cartService from '../../../services/cartService';
import cartProductService from '../../../services/cartProductService';
import productService from '../../../services/productService';

import 'tippy.js/dist/tippy.css';
import './CartPopper.scss';

class CartPopper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartProductArr: [],
            productArr: [],
        };
        this.intervalId = null;
    }

    async componentDidMount() {
        const { userInfo, isLoggedIn } = this.props;
        if (userInfo && userInfo.id) {
            await this.readCart();
            this.state.cartProductArr.forEach((item) => {
                this.readProduct(item.productId);
            });
            this.intervalId = setInterval(this.refreshCartData, 5000);
        }
    }

    async componentDidUpdate(prevProps) {
        const { userInfo, isLoggedIn } = this.props;

        if (
            (userInfo && userInfo.id) !== (prevProps.userInfo && prevProps.userInfo.id) ||
            isLoggedIn !== prevProps.isLoggedIn
        ) {
            await this.readCart();
            this.state.cartProductArr.forEach((item) => {
                this.readProduct(item.productId);
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    refreshCartData = async () => {
        this.setState({ productArr: [] });
        await this.readCart();
        this.state.cartProductArr.forEach((item) => {
            this.readProduct(item.productId);
        });
    };

    readCart = async () => {
        const { userInfo } = this.props;
        if (userInfo && userInfo.id) {
            const response = await cartService.readCart(userInfo.id);
            if (response && response.errCode === 0) {
                const cart = response.data[0];
                const responseProductArr = await cartProductService.readCartProduct(cart.id);
                if (responseProductArr && responseProductArr.errCode === 0) {
                    this.setState({
                        cartProductArr: responseProductArr.data,
                    });
                }
            }
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
            this.setState((prevState) => ({
                productArr: [...prevState.productArr, ...response.data],
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
        return numArr.reverse().join('');
    }

    handleDeleteCartProduct = async (productId) => {
        const response = await cartProductService.deleteCartProduct({ productId });
        if (response && response.errCode === 0) {
            this.setState((prevState) => ({
                productArr: prevState.productArr.filter((product) => product.id !== productId),
                cartProductArr: prevState.cartProductArr.filter((cartProduct) => cartProduct.productId !== productId),
            }));
        }
    };

    handleViewCart = () => {
        this.props.history.push({
            pathname: `/cart/${this.props.userInfo.id}`,
        });
    };

    handleCheckout = () => {
        this.props.history.push({
            pathname: `/pay/${this.props.userInfo.id}`,
        });
    };

    render() {
        const { isLoggedIn } = this.props;
        const { productArr } = this.state;
        return (
            <div className="cart-popper-wrapper">
                {isLoggedIn && productArr.length > 0 ? (
                    <div className="cart-popper-content">
                        <ul className="cart-content-list">
                            {productArr.map((product) => (
                                <li key={product.id} className="item">
                                    <div className="item-image">
                                        <img src={product.image} alt={product.name} />
                                    </div>
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
                        <div className="cart-popper-action">
                            <button className="btn btn-outline-primary" onClick={this.handleViewCart}>
                                Xem giỏ hàng
                            </button>
                            <button className="btn btn-outline-success" onClick={this.handleCheckout}>
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="cart-popper-content">
                        <span className="content-empty">Giỏ hàng trống</span>
                    </div>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartPopper));
