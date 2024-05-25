import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import mainCatService from '../../services/mainCatService';

import './MainCatPage.scss';

const list = [
    {
        id: 1,
        name: 'ghế',
    },
    {
        id: 1,
        name: 'bàn',
    },
];

class MainCatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainCat: {},
        };
    }

    componentDidMount() {
        this.readMainCat();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.readMainCat();
        }
    }

    readMainCat = async () => {
        const mainCatId = this.props.match.params.id;
        const response = await mainCatService.readMainCatById(mainCatId);
        if (response && response.errCode === 0) {
            await response.data.forEach((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
            });
            this.setState({
                mainCat: response.data[0],
            });
        }
    };

    render() {
        return (
            <div className="main-cat-container container">
                <div className="main-cat-nav">
                    <div className="nav-content">
                        <h3 className="nav-title">Danh mục</h3>
                        <div className="nav-body">
                            {list.map((item) => {
                                return (
                                    <Link key={item.id} className="nav-body-item">
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="main-cat-content row">
                    <div className="col-12 content-item">
                        <h1>{this.state.mainCat.name}</h1>
                    </div>
                    <div className="col-12 content-item">
                        {this.state.mainCat.image && <img src={this.state.mainCat.image} alt="Ảnh danh mục chính" />}
                    </div>
                    <div className="col-12 content-item">
                        <p>{this.state.mainCat.description}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainCatPage);
