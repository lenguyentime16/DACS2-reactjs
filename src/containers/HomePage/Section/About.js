import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';




class About extends Component {
   

    render() {
       
        return (
            <div className='section-share section-about'>
               <div className="section-about-header">
                Các chi nhánh trung tâm gia sư
               </div>
                <div className="section-about-content">
                <div className="content-left">
                <iframe width="100%" height="400px" 
                src="https://www.youtube.com/embed/HOKFLBD1NfI" 
                title="Sinh viên nên nhận gia sư ở đâu để không BỊ LỪA? Top 5 trung tâm gia sư uy tín nhất Hà Nội." 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullscreen></iframe>

                </div>
                <div className="content-right">
               <p>Trung Tâm Gia Sư Uy Tín: Nơi Tập Trung Giáo Viên Chất Lượng, Hỗ Trợ Học Sinh Phát Triển Toàn Diện Với Phương Pháp Giảng Dạy Hiện Đại, Đồng Hành Cùng Phụ Huynh Trong Việc Xây Dựng Nền Tảng Kiến Thức Vững Chắc Cho Tương Lai Sáng Tạo. </p> 

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
