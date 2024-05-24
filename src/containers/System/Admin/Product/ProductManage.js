import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

import productService from '../../../../services/productService';

import './ProductManage.scss';

class ProductManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productArr: [],
        };
    }

    componentDidMount() {
        this.readProduct();
    }

    readProduct = async () => {
        const response = await productService.readProduct();
        if (response && response.errCode === 0) {
            response.data.forEach((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
            });
            this.setState({
                productArr: response.data,
            });
        }
    };

    handleName = async (event) => {
        const response = await productService.readProduct(event.target.value);
        if (response && response.errCode === 0) {
            response.data.forEach((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
            });
            this.setState({
                productArr: response.data,
            });
        }
    };

    handleCreateProduct = () => {
        this.props.history.push('/system/product-create');
    };

    handleUpdateProduct = (product) => {
        this.props.history.push({
            pathname: `/system/product-update/${product.id}`,
        });
    };

    handleDeleteProduct = async (product) => {
        const response = await productService.deleteProduct(product.id);
        if (response && response.errCode === 0) {
            this.readProduct();
            toast.success(`Xóa sản phẩm "${product.name}" thành công`);
        } else {
            toast.warning(`Xóa sản phẩm "${product.name}" thất bại`);
        }
    };

    render() {
        return (
            <div className="product-manage-container container mt-5">
                <div className="title text-center mb-5">Quản lý sản phẩm</div>
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
                                    placeholder="Tên sản phẩm..."
                                    onChange={(event) => this.handleName(event)}
                                />
                                <label htmlFor="name">Tên sản phẩm</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-7"></div>
                    <div className="col-3 text-right text mt-1">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg button-text"
                            onClick={() => this.handleCreateProduct()}
                        >
                            Tạo sản phẩm mới
                        </button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Loại sản phẩm</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.productArr.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.name}</td>
                                    <td>{product.subCatId}</td>
                                    <td>{product.price}</td>
                                    <td>{product.status}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.image && <img src={product.image} alt="Ảnh sản phẩm" />}</td>
                                    <td>
                                        <div onClick={() => this.handleUpdateProduct(product)} className="icon-action">
                                            <FontAwesomeIcon className="icon-edit" icon={faPenToSquare} />
                                        </div>
                                        <div onClick={() => this.handleDeleteProduct(product)} className="icon-action">
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
