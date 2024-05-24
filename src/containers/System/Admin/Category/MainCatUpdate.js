import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import mainCatService from '../../../../services/mainCatService';
import { CommonUtils } from '../../../../utils';

import './MainCatUpdate.scss';

class MainCatUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            id: '',
            name: '',
            image: '',
            description: '',
        };
    }

    componentDidMount() {
        this.loadMainCatDetails();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    loadMainCatDetails = async () => {
        const mainCatId = this.props.match.params.id;
        if (mainCatId) {
            const response = await mainCatService.readMainCatById(mainCatId);
            if (response && response.errCode === 0) {
                response.data.forEach((item) => {
                    if (item.image) {
                        item.image = Buffer.from(item.image, 'base64').toString('binary');
                    }
                });
                const mainCat = response.data[0];
                this.setState({
                    id: mainCat.id,
                    name: mainCat.name,
                    image: mainCat.image,
                    description: mainCat.description,
                });
            } else {
                toast.warning('Không tìm thấy danh mục chính');
                this.props.history.push('/system/main-cat-manage');
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
    handleUpdateMainCat = async () => {
        const response = await mainCatService.updateMainCat({
            id: this.state.id,
            name: this.state.name,
            image: this.state.image,
            description: this.state.description,
        });
        this.props.history.push('/system/main-cat-manage');
        if (response && response.errCode === 0) {
            toast.success(`Sửa danh mục chính "${this.state.name}" thành công`);
        } else {
            toast.warning(`Sửa danh mục chính "${this.state.name}" thất bại`);
        }
    };

    handleBack = () => {
        this.props.history.push('/system/main-cat-manage');
    };

    render() {
        return (
            <div className="main-cat-update-container">
                <div className="title">Sửa danh mục chính</div>
                <div className="main-cat-update-body mt-5">
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
                                    <img src={this.state.previewImgURL || this.state.image}></img>
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
                                    onClick={() => this.handleUpdateMainCat()}
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

export default connect(mapStateToProps, mapDispatchToProps)(MainCatUpdate);
