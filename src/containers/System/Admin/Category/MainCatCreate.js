import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import mainCatService from '../../../../services/mainCatService';
import { CommonUtils } from '../../../../utils';

import './MainCatCreate.scss';

class MainCatCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            name: '',
            image: '',
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
    handleAddMainCat = async () => {
        const response = await mainCatService.createMainCat({
            name: this.state.name,
            image: this.state.image,
            description: this.state.description,
        });
        this.props.history.push('/system/main-cat-manage');
        if (response && response.errCode === 0) {
            toast.success(`Thêm danh mục chính "${this.state.name}" thành công`);
        } else {
            toast.warning(`Thêm danh mục chính "${this.state.name}" thất bại`);
        }
    };

    handleBack = () => {
        this.props.history.push('/system/main-cat-manage');
    };

    render() {
        return (
            <div className="main-cat-create-container">
                <div className="title">Tạo danh mục chính</div>
                <div className="main-cat-create-body mt-5">
                    <div className="container">
                        <div className="mb-3 btn-back" onClick={() => this.handleBack()}>
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                            <span className="ms-3">Quay lại</span>
                        </div>
                        <div className="row">
                            <div className="col-3 mb-3">
                                <label className="form-label">Tên danh mục chính</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập tên danh mục..."
                                    onChange={(event) => this.onChangeInput(event, 'name')}
                                    value={this.state.name}
                                />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-4 mb-3">
                                <label className="form-label">Ảnh</label>
                                <div className="mb-3 img-preview">
                                    <img src={this.state.previewImgURL || ''} alt="Ảnh danh mục chính" />
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
                            <div className="col-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-3"
                                    onClick={() => this.handleAddMainCat()}
                                >
                                    Thêm danh mục
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
