import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import cartProductService from '../../services/cartProductService';
import productService from '../../services/productService';

import './CartPage.scss';

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartId: this.props.match.params.id,
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
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.cartId !== this.state.cartId) {
            await this.readCart();
            this.state.cartProductArr.forEach((item) => {
                this.readProduct(item.productId);
            });
        }
    }

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
            toast.success(`Xóa "${productName}" thành công`);

            this.setState((prevState) => ({
                productArr: prevState.productArr.filter((product) => product.id !== productId),
                cartProductArr: prevState.cartProductArr.filter((cartProduct) => cartProduct.productId !== productId),
            }));
        } else {
            toast.warning(`Xóa "${productName}" thất bại`);
        }
    };

    handleBack = () => {
        this.props.history.push({
            pathname: `/`,
        });
    };

    handleDeleteCart = async () => {
        const cartId = this.props.match.params.id;
        await cartProductService.deleteCartProduct({ cartId });
        this.handleBack();
    };

    handleCreateOrder = async () => {
        this.props.history.push({
            pathname: `/pay/${this.state.cartId}`,
        });
    };

    render() {
        const { productArr, total } = this.state;
        return (
            <div className="cart-page-container container mb-5">
                <div className="cart-title mb-3">
                    <h1>GIỎ HÀNG</h1>
                </div>
                <table className="cart-table table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col"></th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Tổng cộng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productArr &&
                            productArr.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.image && <img src={product.image} alt="Ảnh sản phẩm" />}</td>
                                        <td>
                                            {product.name}{' '}
                                            <span
                                                className="delete-product"
                                                onClick={() => this.handleDeleteCartProduct(product.id, product.name)}
                                            >
                                                x
                                            </span>
                                        </td>
                                        <td className="red">{this.formatCurrency(product.price)}</td>
                                        <td>{product.quantity}</td>
                                        <td>{this.formatCurrency(product.quantity * product.price)} vnđ</td>
                                    </tr>
                                );
                            })}
                        <tr>
                            <td colSpan={3}></td>
                            <td>Tổng chi phí</td>
                            <td className="red">{this.formatCurrency(total)} vnđ</td>
                        </tr>
                    </tbody>
                </table>
                <div className="cart-action mt-3 mb-5">
                    <div className="back">
                        <button className="btn btn-secondary" onClick={() => this.handleBack()}>
                            tiếp tục mua sắm
                        </button>
                    </div>
                    <div className="service">
                        <button className="btn btn-danger" onClick={() => this.handleDeleteCart()}>
                            Xóa giỏ hàng
                        </button>
                        {/* <button className="btn btn-primary">Cập nhật thay đổi</button> */}
                        <button className="btn btn-success" onClick={() => this.handleCreateOrder()}>
                            Đặt hàng
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
