import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import TeacherSchedule from '../Teacher/TeacherSchedule'
import TeacherExtraInfor from '../Teacher/TeacherExtraInfor'
import ProfileTeacher from '../Teacher/ProfileTeacher';

class DetailSpecialty extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            arrTeacherId: [18,19,20]
        }
    }

    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { arrTeacherId } = this.state
        return (
            <div className='detail-specialty-container'>
            <HomeHeader />
            <div className='detail-specialty-body'>
                <div className='description-specialty'>

                </div>
                {arrTeacherId && arrTeacherId.length > 0 &&
                    arrTeacherId.map((item, index) => {
                        return (
                            <div className="each-teacher" key={index}> 
                                <div className="dt-content-left">
                                    <div className='profile-teacher'>
                                        <ProfileTeacher 
                                        teacherId = {item}
                                        isShowDescriptionTeacher = {true}
                                        />
                                        </div>
                            </div>
                            <div className="dt-content-right">
                                <div className="teacher-schedule">
                                    <TeacherSchedule 
                                    teacherIdFromParent = {item}
                                    />
                                </div>
                                <div className="teacher-extra-infor">
                                    <TeacherExtraInfor 
                                    teacherIdFromParent = {item}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);