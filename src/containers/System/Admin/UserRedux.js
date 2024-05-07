import React, { Component } from 'react';
import { connect } from 'react-redux';

import userService from '../../../services/userService';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleArr: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await userService.getAllCode('role');
            if (res && res.errCode === 0) {
                this.setState({
                    roleArr: res.data,
                });
            }
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        const roleArr = this.state.roleArr;
        return (
            <div className="user-redux-container">
                <div className="title">User Redux</div>
                <div className="user-redux-body mt-5">
                    <div className="container">
                        <div className="col-4">
                            <label>Email</label>
                            <input className="form-control" type="email" />
                        </div>
                        <div className="col-4">
                            <label>Mật khẩu</label>
                            <input className="form-control" type="password" />
                        </div>
                        <div className="col-2">
                            <label>Vai trò</label>
                            <select className="form-control">
                                {roleArr.map((item) => (
                                    <option key={item.key} value={item.key}>
                                        {item.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>Họ</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="col-3">
                            <label>Tên</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="col-4">
                            <label>Điện thoại</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="col-9">
                            <label>Địa chỉ</label>
                            <input className="form-control" type="text" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-5 me-3">
                            Thêm
                        </button>
                        <button type="reset" className="btn btn-primary mt-5">
                            Xóa
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
