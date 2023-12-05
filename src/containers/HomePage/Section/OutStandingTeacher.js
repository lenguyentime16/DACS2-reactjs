import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import *as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';


class OutStandingTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrTeachers: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topTeachersRedux !== this.props.topTeachersRedux) {
            this.setState({
                arrTeachers: this.props.topTeachersRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopTeachers();
    }

    handleViewDetailTeacher = (teacher) => {
        if (this.props.history) {
            this.props.history.push(`/detail-teacher/${teacher.id}`)
        }

    }
    render() {
        let arrTeachers = this.state.arrTeachers;
        let { language } = this.props;
        // arrTeachers = arrTeachers.concat(arrTeachers).concat(arrTeachers)
        return (
            <div className="section-share section-outstanding-teacher">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id='homepage.outstanding-teacher' />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id='homepage.more-infor' />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrTeachers && arrTeachers.length > 0
                                && arrTeachers.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                                    return (
                                        <div className="section-customize" key={index} onClick={() => this.handleViewDetailTeacher(item)}>
                                            <div className="section-border">
                                                <div className="outer-bg">
                                                    <div className="bg-image section-outstanding-teacher"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}


                                                    />
                                                </div>
                                                <div className="position text-center">
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Giảng viên môn Hoá Học</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topTeachersRedux: state.admin.topTeachers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopTeachers: () => dispatch(actions.fetchTopTeacher())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingTeacher));