import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

import orderService from '../../../../services/orderService';

import './OrderManage.scss';

class OrderManage extends Component {
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
        const response = await orderService.readOrder();
        if (response && response.errCode === 0) {
            this.setState({
                orderArr: response.data,
            });
        }
    };

    handleName = async (event) => {
        const response = await orderService.readOrder(event.target.value);
        if (response && response.errCode === 0) {
            this.setState({
                orderArr: response.data,
            });
        }
    };

    handleCreateOrder = () => {
        this.props.history.push('/system/order-create');
    };

    handleUpdateOrder = (order) => {
        this.props.history.push({
            pathname: `/system/order-update/${order.id}`,
        });
    };

    handleDeleteOrder = async (order) => {
        const response = await orderService.deleteOrder(order.id);
        if (response && response.errCode === 0) {
            this.readOrder();
            toast.success(`Xóa đơn hàng mã "${order.id}" thành công`);
        } else {
            toast.warning(`Xóa đơn hàng mã "${order.id}" thất bại`);
        }
    };

    render() {
        return (
            <div className="order-manage-container container mt-5">
                <div className="title text-center mb-5">Quản lý đơn hàng</div>
                <div className="row">
                    <div className="col-2">
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control input-name"
                                    name="name"
                                    placeholder="Tên đơn hàng..."
                                    onChange={(event) => this.handleName(event)}
                                />
                                <label htmlFor="name">Tên đơn hàng</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-7"></div>
                    <div className="col-3 text-right text mt-1">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg button-text"
                            onClick={() => this.handleCreateOrder()}
                        >
                            Tạo đơn hàng mới
                        </button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Mã khách hàng</th>
                            <th scope="col">Số sản phẩm</th>
                            <th scope="col">Địa chỉ giao hàng</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orderArr.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{order.id}</th>
                                    <td>{order.customerId}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.orderAddress}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>
                                        <div onClick={() => this.handleUpdateOrder(order)} className="icon-action">
                                            <FontAwesomeIcon className="icon-edit" icon={faPenToSquare} />
                                        </div>
                                        <div onClick={() => this.handleDeleteOrder(order)} className="icon-action">
                                            <FontAwesomeIcon className="icon-delete" icon={faTrashCan} />
                                        </div>
                                    </td>
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderManage);
