import React, { Component } from 'react';
import { connect } from 'react-redux';

import userService from '../../../../services/userService';
import * as action from '../../../../store/actions';

import './MainCatCreate.scss';

class SubCatCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleArr: [],
            previewImgURL: '',
        };
    }

    componentDidMount() {
        this.props.getRoleStart();
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
        console.log(file);
        if (event.target.files[0]) {
            this.setState({
                previewImgURL: URL.createObjectURL(file),
            });
        }
    };

    render() {
        return (
            <div className="user-redux-container">
                <div className="title">Tạo danh mục phụ</div>
                <div className="user-redux-body mt-5">
                    <div className="container">
                        <div className="col-4 mb-3">
                            <label className="form-label">Email</label>
                            <input className="form-control" type="email" />
                        </div>
                        <div className="col-4 mb-3">
                            <label className="form-label">Mật khẩu</label>
                            <input className="form-control" type="password" />
                        </div>
                        <div className="col-2 mb-3">
                            <label className="form-label">Vai trò</label>
                            <select className="form-select">
                                {this.state.roleArr.map((item) => (
                                    <option key={item.key} value={item.key}>
                                        {item.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-3 mb-3">
                            <label className="form-label">Họ</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="col-3 mb-3">
                            <label className="form-label">Tên</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="col-4 mb-3">
                            <label className="form-label">Điện thoại</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="col-9 mb-3">
                            <label className="form-label">Địa chỉ</label>
                            <input className="form-control" type="text" />
                        </div>
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
                        <button type="submit" className="btn btn-primary me-3">
                            Thêm
                        </button>
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
        getRoleStart: () => dispatch(action.getRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCatCreate);
