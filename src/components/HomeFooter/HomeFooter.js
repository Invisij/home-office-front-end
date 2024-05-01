import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faPinterest, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import './HomeFooter.scss';

class HomeFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
