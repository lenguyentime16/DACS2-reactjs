import React, { Component } from 'react';

import { connect } from 'react-redux';
import './TutoringFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
//Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClassroom } from '../../../services/userService';
import { withRouter } from 'react-router';


class TutoringFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClassrooms: [],
        }
    }

    async componentDidMount() {
        let res = await getAllClassroom();
        if (res && res.errCode === 0) {
            this.setState({
                dataClassrooms: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClassroom = (classroom) => {
        if (this.props.history) {
            this.props.history.push(`/detail-classroom/${classroom.id}`)
        }
    }

    render() {
        let { dataClassrooms } = this.state;
        return (
            <div className='section-share section-tutoring-facility'>
                <div className='section-container'>
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.popular-centers" /></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClassrooms && dataClassrooms.length > 0 &&
                                dataClassrooms.map((item, index) => {
                                    return (
                                        <div className='section-customize classroom-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailClassroom(item)}

                                        >
                                            <div className="bg-image section-tutoring-facility"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='classroom-name'>{item.name}</div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TutoringFacility));
