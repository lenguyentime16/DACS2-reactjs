import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailClassroom.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import TeacherSchedule from '../Teacher/TeacherSchedule'
import TeacherExtraInfor from '../Teacher/TeacherExtraInfor'
import ProfileTeacher from '../Teacher/ProfileTeacher';
import { getAllDetailClassroomById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailClassroom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrTeacherId: [],
            dataDetailClassroom: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailClassroomById({
                id: id
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrTeacherId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.teacherClassroom;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrTeacherId.push(item.teacherId)
                        })
                    }
                }
                this.setState({
                    dataDetailClassroom: res.data,
                    arrTeacherId: arrTeacherId,
                })
            }
        }

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { arrTeacherId, dataDetailClassroom } = this.state
        console.log('check state:', this.state)
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailClassroom && !_.isEmpty(dataDetailClassroom) &&
                            <>
                                <div>{dataDetailClassroom.name}</div>
                                <div>Địa chỉ: {dataDetailClassroom.address}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClassroom.descriptionHTML }} >

                                </div>
                            </>
                        }
                    </div>
                    {arrTeacherId && arrTeacherId.length > 0 &&
                        arrTeacherId.map((item, index) => {
                            return (
                                <div className="each-teacher" key={index}>
                                    <div className="dt-content-left">
                                        <div className='profile-teacher'>
                                            <ProfileTeacher
                                                teacherId={item}
                                                isShowDescriptionTeacher={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="teacher-schedule">
                                            <TeacherSchedule
                                                teacherIdFromParent={item}
                                            />
                                        </div>
                                        <div className="teacher-extra-infor">
                                            <TeacherExtraInfor
                                                teacherIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailClassroom);