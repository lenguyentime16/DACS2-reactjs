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

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown:'',
            contentHTML:'',
            selectedTeacher:'',
            description:'',

        }   
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState, snapshot){

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown:text,
            contentHTML:html,
        })
    }

    handleSaveContentMarkdown= ()=>{
        console.log('check state', this.state)
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        //   console.log(`Option selected:`, this.state.selectedOption)
    };

    handleOnChangeDesc =(event) =>{
        this.setState({
            description: event.target.value
        })
    }
    render() {
        return (    
            <div className='manage-teacher-container'>
                <div className='manage-teacher-title'>
                    Tạo thêm thông tin giáo viên
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'> 
                        <label>Chọn giáo viên</label>
                        <Select
                            value={this.state.selectedTeacher}
                            onChange={this.handleChange}
                            options={options}
                        /> 
                    </div>
                    <div className='content-right'>
                        <lable>Thông tin giới thiệu:</lable>
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
                        onChange={this.handleEditorChange} />
                </div>
                <button 
                onClick={()=> this.handleSaveContentMarkdown()}
                className='save-content-teacher'>
                    Lưu thông tin
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };  
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux : () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
