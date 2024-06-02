import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import orderService from '../../services/orderService';

import './OrderSearch.scss';

class OrderSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderArr: [],
        };
    }

    componentDidMount() {
        this.readOrder();
    }

    readOrder = async () => {
        const response = await orderService.readOrder(this.props.match.params.id);
        if (response && response.errCode === 0) {
            this.setState({
                orderArr: response.data,
            });
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

    formatDate = (dateString) => {
        const date = new Date(dateString);
        const isoString = date.toISOString().split('.')[0];
        return isoString.replace('T', ' - ');
    };

    render() {
        console.log(this.state.orderArr);
        return (
            <div className="order-search-container container mt-5">
                <h1 className="mb-3">ĐƠN HÀNG</h1>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tình trạng</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Ngày</th>
                            <th scope="col">Tổng cộng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orderArr.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">
                                        <Link to={`/order/order-page/${order.id}`}>#{index + 1}</Link>
                                    </th>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.orderAddress}</td>
                                    <td>{this.formatDate(order.createdAt)}</td>
                                    <td>{this.formatCurrency(order.amount)} vnđ</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderSearch);
