import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguage } from '../../store/actions';
import { Link } from "react-router-dom";

class HomeHeader extends Component {

    changeLanguage = (language) => {

        //fire redux event: actions
        this.props.changeLanguageRedux(language)

    }


    render() {
        // console.log('check props homeHeader', this.props)
        let language = this.props.language;

        return (
            <Fragment>

                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>

                            <i className="fas fa-bars"></i>
                            <Link to="/home">   <i className="fas fa-home" ></i></Link>



                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.location" /></b></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.search-provider" /></b></div>
                                <div></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.services" /></b></div>
                                <div></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <div><b><FormattedMessage id="homeheader.support" /></b></div>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} >
                                <span onClick={(e) => { this.changeLanguage(LANGUAGES.EN) }}>EN</span>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} >
                                <span onClick={(e) => { this.changeLanguage(LANGUAGES.VI) }}>VI</span>
                            </div>

                        </div>

                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title-1'><FormattedMessage id="homeheader.title-1" /></div>
                            <div className='title-2'><FormattedMessage id="homeheader.title-2" /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input
                                    type='text'
                                    placeholder='Find a Doctor'
                                >

                                </input>
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='option'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="homebanner.specialty" />
                                    </div>

                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-video"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="homebanner.tele-health" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'> <i className="fas fa-user-md"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="homebanner.mental-health" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>  <i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="homebanner.dental" />
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                }

            </Fragment>
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
        changeLanguageRedux: (language) => { dispatch(changeLanguage(language)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
