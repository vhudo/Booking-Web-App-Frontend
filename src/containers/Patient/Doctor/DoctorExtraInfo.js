import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import { getExtraInfoDortorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await getExtraInfoDortorById(this.props.doctorId)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }

    showDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { isShowDetailInfo, extraInfo } = this.state
        let { language } = this.props
        return (
            <div className='doctor-extra-info-container'>
                <div className='up'>
                    <div className='text-address'><FormattedMessage id="patient.extra-info-doctor.text-address" /></div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>
                <div className='down'>

                    {isShowDetailInfo === false &&
                        <div>in-network plans <span onClick={() => this.showDetailInfo(true)}>Show more</span></div>
                    }
                    {isShowDetailInfo === true &&
                        <>
                            <div className='title-payment'>
                                <FormattedMessage id="patient.extra-info-doctor.text-payment" />
                            </div>
                            <div></div>
                            <div></div>
                            <div className='payment'>

                                <FormattedMessage id="patient.extra-info-doctor.payment" />
                                {extraInfo && extraInfo.paymentData && language === LANGUAGES.EN ? extraInfo.paymentData.valueEn : ''}
                                {extraInfo && extraInfo.paymentData && language === LANGUAGES.VI ? extraInfo.paymentData.valueVi : ''}
                            </div>
                            <div> <span onClick={() => this.showDetailInfo(false)}>Show less</span></div>
                        </>

                    }

                </div>

            </div>
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
