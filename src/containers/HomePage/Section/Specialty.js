import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
//Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Specialty extends Component {
   

    render() {

        return (
            <div className="section-share section-specialty">
                <div className='section-container'>
                    <div className="section-header">
                        <span className="title-section">Các môn học</span>
                        <button className="btn-section">xem thêm</button>
                    </div>
                    <div className="section-body">
                    <Slider {...this.props.settings}>
                    <div className='section-customize'>
                        <div className="bg-image section-specialty" />
                        <h3>Toán</h3>
                    </div>
                    <div className='section-customize'>
                    <div className="bg-image section-specialty" />
                        <h3>Vật Lý</h3>
                    </div>
                    <div className='section-customize'>
                    <div className="bg-image section-specialty" />
                        <h3>Hoá Học</h3>
                    </div>
                    <div className='section-customize'>
                    <div className="bg-image section-specialty" />
                        <h3>Sinh Học</h3>
                    </div>
                    <div className='section-customize'>
                    <div className="bg-image section-specialty" />
                        <h3>Ngoại Ngữ</h3>
                    </div>
                    <div className='section-customize'>
                    <div className="bg-image section-specialty" />
                        <h3>Ngữ Văn</h3>
                    </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
