import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faPinterest, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import './HomePage.scss';

class HomePage extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="home-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-4 header-logo">Logo</div>
                            <div className="col-4 header-search">Search</div>
                            <div className="col-4 header-action">Action</div>
                            <div className="col-12 header-menu">
                                <div className="header-menu-item">1</div>
                                <div className="header-menu-item">2</div>
                                <div className="header-menu-item">3</div>
                                <div className="header-menu-item">4</div>
                                <div className="header-menu-item">5</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-body">This is body</div>
                <div className="home-footer">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-12 mt-3 mb-3 footer-social-network">
                                <FontAwesomeIcon icon={faFacebook} />
                                <FontAwesomeIcon icon={faPinterest} />
                                <FontAwesomeIcon icon={faTwitter} />
                                <FontAwesomeIcon icon={faYoutube} />
                                <FontAwesomeIcon icon={faTiktok} />
                            </div>
                        </div>
                        <div className="row text-center footer-info">
                            <div className="col-12 mt-3">
                                <h3>CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ HOMEOFFICE</h3>
                            </div>
                            <div className="col-12">
                                <p>Trụ sở chính: 206/40 Đồng Đen, Phường 14, Quận Tân Bình, Tp.Hồ Chí Minh</p>
                            </div>
                            <div className="col-12">
                                <p>Showroom Cần Thơ: 311C/9 Hoàng Quốc Việt, Q.Ninh Kiều, Tp.Cần Thơ</p>
                            </div>
                            <div className="col-12 mb-3">
                                <p>Website: www.homeoffice.com.vn | Email: duyvu@homeoffice.com.vn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
