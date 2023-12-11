import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TeacherSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleTeacherByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class TeacherSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }

    async componentDidMount() {
        let { language } = this.props;

        console.log('moment vie: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format("ddd - DD/MM"));
        this.setArrDays(language);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let lableVi=moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(lableVi)
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM")
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language);
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.teacherIdFromParent && this.props.teacherIdFromParent !== -1) {
            let teacherId = this.props.teacherIdFromParent;
            let date = event.target.value;
            let res = await getScheduleTeacherByDate(teacherId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            console.log('check res schedule from react: ', res)
        }
    }

    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;

        return (
            <div className="teacher-schedule-container">
                <div className="all-schedule">
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className='text-calendar'>
                        <i className='fas fa-calendar-alt'><span>Lịch học</span></i>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0 ?
                            allAvailableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return (
                                    <button key={index}>{timeDisplay}</button>
                                )
                            })

                            :
                            <div>Giáo viên không có lịch học nào trong ngày này, hãy chọn thời gian khác</div>
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSchedule);