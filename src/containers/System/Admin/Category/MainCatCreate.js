import React, { Component } from 'react';
import { connect } from 'react-redux';

import userService from '../../../../services/userService';
import * as action from '../../../../store/actions';

import './MainCatCreate.scss';

class MainCatCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            image: '',
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeImage = (event) => {
        const data = event.target.files;
        const file = data[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: file,
            });
        }
    };

    render() {
        return (
            <div className="user-redux-container">
                <div className="title">Tạo danh mục chính</div>
                <div className="user-redux-body mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-3 mb-3">
                                <label className="form-label">Tên danh mục chính</label>
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
                            <div className="col-6 mb-3">
                                <label className="form-label">Mô tả</label>
                                <textarea class="form-control" rows="3"></textarea>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-1">
                                <button type="submit" className="btn btn-primary me-3">
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCatCreate);
