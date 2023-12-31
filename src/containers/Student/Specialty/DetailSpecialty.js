import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import TeacherSchedule from '../Teacher/TeacherSchedule'
import TeacherExtraInfor from '../Teacher/TeacherExtraInfor'
import ProfileTeacher from '../Teacher/ProfileTeacher';
import { getAllDetailSpecialtyById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrTeacherId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });


            let resProvince = await getAllCodeService('PROVINCE');

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrTeacherId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.teacherSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrTeacherId.push(item.teacherId)
                        })
                    }
                }

                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: "ALL",
                        valueVi: "Toàn quốc",
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrTeacherId: arrTeacherId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;


            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrTeacherId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.teacherSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrTeacherId.push(item.teacherId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrTeacherId: arrTeacherId,
                })
            }
        }
    }


    render() {
        let { arrTeacherId, dataDetailSpecialty, listProvince } = this.state
        console.log('check state:', this.state)
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }} >

                            </div>
                        }
                    </div>
                    <div className="search-sp-teacher">
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }


                        </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);