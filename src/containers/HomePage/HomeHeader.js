import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo4.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {

    changeLanguage =(language)=>{
        this.props.changeLanguageAppRedux(language)
        //fire redux event: actions
    }

    render() {
        let language =this.props.language;
        console.log('check language vcl: ', language);
        return (
            <React.Fragment>
            <div className="home-header-container"> 
                <div className="home-header-content">
                <div className="left-content">
                    <i className="fas fa-bars"></i>
                    <img className="header-logo" src={logo}></img>
                </div>
                <div className="center-content">
                    <div className="child-content">
                        <div><b><FormattedMessage id="homeheader.specialty"/> </b></div>
                        <div className="subs-title"><FormattedMessage id="homeheader.search-teacher"/></div>
                    </div>
                    <div className="child-content">
                        <div><b><FormattedMessage id="homeheader.Affiliates"/></b></div>
                        <div className="subs-title"><FormattedMessage id="homeheader.select-centers"/></div>
                    </div>
                    <div className="child-content">
                        <div><b><FormattedMessage id="homeheader.teacher"/></b></div>
                        <div className="subs-title"><FormattedMessage id="homeheader.select-teacher"/></div>
                    </div>
                    <div className="child-content">
                        <div><b><FormattedMessage id="homeheader.course"/></b></div>
                        <div className="subs-title"><FormattedMessage id="homeheader.view-course"/></div>
                    </div>
                    </div>
                    <div className="right-content">
                        <div className="support"><i className="fas fa-question-circle"></i>
                            <FormattedMessage id="homeheader.support"/>
                        </div>
                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                    </div>
                </div>
            </div>
            <div className="home-header-banner">
                <div className="content-up">
                <div className="title1"><FormattedMessage id="banner.title1"/></div>
                <div className="title2"><FormattedMessage id="banner.title2"/></div>
                <div className="search">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Tìm môn học bạn muốn"/>
                </div>
                </div>
                <div className="content-down">
                <div className="options">
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-infinity"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.math"/></div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-infinity"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.physic"/></div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-procedures"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.chemistry"/></div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-procedures"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.biology"/></div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-infinity"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.literature"/></div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-infinity"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.english"/></div>
                    </div>
                </div>
                </div>
            </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language)=> dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
