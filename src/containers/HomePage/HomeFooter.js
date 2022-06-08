import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';
import { Link } from 'react-router-dom';

class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer-container' >
                <div className='home-footer-content'>
                    <ul className='footer-menu-list'>
                        <li>
                            <a target="_blank" herf="##"> More Information</a>
                        </li>
                        <li>
                            <a herf="#/"> Contact</a>
                        </li>
                    </ul>

                    <ul className='footer-menu-list'>
                        <h5>Find a Doctor</h5>
                        <li>
                            <a herf="/#"> Doctor Seach</a>
                        </li>
                        <li>
                            <a herf="/#"> Specialists Directory</a>
                        </li>
                        <li>
                            <a herf="/#"> Practice Directory</a>
                        </li>
                        <li>
                            <a herf="/#"> Our Newest Doctors</a>
                        </li>
                    </ul>

                    <ul className='footer-menu-list'>

                        <h5>Stay Healthy</h5>

                        <li>
                            Health Tips
                        </li>
                        <li>
                            Health News

                        </li>
                    </ul>

                    <ul className='footer-menu-list'>

                        <h5>Are you Doctor?</h5>

                        <li>
                            <a herf="/#"> How it Works</a>
                        </li>
                        <li>
                            <Link to="/login">  Log In</Link>
                        </li>
                        <li>
                            <a herf="/#"> Telemedicine</a>
                        </li>
                        <li>
                            <a herf="/#"> For Managers</a>
                        </li>
                    </ul>
                    <div className='foot-cr'>

                        <p>&copy; 2022 VuHo. More Information

                            <a target="_blank" herf="https://github.com/vhudo"> GitHub</a>

                        </p>

                    </div>
                </div>



            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
