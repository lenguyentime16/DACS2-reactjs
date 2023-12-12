import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveBulkScheduleTeacher } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTeachers: [],
            selectedTeacher: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllTeachers();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allTeachers !== this.props.allTeachers) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers)
            this.setState({
                listTeachers: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            console.log('check range time: ', this.props.allScheduleTime)
            let data = this.props.allScheduleTime;
            if (data && data.length >0 ) {
                data = data.map(item => ({ ...item, isSelected: false}))

                console.log('check data: ', data);
            }
            this.setState({
                rangeTime: data
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allTeachers)
        //     this.setState({
        //         listTeachers: dataSelect
        //     })
        // }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id;
                result.push(object)
            })


        }
        return result
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedTeacher: selectedOption });
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length >0) {
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })

            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let {rangeTime, selectedTeacher, currentDate} = this.state;
        let result = []
        if (!currentDate) {
            toast.error("Invalid date!");
            return;
        }

        if (selectedTeacher && _.isEmpty(selectedTeacher)) {
            toast.error("Invalid selected teacher!");
            return;
        }

        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length >0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true) 

            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {};
                    object.teacherId = selectedTeacher.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Invalid selected time!");
                return;
            }            
        }
        let res = await saveBulkScheduleTeacher({
            arrSchedule: result,
            teacherId: selectedTeacher.value,
            formatedDate: formatedDate
        })

        if(res && res.infor.errMessage === "OK"){
            toast.success("Save infor succeed!")
        }else{
            toast.error("Err saveBulkScheduleTeacher")
            console.log("Show res: ",res)
        }
    }
    render() {
        console.log(this.state)
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        return (

            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-teacher' /></label>
                            <Select
                                value={this.state.selectedTeacher}
                                onChange={this.handleChangeSelect}
                                options={this.state.listTeachers}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={
                                        item.isSelected === true ? 
                                        "btn btn-schedule active" :"btn btn-schedule" }
                                        key={index}
                                        onClick={()=> this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }

                        </div>

                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={()=>this.handleSaveSchedule()}
                            >
                            <FormattedMessage id='manage-schedule.save-infor'/>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allTeachers: state.admin.allTeachers,
        isLoggedIn: state.user.isLoggedIn,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTeachers: () => dispatch(actions.fetchAllTeachers()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
