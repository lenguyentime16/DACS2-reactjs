import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageStudent.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllStudentForTeacher } from '../../../services/userService';
import moment from 'moment';


class ManageStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataStudent: []
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataStudent(user, formatedDate);
    }

    getDataStudent = async (user, formatedDate) => {
        let res = await getAllStudentForTeacher({
            teacherId: user.id,
            date: formatedDate
        })
        console.log('user', user);
        console.log("res: ", res);
        if (res && res.errCode === 0) {
            this.setState({
                dataStudent: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataStudent(user, formatedDate)
        })
    }

    handleBtnConfirm = () => {

    }

    handleBtnRemedy = () => {
        
    }

    render () {
        let { dataStudent } = this.state;
        console.log('check state:', dataStudent)
        return (
            <div className="manage-student-container">
                <div className="m-p-title">
                    Quản lý học sinh
                </div>
                <div className="manage-student-body row">
                    <div className="col-4 form-group">
                        <label>Chọn ngày học: </label>
                        <DatePicker 
                            onChange = {this.handleOnchangeDatePicker}
                            className = "form-control"
                            value = {this.state.currentDate}
                        />
                    </div>
                    <div className="col-12 table-manage-student">
                        <table style = {{ width: '100%' }}>
                            <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Thời gian</th>
                                <th>Họ và tên</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Actions</th>
                            </tr>
                            {dataStudent && dataStudent.length > 0 ? 
                                dataStudent.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.timeTypeDataStudent.valueVi}</td>
                                            <td>{item.studentData.firstName}</td>
                                            <td>{item.studentData.address}</td>
                                            <td>{item.studentData.genderData.valueVi}</td>
                                            <td>
                                                <button className="mp-btn-confirm"
                                                    onClick={() => this.handleBtnConfirm()}>Xác nhận</button>
                                                    <button className="mp-btn-remedy"
                                                    onClick={() => this.handleBtnRemedy()}>Gửi hoá đơn</button>
                                            </td>
                                        </tr>
                                    )
                                })

                                :
                                <tr>
                                  <td>no data</td>  
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudent);