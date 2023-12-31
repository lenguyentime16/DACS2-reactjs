import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import "./ManageTeacher.scss";
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforTeacher } from "../../../services/userService";



const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listTeachers: [],
            hasOlData: false,

            //save to teacher_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClassroom: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClassroom: '',
            selectedSpecialty: '',



            nameClassRoom: '',
            addressClassRoom: '',
            note: '',
            classroomId: '',
            specialtyId: '',

        }
    }

    componentDidMount() {
        this.props.fetchAllTeachers();
        this.props.getAllRequiredTeacherInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.lastName} ${item.firstName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap;
                    result.push(object)
                })
            }

            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'CLASSROOM') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allTeachers !== this.props.allTeachers) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers, 'USERS')
            this.setState({
                listTeachers: dataSelect
            })
        }

        if (prevProps.allRequiredTeacherInfor !== this.props.allRequiredTeacherInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClassroom } = this.props.allRequiredTeacherInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClassroom = this.buildDataInputSelect(resClassroom, 'CLASSROOM')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClassroom: dataSelectClassroom
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers, 'USERS')
            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredTeacherInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'PROVINCE');
            this.setState({
                listTeachers: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOlData } = this.state;
        this.props.saveDetailTeacher({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            teacherId: this.state.selectedOption.value,
            action: hasOlData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice:this.state.selectedPrice.value,
            selectedPayment:this.state.selectedPayment.value,
            selectedProvince:this.state.selectedProvince.value,
            nameClassRoom: this.state.nameClassRoom,
            addressClassRoom: this.state.addressClassRoom,
            note: this.state.note,
            classroomId: this.state.selectedClassroom && this.state.selectedClassroom.value ? this.state.selectedClassroom.value : '',
            specialtyId: this.state.selectedSpecialty.value

        })
        this.setState({
            contentHTML: "",
            contentMarkdown: "",
            description: "",
            hasOlData: false,
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let {listPayment, listPrice, listProvince, listSpecialty, listClassroom } = this.state;

        let res = await getDetailInforTeacher(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClassRoom ='', nameClassRoom='', note='',paymentId='',description='',
                priceId='',provinceId='',specialtyId='',classroomId='',
                selectedPayment='',selectedPrice='',selectedProvince='',
                selectedSpecialty='', selectedClassroom='';

            if(res.data.Teacher_Infor) {
                description = res.data.Teacher_Infor.description;
                addressClassRoom = res.data.Teacher_Infor.addressClassRoom;
                nameClassRoom = res.data.Teacher_Infor.nameClassRoom;
                note = res.data.Teacher_Infor.note;
                paymentId = res.data.Teacher_Infor.paymentId;
                priceId = res.data.Teacher_Infor.priceId;
                provinceId = res.data.Teacher_Infor.provinceId;
                specialtyId= res.data.Teacher_Infor.specialtyId;
                classroomId= res.data.Teacher_Infor.classroomId;

                selectedPayment = listPayment.find(item=> {
                    return item && item.value === paymentId
                })
                
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClassroom = listClassroom.find(item => {
                    return item && item.value === classroomId
                })
            }    
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOlData: true,
                addressClassRoom: addressClassRoom,
                nameClassRoom: nameClassRoom,
                note:note,
                selectedPayment:selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty:selectedSpecialty,
                selectedClassroom: selectedClassroom
            })
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOlData: false,
                addressClassRoom: '',
                nameClassRoom: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClassroom:'',
            })
        }
        console.log(`Option selected :`, res);
    };

    handleChangeSelectTeacherInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { hasOlData } = this.state;
        console.log('Mở đường check state: ',this.state)
        return (
            <div className='manage-teacher-container'>
                <div className='manage-teacher-title'>
                    <FormattedMessage id='admin.manage-teacher.title' />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id='admin.manage-teacher.select-teacher' /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listTeachers}
                            placeholder={<FormattedMessage id='admin.manage-teacher.select-teacher' />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id='admin.manage-teacher.intro' /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-teacher.price' /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectTeacherInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-teacher.price' />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-teacher.payment' /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectTeacherInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-teacher.payment' />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-teacher.province' /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectTeacherInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-teacher.province' />}
                            name="selectedProvince"
                        />
                    </div>


                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-teacher.class-name' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClassRoom')}
                            value={this.state.nameClassRoom}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-teacher.class-address' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClassRoom')}
                            value={this.state.addressClassRoom}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-teacher.note' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-teacher.specialty"/></label>
                        <Select 
                        value = {this.state.selectedSpecialty}
                        options = {this.state.listSpecialty}
                        placeholder = {<FormattedMessage id='admin.manage-teacher.specialty' />}
                        onChange = {this.handleChangeSelectTeacherInfor}
                        name = "selectedSpecialty"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-teacher.select-classroom"/></label>
                        <Select 
                            value = {this.state.selectedClassroom}
                            options = {this.state.listClassroom}
                            placeholder = {<FormattedMessage id='admin.manage-teacher.select-classroom' />}
                            onChange = {this.handleChangeSelectTeacherInfor}
                            name = "selectedClassroom"
                        />
                    </div>
                </div>


                <div className='manage-teacher-editer'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOlData === true ? "save-content-teacher" : "create-content-teacher"}>
                    {hasOlData === true ?
                        <span><FormattedMessage id='admin.manage-teacher.save' /></span> :
                        <span><FormattedMessage id='admin.manage-teacher.add' /></span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allTeachers: state.admin.allTeachers,
        allRequiredTeacherInfor: state.admin.allRequiredTeacherInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTeachers: () => dispatch(actions.fetchAllTeachers()),
        getAllRequiredTeacherInfor: () => dispatch(actions.getRequiredTeacherInfor()),
        saveDetailTeacher: (data) => dispatch(actions.saveDetailTeacher(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);