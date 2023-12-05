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
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listTeachers: [],
            hasOlData: false,

        }
    }

    componentDidMount() {
        this.props.fetchAllTeachers()
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allTeachers !== this.props.allTeachers) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers)
            this.setState({
                listTeachers: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers)
            this.setState({
                listTeachers: dataSelect
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
            action: hasOlData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
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
        let res = await getDetailInforTeacher(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOlData: true
            })
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOlData: false,
            })
        }
        console.log(`Option selected :`, res);
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        let { hasOlData } = this.state;
        return (
            <div className='manage-teacher-container'>
                <div className='manage-teacher-title'>
                    Tạo thêm thông tin giáo viên
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn giáo viên</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listTeachers}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <div className='manage-teacher-editer'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOlData === true ? "save-content-teacher" : "create-content-teacher"}>
                    {hasOlData === true ?
                        <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allTeachers: state.admin.allTeachers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTeachers: (id) => dispatch(actions.fetchAllTeachers()),
        saveDetailTeacher: (data) => dispatch(actions.saveDetailTeacher(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
