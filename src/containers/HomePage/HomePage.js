import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Location from './Section/Location'
import Doctor from './Section/Doctor';
import Posts from './Section/Posts';
import HomeFooter from './HomeFooter'

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <Location settings={settings} ></Location>
                <Doctor settings={settings} />
                <Posts settings={settings} />
                <HomeFooter />


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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
