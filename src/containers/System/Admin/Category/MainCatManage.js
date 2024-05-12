import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

import mainCatService from '../../../../services/mainCatService';

import './MainCatManage.scss';

class MainCatManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainCatArr: [],
        };
    }

    componentDidMount() {
        this.readMainCat();
    }

    readMainCat = async () => {
        const response = await mainCatService.readMainCat();

        response.data.forEach((item) => {
            if (item.image) {
                item.image = Buffer.from(item.image, 'base64').toString('binary');
            }
        });

        if (response && response.errCode === 0) {
            this.setState({
                mainCatArr: response.data,
            });
        }
    };

    handleName = async (event) => {
        const response = await mainCatService.readMainCat(event.target.value);
        response.data.forEach((item) => {
            if (item.image) {
                item.image = Buffer.from(item.image, 'base64').toString('binary');
            }
        });
        if (response && response.errCode === 0) {
            this.setState({
                mainCatArr: response.data,
            });
        }
    };

    handleCreateMainCat = () => {
        this.props.history.push('/system/main-cat-create');
    };

    handleUpdateMainCat = (mainCat) => {
        this.props.history.push({
            pathname: '/system/main-cat-update',
            state: { mainCat },
        });
    };

    handleDeleteMainCat = async (mainCat) => {
        const response = await mainCatService.deleteMainCat(mainCat.id);
        if (response && response.errCode === 0) {
            this.readMainCat();
            toast.success(`Xóa danh mục chính "${mainCat.name}" thành công`);
        } else {
            toast.warning(`Xóa danh mục chính "${mainCat.name}" thất bại`);
        }
    };

    render() {
        return (
            <div className="main-cat-manage-container container mt-5">
                <div className="title text-center mb-5">Quản lý danh mục chính</div>
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
                                    placeholder="Tên danh mục chính..."
                                    onChange={(event) => this.handleName(event)}
                                />
                                <label htmlFor="name">Tên danh mục chính</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-7"></div>
                    <div className="col-3 text-right text mt-1">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg button-text"
                            onClick={() => this.handleCreateMainCat()}
                        >
                            Tạo danh mục chính mới
                        </button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên danh mục chính</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.mainCatArr.map((mainCat, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{mainCat.name}</td>
                                    <td>
                                        <img src={mainCat.image} alt="Đây là ảnh danh mục" />
                                    </td>
                                    <td>{mainCat.description}</td>
                                    <td>
                                        <div onClick={() => this.handleUpdateMainCat(mainCat)} className="icon-action">
                                            <FontAwesomeIcon className="icon-edit" icon={faPenToSquare} />
                                        </div>
                                        <div onClick={() => this.handleDeleteMainCat(mainCat)} className="icon-action">
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

export default connect(mapStateToProps, mapDispatchToProps)(MainCatManage);
