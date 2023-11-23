import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';




class HomeFooter extends Component {
   

    render() {
       
        return (
            <div className="home-footer">
               <p>&copy; 2023 Tutoring Center By Nguyen Lee & Thanh Binh. 
                <a href="#">More information, please visit my youtube channel. &#8594; Click Here &#8592;</a></p>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
