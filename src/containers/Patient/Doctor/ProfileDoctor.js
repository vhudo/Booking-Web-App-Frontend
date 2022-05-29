import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import { getProfileDortorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash'
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        console.log(data)
        this.setState({
            dataProfile: data
        })
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    getInfoDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDortorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result

    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        let { dataProfile } = this.state

        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.EN ? dataTime.timeTypeData.valueEn : dataTime.timeTypeData.valueVi
            let date = language === LANGUAGES.EN ?
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd,MM/DD')
                : moment.unix(+dataTime.date / 1000).format('dddd,DD/MM')
            return (
                <>
                    <div>{date} - {time}</div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state
        let { language, isShowAboutDoctor, dataTime } = this.props
        let nameEn = '', nameVi = ''
        if (dataProfile && dataProfile.positionData) {
            nameEn = `${dataProfile.firstName} ${dataProfile.lastName}, ${dataProfile.positionData.valueEn}`
            nameVi = `${dataProfile.lastName} ${dataProfile.firstName}, ${dataProfile.positionData.valueVi}`
        }
        console.log(dataProfile)
        return (

            <div className='profile-doctor-container'>
                <div className='intro'>
                    <div className='left' style={{
                        backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`
                    }}></div>
                    <div className='right'>
                        <div className='up'>
                            {language === LANGUAGES.EN ? nameEn : nameVi}
                        </div>
                        <div className='down'>
                            {isShowAboutDoctor === true
                                ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span>{dataProfile.Markdown.description} </span>
                                    }
                                </>
                                :
                                <>{this.renderTimeBooking(dataTime)}
                                    {dataProfile && dataProfile.Doctor_Info && dataProfile.Doctor_Info.addressClinic
                                        && <span>{dataProfile.Doctor_Info.addressClinic} </span>
                                    }
                                </>
                            }

                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
