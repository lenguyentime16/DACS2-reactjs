import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class OutStandingTeacher extends Component {


    render() {
        return (
            <div className="section-share section-outstanding-teacher">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Giảng viên nổi bật tuần qua</span>
                        <button className="btn-section">xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="section-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-teacher"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Thạc sĩ Lê Công Nguyên</div>
                                        <div>Giảng viên môn Hoá Học</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="section-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-teacher"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Thạc sĩ Lê Công Nguyên</div>
                                        <div>Giảng viên môn Hoá Học</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="section-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-teacher"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Thạc sĩ Lê Công Nguyên</div>
                                        <div>Giảng viên môn Hoá Học</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="section-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-teacher"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Thạc sĩ Lê Công Nguyên</div>
                                        <div>Giảng viên môn Hoá Học</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="section-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-teacher"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Thạc sĩ Lê Công Nguyên</div>
                                        <div>Giảng viên môn Hoá Học</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="section-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-teacher"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Thạc sĩ Lê Công Nguyên</div>
                                        <div>Giảng viên môn Hoá Học</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingTeacher);