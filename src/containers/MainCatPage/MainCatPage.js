import React, { Component } from 'react';
import { connect } from 'react-redux';

import './MainCatPage.scss';

class MainCatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="main-cat-container">
                <p>Đây là maincatpage</p>
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
