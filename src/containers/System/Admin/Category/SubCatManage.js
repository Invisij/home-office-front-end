import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

import subCatService from '../../../../services/subCatService';

import './SubCatManage.scss';

class SubCatManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subCatArr: [],
        };
    }

    componentDidMount() {
        this.readSubCat();
    }

    readSubCat = async () => {
        const response = await subCatService.readSubCat();
        response.data.forEach((item) => {
            if (item.image) {
                item.image = Buffer.from(item.image, 'base64').toString('binary');
            }
        });
        if (response && response.errCode === 0) {
            this.setState({
                subCatArr: response.data,
            });
        }
    };

    handleName = async (event) => {
        const response = await subCatService.readSubCat(event.target.value);
        response.data.forEach((item) => {
            if (item.image) {
                item.image = Buffer.from(item.image, 'base64').toString('binary');
            }
        });
        if (response && response.errCode === 0) {
            this.setState({
                subCatArr: response.data,
            });
        }
    };

    handleCreateSubCat = () => {
        this.props.history.push('/system/sub-cat-create');
    };

    handleUpdateSubCat = (subCat) => {
        this.props.history.push({
            pathname: `/system/sub-cat-update/${subCat.id}`,
        });
    };

    handleDeleteSubCat = async (subCat) => {
        const response = await subCatService.deleteSubCat(subCat.id);
        if (response && response.errCode === 0) {
            this.readSubCat();
            toast.success(`Xóa danh mục phụ "${subCat.name}" thành công`);
        } else {
            toast.warning(`Xóa danh mục phụ "${subCat.name}" thất bại`);
        }
    };

    render() {
        return (
            <div className="sub-cat-manage-container container mt-5">
                <div className="title text-center mb-5">Quản lý danh mục phụ</div>
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
                                    placeholder="Tên danh mục phụ..."
                                    onChange={(event) => this.handleName(event)}
                                />
                                <label htmlFor="name">Tên danh mục phụ</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-7"></div>
                    <div className="col-3 text-right text mt-1">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg button-text"
                            onClick={() => this.handleCreateSubCat()}
                        >
                            Tạo danh mục phụ mới
                        </button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Loại danh mục chính</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.subCatArr.map((subCat, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{subCat.name}</td>
                                    <td>{subCat.mainCatId}</td>
                                    <td>{subCat.image && <img src={subCat.image} alt="Đây là ảnh danh mục" />}</td>
                                    <td className="description">{subCat.description}</td>
                                    <td>
                                        <div onClick={() => this.handleUpdateSubCat(subCat)} className="icon-action">
                                            <FontAwesomeIcon className="icon-edit" icon={faPenToSquare} />
                                        </div>
                                        <div onClick={() => this.handleDeleteSubCat(subCat)} className="icon-action">
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

export default connect(mapStateToProps, mapDispatchToProps)(SubCatManage);
