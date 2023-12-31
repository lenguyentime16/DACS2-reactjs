import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageStudent.scss';
import DatePicker from '../../../components/Input/DatePicker';


class ManageStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render () {
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
                            <tr>
                                <th>Name</th>
                                <th colSpan="2">Telephone</th>
                            </tr>
                            <tr>
                                <td>Thanh Binh</td>
                                <td>43985734</td>
                                <td>43985734</td>
                            </tr>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudent);