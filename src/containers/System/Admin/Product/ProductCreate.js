import React, { Component } from 'react';
import { connect } from 'react-redux';

import userService from '../../../../services/userService';
import * as action from '../../../../store/actions';

import './ProductCreate.scss';

class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleArr: [],
            previewImgURL: '',
        };
    }

    componentDidMount() {
        // this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roleArr !== this.props.roleArr) {
            this.setState({
                roleArr: this.props.roleArr,
            });
        }
    }

    handleOnChangeImage = (event) => {
        const file = event.target.files[0];
        if (event.target.files[0]) {
            this.setState({
                previewImgURL: URL.createObjectURL(file),
            });
        }
    };

    render() {
        return (
            <div className="user-redux-container">
                <div className="title">Tạo sản phẩm</div>
                <div className="user-redux-body mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-4 mb-3">
                                <label className="form-label">Tên sản phẩm</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-2 mb-3">
                                <label className="form-label">Danh mục</label>
                                <select className="form-select">
                                    {this.state.roleArr.map((item) => (
                                        <option key={item.key} value={item.key}>
                                            {item.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Giá</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Mã hàng</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Trạng thái</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-2 mb-3">
                                <label className="form-label">Số lượng</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Mô tả</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-4 mb-3">
                                <label className="form-label">Ảnh</label>
                                <div className="mb-3 img-preview">
                                    <img src={this.state.previewImgURL || ''}></img>
                                </div>
                                <input
                                    className="form-control"
                                    type="file"
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-1">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-3"
                                    onClick={() => this.handleAddUser}
                                >
                                    Thêm
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
    return {
        roleArr: state.admin.roleArr,
        isLoadingRoleArr: state.admin.isLoadingRoleArr,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getSubCatStart: () => dispatch(action.getSubCatStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate);
