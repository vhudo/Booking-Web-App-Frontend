import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';

class Location extends Component {

    render() {
        return (
            <div className='section-share section-location' >
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Facility</span>
                        <button className='btn-section'>More</button>

                    </div>
                    <div className='section-body'>

                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='img section-location'></div>
                                <div>Location 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-location'></div>
                                <div>Location 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-location'></div>
                                <div>Location 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-location'></div>
                                <div>Location 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-location'></div>
                                <div>Location 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-location'></div>
                                <div>Location 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Location);
