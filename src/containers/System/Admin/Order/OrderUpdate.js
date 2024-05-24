import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import orderService from '../../../../services/orderService';
import subCatService from '../../../../services/subCatService';
import discountService from '../../../../services/discountService';
import { CommonUtils } from '../../../../utils';

import './OrderUpdate.scss';

class OrderUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subCatArr: [],
            discountArr: [],
            previewImgURL: '',
            subCatId: '',
            discountId: '',
            name: '',
            price: '',
            sku: '',
            image: '',
            status: '',
            quantity: '',
            description: '',
        };
    }

    componentDidMount() {
        this.fetchSubCats();
        this.fetchDiscounts();
        this.loadOrderDetails();
    }

    fetchSubCats = async () => {
        const response = await subCatService.readSubCat('name');
        if (response && response.errCode === 0) {
            this.setState({
                subCatArr: response.data,
                subCatId: response.data[0].id,
            });
        }
    };

    fetchDiscounts = async () => {
        const response = await discountService.readDiscount();
        if (response && response.errCode === 0) {
            this.setState({
                discountArr: response.data,
                discountId: response.data[0].id,
            });
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {}

    loadOrderDetails = async () => {
        const orderId = this.props.match.params.id;
        if (orderId) {
            const response = await orderService.readOrderById(orderId);
            if (response && response.errCode === 0) {
                response.data.forEach((item) => {
                    if (item.image) {
                        item.image = Buffer.from(item.image, 'base64').toString('binary');
                    }
                });
                const order = response.data[0];
                this.setState({
                    id: order.id,
                    subCatId: order.subCatId,
                    discountId: order.discountId,
                    name: order.name,
                    price: order.price,
                    sku: order.sku,
                    image: order.image,
                    status: order.status,
                    quantity: order.quantity,
                    description: order.description,
                });
            } else {
                toast.warning('Không tìm thấy đơn hàng');
                this.props.history.push('/system/order-manage');
            }
        }
    };

    onChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState,
        });
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
    handleUpdateOrder = async () => {
        const response = await orderService.updateOrder({
            id: this.state.id,
            subCatId: this.state.subCatId,
            discountId: this.state.discountId,
            name: this.state.name,
            price: this.state.price,
            sku: this.state.sku,
            image: this.state.image,
            status: this.state.status,
            quantity: this.state.quantity,
            description: this.state.description,
        });
        this.props.history.push('/system/order-manage');
        if (response && response.errCode === 0) {
            toast.success(`Sửa đơn hàng "${this.state.name}" thành công`);
        } else {
            toast.warning(`Sửa đơn hàng "${this.state.name}" thất bại`);
        }
    };

    handleBack = () => {
        this.props.history.push('/system/order-manage');
    };

    render() {
        return (
            <div className="order-update-container">
                <div className="title">Sửa đơn hàng</div>
                <div className="order-update-body mt-5">
                    <div className="container">
                        <div className="mb-3 btn-back" onClick={() => this.handleBack()}>
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                            <span className="ms-3">Quay lại</span>
                        </div>
                        <div className="row">
                            <div className="col-3 mb-3">
                                <label className="form-label">Tên đơn hàng</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập tên đơn hàng..."
                                    onChange={(event) => this.onChangeInput(event, 'name')}
                                    value={this.state.name}
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <label className="form-label">Danh mục phụ</label>
                                <select
                                    className="form-select"
                                    value={this.state.subCatId}
                                    onChange={(event) => this.onChangeInput(event, 'subCatId')}
                                >
                                    {this.state.subCatArr.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-2 mb-3">
                                <label className="form-label">Khuyến mãi</label>
                                <select
                                    className="form-select"
                                    value={this.state.discountId}
                                    onChange={(event) => this.onChangeInput(event, 'discountId')}
                                >
                                    {this.state.discountArr.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Thương hiệu</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập tên thương hiệu..."
                                    onChange={(event) => this.onChangeInput(event, 'sku')}
                                    value={this.state.sku}
                                />
                            </div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Giá</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập giá..."
                                    onChange={(event) => this.onChangeInput(event, 'price')}
                                    value={this.state.price}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Trạng thái</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập trạng thái..."
                                    onChange={(event) => this.onChangeInput(event, 'status')}
                                    value={this.state.status}
                                />
                            </div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Số lượng</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập số lượng..."
                                    onChange={(event) => this.onChangeInput(event, 'quantity')}
                                    value={this.state.quantity}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-4 mb-3">
                                <label className="form-label">Ảnh</label>
                                <div className="mb-3 img-preview">
                                    <img src={this.state.previewImgURL || this.state.image} alt="Ảnh đơn hàng" />
                                </div>
                                <input
                                    className="form-control"
                                    type="file"
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-6 mb-3">
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
                            <div className="col-1">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-3"
                                    onClick={() => this.handleUpdateOrder()}
                                >
                                    Sửa
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdate);
