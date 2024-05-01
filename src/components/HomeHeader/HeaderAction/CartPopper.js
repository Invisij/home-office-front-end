import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'tippy.js/dist/tippy.css';
import './CartPopper.scss';

class CartPopper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
        };
    }
    render() {
        return <div className="cart-popper-wrapper">{this.state.check ? 'hmm' : <div>Giỏ hàng trống</div>}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPopper);
