import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import './BookingModal.scss';
import ProfileTeacher from '../ProfileTeacher';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postStudentBookAppointment } from '../../../../services/userService';
import { toast } from "react-toastify"
import moment from 'moment'


class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            teacherId: '',
            genders: '',
            timeType: '',

        }
    }

    async componentDidMount() {
        this.props.getGenders();

    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let teacherId = this.props.dataTime.teacherId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    teacherId: teacherId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')

            return `${time} - ${date}`
        }

        return ''
    }

    buildTeacherName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.teacherData.lastName} ${dataTime.teacherData.firstName}`
                :
                `${dataTime.teacherData.firstName} ${dataTime.teacherData.lastName}`

            return name
        }

        return ''
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let teacherName = this.buildTeacherName(this.props.dataTime)

        let res = await postStudentBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            teacherId: this.state.teacherId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            teacherName: teacherName
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.closeBookingClose();
        } else {
            toast.error('Booking a new appointment error!')
        }
    }




    render() {
        // toggle = { }
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let teacherId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            teacherId = dataTime.teacherId
        }
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="student.booking-modal.title" />
                        </span>
                        <span
                            className="right"
                            onClick={closeBookingClose}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="teacher-infor">
                            <ProfileTeacher
                                teacherId={teacherId}
                                isShowDescriptionTeacher={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="student.booking-modal.fullName" />
                                </label>
                                <input className="form-control"
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="student.booking-modal.phoneNumber" />
                                </label>
                                <input className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="student.booking-modal.email" />
                                </label>
                                <input className="form-control"
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="student.booking-modal.address" />
                                </label>
                                <input className="form-control"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="student.booking-modal.academicLevel" />
                                </label>
                                <input className="form-control"
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="student.booking-modal.birthday" /> </label>
                                <DatePicker
                                    value={this.state.birthday}
                                    className="form-control"
                                    onChange={this.handleOnchangeDatePicker}
                                />


                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="student.booking-modal.gender" />
                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm"
                            onClick={() => this.handleConfirmBooking()}
                        >
                            <FormattedMessage id="student.booking-modal.btnConfirm" />
                        </button>
                        <button className="btn-booking-cancel"
                            onClick={closeBookingClose}
                        >
                            <FormattedMessage id="student.booking-modal.btnCancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);