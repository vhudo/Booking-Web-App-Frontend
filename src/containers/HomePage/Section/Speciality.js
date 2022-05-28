import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';

class Speciality extends Component {

    render() {
        return (
            <div className='section-share section-specialty' >
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Top-searched specialties</span>
                        <button className='btn-section'>More</button>

                    </div>
                    <div className='section-body'>

                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='img section-speciality'></div>
                                <div>Speciality 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-speciality'></div>
                                <div>Speciality 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-speciality'></div>
                                <div>Speciality 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-speciality'></div>
                                <div>Speciality 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-speciality'></div>
                                <div>Speciality 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-speciality'></div>
                                <div>Speciality 6</div>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
