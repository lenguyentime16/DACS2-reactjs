import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import { FormattedMessage } from 'react-intl';
import Specialty from './Section/Specialty';
import HomeFooter from './HomeFooter';

import About from './Section/About'
import TutoringFacility from './Section/TutoringFacility';
import OutStandingTeacher from './Section/OutStandingTeacher';
import HandBook from './Section/HandBook';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {

    render() {
       let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
       }

        return (
            <div>
                <HomeHeader />
                <Specialty
                    settings = {settings}
                 />

                <TutoringFacility 
                    settings = {settings}
                    />
                <OutStandingTeacher 
                    settings = {settings}
                    />

                <HandBook settings = {settings} />  

                <About />
                <HomeFooter />      
                <div style={{height: '300px'}}></div>
            </div>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
