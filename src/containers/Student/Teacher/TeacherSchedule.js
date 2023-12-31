import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TeacherSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleTeacherByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class TeacherSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);

        if (this.props.teacherIdFromParent) {
            let res = await getScheduleTeacherByDate(this.props.teacherIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }

        this.setState({
            allDays: allDays,
        })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                }
                else {
                    let lableVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(lableVi)
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM")
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.teacherIdFromParent !== prevProps.teacherIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleTeacherByDate(this.props.teacherIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
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

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
        console.log('check time: ', time);
    }

    closeBookingClose = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;

        return (
            <>
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
                            <i className='fas fa-calendar-alt'>
                                <span><FormattedMessage id='student.detail-teacher.schedule' /></span>
                            </i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <React.Fragment>
                                    <div className='time-content-btns'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return (
                                                <button key={index}
                                                    className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >{timeDisplay}
                                                </button>
                                            )
                                        })}
                                    </div>


                                    <div className='book-free'>
                                        <span><FormattedMessage id='student.detail-teacher.choose' />
                                            <i className='far fa-hand-point-up'></i>
                                            <FormattedMessage id='student.detail-teacher.book-free' />
                                        </span>
                                    </div>

                                </React.Fragment>
                                :
                                <div className='no-schedule'><FormattedMessage id='student.detail-teacher.no-schedule' /></div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingClose={this.closeBookingClose}
                    dataTime={dataScheduleTimeModal}
                />
            </>
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