import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

import orderService from '../../../../services/orderService';
import userService from '../../../../services/userService';
import allCodeService from '../../../../services/allCodeService';
import productService from '../../../../services/productService';
import orderProductService from '../../../../services/orderProductService';
import { CommonUtils } from '../../../../utils';

import './OrderCreate.scss';

class OrderCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerArr: [],
            statusArr: [],
            customerId: '',
            amount: '',
            orderAddress: '',
            orderStatus: '',
            description: '',
            productArr: [{ orderId: '', productId: '', price: '', quantity: '' }],
        };
    }

    componentDidMount() {
        this.fetchCustomers();
        this.fetchStatuss();
    }

    fetchCustomers = async () => {
        const response = await userService.readUser();
        if (response && response.errCode === 0) {
            this.setState({
                customerArr: response.data,
                customerId: response.data[0].id,
                orderAddress: response.data[0].billingAddress,
            });
        }
    };

    fetchStatuss = async () => {
        const response = await allCodeService.readAllCode('status');
        if (response && response.errCode === 0) {
            this.setState({
                statusArr: response.data,
                orderStatus: response.data[0].value,
            });
        }
    };

    handleBack = () => {
        this.props.history.push('/system/order-manage');
    };

    onChangeInput = (event, type, index = null) => {
        let copyState = { ...this.state };
        if (type.includes('productArr')) {
            const [field, index, key] = type.split('-');
            copyState.productArr[index][key] = event.target.value;
            if (key === 'productId') {
                this.fetchProductPrice(event.target.value, index);
                return;
            }
        } else {
            copyState[type] = event.target.value;
            this.setState({
                ...copyState,
            });
            if (type === 'customerId') {
                this.updateOrderAddress(event.target.value);
                return;
            }
        }
        this.setState({
            ...copyState,
            amount: this.state.productArr.length,
        });
    };

    fetchProductPrice = async (productId, index) => {
        const response = await productService.readProductById(productId);
        let copyState = { ...this.state };
        if (response && response.data.length > 0 && response.errCode === 0) {
            copyState.productArr[index].price = response.data[0].price;
        } else {
            copyState.productArr[index].price = 0;
        }
        this.setState({
            ...copyState,
        });
    };

    updateOrderAddress = (customerId) => {
        const selectedCustomer = this.state.customerArr.find((customer) => customer.id == customerId);
        if (selectedCustomer) {
            this.setState({
                orderAddress: selectedCustomer.billingAddress,
            });
        }
    };

    handleOnChangeImage = async (event) => {
        const data = event.target.files;
        const file = data[0];
        if (file) {
            const base64 = await CommonUtils.getBase64(file);
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: base64,
            });
        }
    };

    handleAddProduct = async () => {
        let copyState = { ...this.state };
        copyState.productArr.push({ orderId: '', productId: '', price: '', quantity: '' });
        this.setState({
            ...copyState,
            amount: copyState.productArr.length,
        });
    };

    handleRemoveProduct = async (index) => {
        let copyState = { ...this.state };
        copyState.productArr.splice(index, 1);
        this.setState({
            ...copyState,
            amount: copyState.productArr.length,
        });
    };

    handleAddOrder = async () => {
        const response = await orderService.createOrder({
            customerId: this.state.customerId,
            amount: this.state.amount,
            orderAddress: this.state.orderAddress,
            orderStatus: this.state.orderStatus,
            description: this.state.description,
        });
        if (response && response.data) {
            this.state.productArr.forEach(async (item) => {
                await this.addOrderProduct(item, response.data.id);
            });
        }
        this.props.history.push('/system/order-manage');
        if (response && response.errCode === 0) {
            toast.success(`Thêm đơn hàng thành công`);
        } else {
            toast.warning(`Thêm đơn hàng thất bại`);
        }
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
        return (
            <div className="order-create-container">
                <div className="title">Tạo đơn hàng</div>
                <div className="order-create-body mt-5">
                    <div className="container">
                        <div className="mb-3 btn-back" onClick={() => this.handleBack()}>
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                            <span className="ms-3">Quay lại</span>
                        </div>
                        <div className="row">
                            <div className="col-2 mb-3">
                                <label className="form-label">khách hàng</label>
                                <select
                                    className="form-select"
                                    value={this.state.customerId}
                                    onChange={(event) => this.onChangeInput(event, 'customerId')}
                                >
                                    {this.state.customerArr.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.lastName} {item.firstName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-2 mb-3">
                                <label className="form-label">Trạng thái</label>
                                <select
                                    className="form-select"
                                    value={this.state.orderStatus}
                                    onChange={(event) => this.onChangeInput(event, 'orderStatus')}
                                >
                                    {this.state.statusArr.map((item) => (
                                        <option key={item.id} value={item.value}>
                                            {item.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Địa chỉ giao hàng</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập địa chỉ giao hàng..."
                                    onChange={(event) => this.onChangeInput(event, 'orderAddress')}
                                    value={this.state.orderAddress}
                                />
                            </div>
                            <div className="col-1 mb-3">
                                <label className="form-label">Số lượng</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="1"
                                    value={this.state.amount}
                                    disabled
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-6 mb-3">
                                <label className="form-label">Thêm sản phẩm: </label>
                                <button className="btn btn-success me-3 ms-3" onClick={() => this.handleAddProduct()}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <div className="col-12"></div>
                            {this.state.productArr.map((item, index) => {
                                return (
                                    <div key={item.id} className="row">
                                        <div className="col-2 mb-3">
                                            <label className="form-label">Mã sản phẩm</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Nhập mã sản phẩm"
                                                onChange={(event) =>
                                                    this.onChangeInput(event, `productArr-${index}-productId`)
                                                }
                                                value={item.productId}
                                            />
                                        </div>
                                        <div className="col-2 mb-3">
                                            <label className="form-label">nhập số lượng</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Nhập số lượng"
                                                onChange={(event) =>
                                                    this.onChangeInput(event, `productArr-${index}-quantity`)
                                                }
                                                value={item.quantity}
                                            />
                                        </div>
                                        <div className="col-2 mb-3">
                                            <label className="form-label">Giá</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="0"
                                                value={item.price}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-1">
                                            <button
                                                className="btn btn-danger mt-4"
                                                onClick={() => this.handleRemoveProduct(index)}
                                            >
                                                <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </div>
                                        <div className="col-12"></div>
                                    </div>
                                );
                            })}
                            <div className="col-6 mb-3 mt-5">
                                <label className="form-label">Mô tả</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Nhập mô tả..."
                                    onChange={(event) => this.onChangeInput(event, 'description')}
                                    value={this.state.description}
                                ></textarea>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-3"
                                    onClick={() => this.handleAddOrder()}
                                >
                                    Thêm đơn hàng
                                </button>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreate);
