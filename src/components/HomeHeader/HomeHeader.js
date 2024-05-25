import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import CartPopper from './HeaderAction/CartPopper';
import UserPopper from './HeaderAction/UserPopper';

import mainCatService from '../../services/mainCatService';

import './HomeHeader.scss';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainCatArr: [],
            isOpenCart: false,
            isOpenUser: false,
        };
    }

    componentDidMount() {
        this.loadMainCatArr();
    }

    loadMainCatArr = async () => {
        const response = await mainCatService.readMainCat('all');
        if (response && response.errCode === 0 && response.data) {
            this.setState({
                mainCatArr: response.data,
            });
        }
    };

    handleHiddenCart = () => {
        this.setState({
            isOpenCart: !this.state.isOpenCart,
        });
    };

    handleHiddenUser = () => {
        this.setState({
            isOpenUser: !this.state.isOpenUser,
        });
    };

    render() {
        return (
            <div className="home-header">
                <Link to={``} className="header-logo" />
                <div className="header-search">
                    <input className="header-search-input" type="text" placeholder="Tìm kiếm sản phẩm..." />
                    <FontAwesomeIcon className="header-search-icon" icon={faMagnifyingGlass} />
                </div>
                <div className="header-action">
                    <Tippy
                        interactive
                        visible={this.state.isOpenCart}
                        onClickOutside={() => this.handleHiddenCart()}
                        offset={[4, 4]}
                        placement="bottom-end"
                        render={(attrs) => (
                            <div className="box" tabIndex="-1" {...attrs}>
                                <CartPopper />
                            </div>
                        )}
                    >
                        <FontAwesomeIcon
                            className="header-action-icon"
                            icon={faCartShopping}
                            onClick={() => this.handleHiddenCart()}
                        />
                    </Tippy>
                    <Tippy
                        interactive
                        visible={this.state.isOpenUser}
                        onClickOutside={() => this.handleHiddenUser()}
                        offset={[4, 4]}
                        placement="bottom-end"
                        render={(attrs) => (
                            <div className="box" tabIndex="-1" {...attrs}>
                                <UserPopper />
                            </div>
                        )}
                    >
                        <FontAwesomeIcon
                            className="header-action-icon"
                            icon={faUser}
                            onClick={() => this.handleHiddenUser()}
                        />
                    </Tippy>
                </div>

                <div className="header-menu">
                    {this.state.mainCatArr.map((item) => (
                        <Link key={item.id} to={`/main-cat-page/${item.id}`} className="header-menu-item">
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
