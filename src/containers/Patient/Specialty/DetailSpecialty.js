import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils'
import { getAllDetailSpecialtyById, getAllCodeService } from '../../../services/userService'

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            arrState: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })

            let resState = await getAllCodeService('STATE')
            if (res && res.errCode === 0
                && resState && resState.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                    let dataState = resState.data
                    if (dataState && dataState.length > 0) {
                        dataState.unshift({
                            createAt: null,
                            keyMap: 'ALL',
                            type: 'STATE',
                            valueEn: 'ALL',
                            valueVi: 'Toàn Quốc'
                        })
                    }
                    this.setState({
                        dataDetailSpecialty: res.data,
                        arrDoctorId: arrDoctorId,
                        arrState: resState.data ? resState.data : []
                    })
                }
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }
    handleOnChangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = e.target.value
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            })

            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                    this.setState({
                        dataDetailSpecialty: res.data,
                        arrDoctorId: arrDoctorId,
                    })
                }
            }

        }
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, arrState } = this.state
        let { language } = this.props
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            && <div
                                dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.contentHTML }}
                            ></div>}
                    </div>
                    <div className='search-sp-doctor'>
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {arrState && arrState.length > 0 && arrState.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                    </option>
                                )
                            })}
                        </select>

                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowAboutDoctor={true}
                                                isShowLinkDetail={true}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule doctorId={item} />
                                        </div>
                                        <div className='doctor-extra-info'>
                                            <DoctorExtraInfo doctorId={item} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
