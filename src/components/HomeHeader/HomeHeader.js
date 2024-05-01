import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import CartPopper from './HeaderAction/CartPopper';
import UserPopper from './HeaderAction/UserPopper';

import './HomeHeader.scss';

const LIST_ITEM = [
    {
        id: 1,
        name: 'Nội thất văn phòng',
    },
    {
        id: 2,
        name: 'Phòng Khách',
    },
    {
        id: 3,
        name: 'Bếp & Phòng Ăn',
    },
    {
        id: 4,
        name: 'Phòng Ngủ',
    },
    {
        id: 5,
        name: 'Phòng Làm Việc',
    },
    {
        id: 6,
        name: 'Phòng Làm Việc',
    },
    {
        id: 7,
        name: 'Phòng Tắm',
    },
    {
        id: 8,
        name: 'Bàn ghế Cafe - Ngoài trời',
    },
    {
        id: 9,
        name: 'Ống Nước',
    },
    {
        id: 10,
        name: 'Trường Học',
    },
    {
        id: 11,
        name: 'Shop - Salon',
    },
    {
        id: 12,
        name: 'Phụ kiện',
    },
];

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenCart: false,
            isOpenUser: false,
        };
    }
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
                <a href="" className="header-logo" />
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
                    {LIST_ITEM.map((item, index) => (
                        <div key={index} className="header-menu-item">
                            {item.name}
                        </div>
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
