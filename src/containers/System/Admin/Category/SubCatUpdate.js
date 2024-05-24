import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import subCatService from '../../../../services/subCatService';
import mainCatService from '../../../../services/mainCatService';
import { CommonUtils } from '../../../../utils';

import './SubCatUpdate.scss';

class SubCatUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainCatArr: [],
            previewImgURL: '',
            mainCatId: '',
            id: '',
            name: '',
            image: '',
            description: '',
        };
    }

    componentDidMount() {
        this.fetchMainCats();
        this.loadSubCatDetails();
    }

    fetchMainCats = async () => {
        const response = await mainCatService.readMainCat('name');
        if (response && response.errCode === 0) {
            this.setState({
                mainCatArr: response.data,
                mainCatId: response.data[0].id,
            });
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {}

    loadSubCatDetails = async () => {
        const subCatId = this.props.match.params.id;
        if (subCatId) {
            const response = await subCatService.readSubCatById(subCatId);
            if (response && response.errCode === 0) {
                response.data.forEach((item) => {
                    if (item.image) {
                        item.image = Buffer.from(item.image, 'base64').toString('binary');
                    }
                });
                const subCat = response.data[0];
                this.setState({
                    id: subCat.id,
                    mainCatId: subCat.mainCatId,
                    name: subCat.name,
                    image: subCat.image,
                    description: subCat.description,
                });
            } else {
                toast.warning('Không tìm thấy danh mục phụ');
                this.props.history.push('/system/sub-cat-manage');
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
    handleUpdateSubCat = async () => {
        const response = await subCatService.updateSubCat({
            id: this.state.id,
            mainCatId: this.state.mainCatId,
            name: this.state.name,
            image: this.state.image,
            description: this.state.description,
        });
        this.props.history.push('/system/sub-cat-manage');
        if (response && response.errCode === 0) {
            toast.success(`Sửa danh mục phụ "${this.state.name}" thành công`);
        } else {
            toast.warning(`Sửa danh mục phụ "${this.state.name}" thất bại`);
        }
    };

    handleBack = () => {
        this.props.history.push('/system/sub-cat-manage');
    };

    render() {
        return (
            <div className="sub-cat-update-container">
                <div className="title">Sửa danh mục phụ</div>
                <div className="sub-cat-update-body mt-5">
                    <div className="container">
                        <div className="mb-3 btn-back" onClick={() => this.handleBack()}>
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                            <span className="ms-3">Quay lại</span>
                        </div>
                        <div className="row">
                            <div className="col-3 mb-3">
                                <label className="form-label">Tên danh mục phụ</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập tên danh mục..."
                                    onChange={(event) => this.onChangeInput(event, 'name')}
                                    value={this.state.name}
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <label className="form-label">Danh mục chính</label>
                                <select
                                    className="form-select"
                                    value={this.state.mainCatId}
                                    onChange={(event) => this.onChangeInput(event, 'mainCatId')}
                                >
                                    {this.state.mainCatArr.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-4 mb-3">
                                <label className="form-label">Ảnh</label>
                                <div className="mb-3 img-preview">
                                    <img src={this.state.previewImgURL || this.state.image} alt="Ảnh danh mục phụ" />
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
                                    onClick={() => this.handleUpdateSubCat()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SubCatUpdate);
