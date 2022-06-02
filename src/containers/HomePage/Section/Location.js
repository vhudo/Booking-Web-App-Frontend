import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { getAllClinic } from '../../../services/userService'
import { Link } from "react-router-dom";
import './Location.scss'

class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLocation: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataLocation: res.data ? res.data : []
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    render() {
        let { dataLocation } = this.state
        return (
            <div className='section-share section-location' >
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.specialty-top" />
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="homepage.more-info" />
                        </button>

                    </div>
                    <div className='section-body'>

                        <Slider {...this.props.settings}>
                            {dataLocation && dataLocation.length > 0 &&
                                dataLocation.map((item, index) => {
                                    return (
                                        <div className='section-customize location-child' key={index}>
                                            <Link to={`/detail-location/${item.id}`}>
                                                <div className='img section-location'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                >
                                                </div>
                                                <div className='location-name'>{item.name}</div>
                                            </Link>

                                        </div>

                                    )
                                })}
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
