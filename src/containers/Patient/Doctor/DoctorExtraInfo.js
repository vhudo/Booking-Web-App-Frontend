import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import { getscheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {
        let { language } = this.props
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { language } = this.props
        return (
            <div className='doctor-extra-info-container'>alo</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
