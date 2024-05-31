import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import subCatService from '../../services/subCatService';
import productService from '../../services/productService';
import HomePageCat from '../../components/Sections/HomePageCat';

import './SubCatPage.scss';

class SubCatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subCat: {},
            productArr: [],
        };
    }

    async componentDidMount() {
        await this.readSubCat();
        if (this.state.subCat && this.state.subCat.id) {
            await this.readProduct(this.state.subCat.id);
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({ productArr: [] });
            await this.readSubCat();
            if (this.state.subCat && this.state.subCat.id) {
                await this.readProduct(this.state.subCat.id);
            }
        }
    }

    readProduct = async (subCatId) => {
        const response = await productService.readProductBySubCatId(subCatId);
        if (response && response.errCode === 0) {
            const products = response.data.map((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
                return item;
            });
            this.setState((prevState) => ({
                productArr: [...prevState.productArr, ...products],
            }));
        }
    };

    readSubCat = async () => {
        const subCatId = this.props.match.params.id;
        const response = await subCatService.readSubCatById(subCatId);
        if (response && response.errCode === 0) {
            await response.data.forEach((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
            });
            this.setState({
                subCat: response.data[0],
            });
        }
    };

    render() {
        return (
            <div className="sub-cat-container container">
                {this.state.subCat.length > 0 && (
                    <div className="sub-cat-nav">
                        <div className="nav-content">
                            <h3 className="nav-title">Danh mục</h3>
                            <div className="nav-body">
                                {this.state.subCat.map((item) => {
                                    return (
                                        <Link key={item.id} className="nav-body-item">
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                <div className="sub-cat-content row">
                    <div className="col-12 content-item">
                        <h1>{this.state.subCat.name}</h1>
                    </div>
                    <div className="col-12 content-item">
                        {this.state.subCat.image && <img src={this.state.subCat.image} alt="Ảnh danh mục chính" />}
                    </div>
                    <div className="col-12 content-item">
                        <p>{this.state.subCat.description}</p>
                    </div>
                    {this.state.productArr && (
                        <div className="col-12 content-item">
                            <HomePageCat type="full" title="Sản phẩm nổi bật" content={this.state.productArr} />
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(SubCatPage);
