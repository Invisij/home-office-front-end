import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import discountService from '../../../../services/discountService';
import * as action from '../../../../store/actions';

import './DiscountCreate.scss';

class DiscountCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            description: '',
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    onChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleAddDiscount = async () => {
        const response = await discountService.createDiscount({
            number: this.state.number,
            name: this.state.name,
            description: this.state.description,
        });
        if (response && response.errCode === 0) {
            this.props.history.push('/system/discount-manage');
            toast.success('Thêm khuyến mãi thành công');
        } else {
            toast.warning('Thêm khuyến mãi thất bại');
        }
    };

    handleBack = () => {
        this.props.history.push('/system/discount-manage');
    };

    render() {
        return (
            <div className="discount-create-container">
                <div className="title">Tạo khuyến mãi</div>
                <div className="discount-create-body">
                    <div className="container">
                        <div className="mb-3 btn-back" onClick={() => this.handleBack()}>
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                            <span className="ms-3">Quay lại</span>
                        </div>
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label className="form-label">Tên khuyến mãi</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập tên..."
                                    onChange={(event) => this.onChangeInput(event, 'name')}
                                    value={this.state.name}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-2 mb-3">
                                <label className="form-label">phần trăm</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập phần trăm..."
                                    value={this.state.number}
                                    onChange={(event) => this.onChangeInput(event, 'number')}
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
                            <div className="col-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-3"
                                    onClick={() => this.handleAddDiscount()}
                                >
                                    Thêm khuyến mãi
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscountCreate);
