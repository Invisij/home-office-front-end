import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import orderService from '../../services/orderService';
import orderProductService from '../../services/orderProductService';
import productService from '../../services/productService';

import './OrderPage.scss';

class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
            orderProductArr: [],
            productArr: [],
        };
    }

    async componentDidMount() {
        await this.readOrder();
        await this.readOrderProduct();
        await Promise.all(this.state.orderProductArr.map((item) => this.readProduct(item.productId)));
    }

    readOrder = async () => {
        const response = await orderService.readOrderById(this.props.match.params.id);
        if (response && response.errCode === 0) {
            this.setState({
                order: response.data[0],
            });
        }
    };

    readOrderProduct = async () => {
        const response = await orderProductService.readOrderProduct(this.props.match.params.id);
        if (response && response.errCode === 0) {
            this.setState({
                orderProductArr: response.data,
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
                const orderProduct = this.state.orderProductArr.find((orderItem) => orderItem.productId === item.id);
                if (orderProduct) {
                    item.savePrice = item.price - orderProduct.price;
                    item.price = orderProduct.price;
                    item.quantity = orderProduct.quantity;
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

    formatCurrency(number) {
        const numStr = Number(number).toString();
        const numArr = numStr.split('');
        numArr.reverse();
        for (let i = 3; i < numArr.length; i += 4) {
            numArr.splice(i, 0, ',');
        }
        return numArr.reverse().join('');
    }

    handleBack = () => {
        this.props.history.push('/');
    };

    render() {
        const { order, productArr } = this.state;
        return (
            <div className="order-page-container container mt-5">
                <h2 className="mt-3">ORDER #{this.props.match.params.id}</h2>
                <div className="order-detail">
                    <h4 className="mt-5 mb-3">Thông tin đơn hàng</h4>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Địa chỉ giao hàng</th>
                                <th scope="col">Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{order.orderAddress}</td>
                                <td>{order.orderStatus}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4 className="mt-5 mb-3">Thông tin sản phẩm</h4>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Giảm giá</th>
                                <th scope="col">Tổng giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productArr.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{this.formatCurrency(item.price)} vnđ</td>
                                    <td>{item.quantity}</td>
                                    {item.savePrice !== 0 ? (
                                        <td>{this.formatCurrency(item.savePrice)} vnđ</td>
                                    ) : (
                                        <td></td>
                                    )}
                                    <td>{this.formatCurrency((item.price - item.savePrice) * item.quantity)} vnđ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="sum">Tổng: {this.formatCurrency(order.amount)} vnđ</div>
                </div>
                <button className="btn btn-secondary mt-5" onClick={() => this.handleBack()}>
                    Quay lại
                </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
