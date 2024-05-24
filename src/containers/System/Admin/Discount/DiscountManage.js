import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

import discountService from '../../../../services/discountService';

import './DiscountManage.scss';

class DiscountManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discountArr: [],
        };
    }

    componentDidMount() {
        this.readDiscount();
    }

    readDiscount = async () => {
        const response = await discountService.readDiscount();
        if (response && response.errCode === 0) {
            this.setState({
                discountArr: response.data,
            });
        }
    };

    handleName = async (event) => {
        const response = await discountService.readDiscount(event.target.value);
        if (response && response.errCode === 0) {
            this.setState({
                discountArr: response.data,
            });
        }
    };

    handleCreateDiscount = () => {
        this.props.history.push('/system/discount-create');
    };

    handleUpdateDiscount = (discount) => {
        this.props.history.push({
            pathname: `/system/discount-update/${discount.id}`,
        });
    };

    handleDeleteDiscount = async (discount) => {
        const response = await discountService.deleteDiscount(discount.id);
        if (response && response.errCode === 0) {
            this.readDiscount();
            toast.success('Xóa khuyến mãi thành công');
        } else {
            toast.warning('Xóa khuyến mãi thất bại');
        }
    };

    render() {
        return (
            <div className="discount-container container mt-5">
                <div className="title text-center mb-5">Quản lý khuyến mãi</div>
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
                                    name="firstName"
                                    placeholder="Tên khuyến mãi..."
                                    onChange={(event) => this.handleName(event)}
                                />
                                <label htmlFor="firstName">Tên khuyến mãi</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-7"></div>
                    <div className="col-3 text-right text mt-1">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg button-text"
                            onClick={() => this.handleCreateDiscount()}
                        >
                            Tạo khuyến mãi mới
                        </button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">phần trăm</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.discountArr.map((discount, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{discount.name}</td>
                                    <td>{discount.number}</td>
                                    <td className="description">{discount.description}</td>
                                    <td>
                                        <div
                                            onClick={() => this.handleUpdateDiscount(discount)}
                                            className="icon-action"
                                        >
                                            <FontAwesomeIcon className="icon-edit" icon={faPenToSquare} />
                                        </div>
                                        <div
                                            onClick={() => this.handleDeleteDiscount(discount)}
                                            className="icon-action"
                                        >
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscountManage);
