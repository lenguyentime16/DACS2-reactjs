import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TeacherExtraInfor.scss'
import { FormattedMessage } from 'react-intl';
import { getScheduleTeacherByDate } from '../../../services/userService';
import {LANGUAGES} from '../../../utils'

class TeacherExtraInfor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language) {

        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let {isShowDetailInfor} = this.state

        return (
            <div className="teacher-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ LỚP</div>
                    <div className="name-classroom">E1-304</div>
                    <div className="detail-address">470 Trần Đại Nghĩa - Ngũ Hành Sơn - Đà Nẵng</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false && 
                        <div className="short-infor"> 
                            HỌC PHÍ: 250.000đ.
                            <span onClick={() => this.showHideDetailInfor(true)}>
                                    Xem chi tiết
                            </span>
                        </div>
                    }

                    {isShowDetailInfor === true && 
                        <>
                            <div className="title-price">HỌC PHÍ: .</div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">Học phí</span>
                                    <span className="right">750.000đ</span>
                                </div>
                                <div className="note">
                                    Được tặng tài liệu khi đặt lịch qua TutoringCenter.com
                                </div>
                                
                            </div>
                            <div className="payment">
                                Học sinh có thể thanh toán học phí bằng hình thức tiền mặt hoặc chuyển khoản
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    Ẩn bảng giá
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherExtraInfor);