import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageStudent.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllStudentForTeacher, postSendDocument } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import DocumentModal from './DocumentModal';
import { toast } from "react-toastify"
import LoadingOverlay from 'react-loading-overlay'


class ManageStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataStudent: [],
            isOpenDocumentModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        
        this.getDataStudent();
    }

    getDataStudent = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
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
        }, async () => {
            
           await this.getDataStudent()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            teacherId: item.teacherId,
            studentId: item.studentId,
            email: item.studentData.email,
            timeType:item.timeType,
            studentName: item.studentData.firstName
        }
        this.setState({
            isOpenDocumentModal: true,
            dataModal: data
        })
        }

        closeDocumentModal = ()  => {
            this.setState({
                isOpenDocumentModal: false,
                dataModal: {}
            })
        }

        sendDocument = async (dataChild) => {
        let  { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })

            let res = await postSendDocument({
                email: dataChild.email,
                imgBase64: dataChild.imgBase64,
                teacherId: dataModal.teacherId,
                studentId: dataModal.studentId,
                timeType: dataModal.timeType,
                language: this.props.language,
                studentName: dataModal.studentName
            })

            if (res && res.errCode === 0) {
                this.setState({
                    isShowLoading: false
                })
                toast.success('Send document succeed!')
                this.closeDocumentModal();
                await this.getDataStudent();
            } else {
                this.setState({
                    isShowLoading: false
                })
                toast.error('Failed...')
            }
        }
    render () {
        let { dataStudent , isOpenDocumentModal, dataModal } = this.state;
        let { language } = this.props;
        console.log('check state:', dataStudent)
        return (
            <>
            <LoadingOverlay 
                active={this.state.isShowLoading}
                spinner
                text='Loading...'
            >
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
                                    let time = language === LANGUAGES.VI ? item.timeTypeDataStudent.valueVi : item.timeTypeDataStudent.valueEn;
                                    let gender = language === LANGUAGES.VI ? item.studentData.genderData.valueVi : item.studentData.genderData.valueEn
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{time}</td>
                                            <td>{item.studentData.firstName}</td>
                                            <td>{item.studentData.address}</td>
                                            <td>{gender}</td>
                                            <td>
                                                <button className="mp-btn-confirm"
                                                    onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>
                                            </td>
                                        </tr>
                                    )
                                })

                                :
                                <tr>
                                  <td colSpan="6" style={{ textAlign: "center"}}>no data</td>  
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <DocumentModal 
             isOpenModal = {isOpenDocumentModal}
             dataModal = {dataModal}
             closeDocumentModal = {this.closeDocumentModal}
             sendDocument = {this.sendDocument}
            />

        </LoadingOverlay>
            </>
            
          
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