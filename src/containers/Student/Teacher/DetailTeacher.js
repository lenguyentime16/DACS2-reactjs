import React, { Component } from 'react';
import HomeHeader from '../../HomePage/HomeHeader';
import { connect } from 'react-redux';
import './DetailTeacher.scss';
import { getDetailInforTeacher } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import TeacherSchedule from './TeacherSchedule';


class DetailTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailTeacher: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforTeacher(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailTeacher: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { language } = this.props;

        let { detailTeacher } = this.state;

        let nameVi = '', nameEn = '';

        if (detailTeacher && detailTeacher.positionData) {
            nameVi = `${detailTeacher.positionData.valueVi}, ${detailTeacher.lastName} ${detailTeacher.firstName}`;
            nameEn = `${detailTeacher.positionData.valueEn}, ${detailTeacher.firstName} ${detailTeacher.lastName}`;
        }

        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="teacher-detail-container">
                    <div className="intro-teacher">
                        <div
                            className="content-left"
                            style={{ backgroundImage: `url(${detailTeacher && detailTeacher.image ? detailTeacher.image : ''})` }}
                        >

                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {detailTeacher && detailTeacher.Markdown
                                    && detailTeacher.Markdown.description
                                    &&
                                    <span>
                                        {detailTeacher.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="schedule-teacher">
                        <div className="content-left">
                            <TeacherSchedule 
                            teacherIdFromParent = {detailTeacher && detailTeacher.id ? detailTeacher.id : -1}
                            />
                        </div>
                        <div className="content-right">

                        </div>

                    </div>
                    <div className="detail-infor-teacher">
                        {detailTeacher && detailTeacher.Markdown && detailTeacher.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailTeacher.Markdown.contentHTML }}>
                            </div>
                        }

                    </div>
                    <div className="comment-teacher">

                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTeacher);