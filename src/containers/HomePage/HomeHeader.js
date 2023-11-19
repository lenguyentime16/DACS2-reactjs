import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomeHeader.scss';
class HomeHeader extends Component {

    render() {
       

        return (
            <React.Fragment>
            <div className="home-header-container"> 
                <div className="home-header-content">
                <div className="left-content">
                    <i className="fas fa-bars"></i>
                    <div className="header-logo"></div>
                </div>
                <div className="center-content">
                    <div className="child-content">
                        <div><b>Chuyên môn</b></div>
                        <div className="subs-title">tìm giáo viên theo môn học</div>
                    </div>
                    <div className="child-content">
                        <div><b>Các chi nhánh</b></div>
                        <div className="subs-title">chọn các trung tâm</div>
                    </div>
                    <div className="child-content">
                        <div><b>Giáo viên</b></div>
                        <div className="subs-title">chọn giáo viên giỏi</div>
                    </div>
                    <div className="child-content">
                        <div><b>Liên hệ hỗ trợ</b></div>
                        <div className="subs-title">Các kỹ thuật viên hỗ trợ 24/7</div>
                    </div>
                    </div>
                    <div className="right-content">
                        <div className="support"><i className="fas fa-question-circle"></i> Hỗ trợ</div>
                        <div className="flag">VN</div>
                    </div>
                </div>
            </div>
            <div className="home-header-banner">
                <div className="content-up">
                <div className="title1">NỀN TẢNG TRI THỨC</div>
                <div className="title2">ƯƠM MẦM TRÍ TUỆ VIỆT</div>
                <div className="search">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Tìm môn học bạn muốn"/>
                </div>
                </div>
                <div className="content-down">
                <div className="options">
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-infinity"></i></div>
                        <div className="text-child">Toán Học</div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-infinity"></i></div>
                        <div className="text-child">Vật Lý</div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-procedures"></i></div>
                        <div className="text-child">Hoá Học</div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-procedures"></i></div>
                        <div className="text-child">Sinh Học</div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-infinity"></i></div>
                        <div className="text-child">Ngữ Văn</div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-infinity"></i></div>
                        <div className="text-child">Tiếng Anh</div>
                    </div>
                </div>
                </div>
            </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
