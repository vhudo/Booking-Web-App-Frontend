import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';

class Posts extends Component {

    render() {
        return (
            <div className='section-share section-posts' >
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Health news</span>
                        <button className='btn-section'>More</button>

                    </div>
                    <div className='section-body'>

                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='img section-posts'></div>
                                </div>
                                <div className='position text-center'  >
                                    <div>Name</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='img section-posts'></div>
                                </div>
                                <div className='position text-center'  >
                                    <div>Name</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='img section-posts'></div>
                                </div>
                                <div className='position text-center'  >
                                    <div>Name</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='img section-posts'></div>
                                </div>
                                <div className='position text-center'  >
                                    <div>Name</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='img section-posts'></div>
                                </div>
                                <div className='position text-center'  >
                                    <div>Name</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='img section-posts'></div>
                                </div>
                                <div className='position text-center'  >
                                    <div>Name</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='img section-posts'></div>
                                </div>
                                <div className='position text-center'  >
                                    <div>Name</div>
                                </div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
