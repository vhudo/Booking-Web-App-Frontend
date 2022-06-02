import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils'
import { getAllDetailClinicById, getAllCodeService } from '../../../services/userService'

class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getAllDetailClinicById({
                id: id,
            })

            let resState = await getAllCodeService('STATE')
            if (res && res.errCode === 0
                && resState && resState.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }

                    this.setState({
                        dataDetailClinic: res.data,
                        arrDoctorId: arrDoctorId,

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
            let res = await getAllDetailClinicById({
                id: id,
            })

            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                    this.setState({
                        dataDetailClinic: res.data,
                        arrDoctorId: arrDoctorId,
                    })
                }
            }

        }
    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state
        let { language } = this.props
        return (
            <div className='detail-location-container'>
                <HomeHeader />
                <div className='detail-location-body'>
                    <div className='description-location'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <>
                                <div>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.contentHTML }}></div>

                            </>
                        }
                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dl-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowAboutDoctor={true}
                                                isShowLinkDetail={true}
                                            />
                                        </div>
                                    </div>
                                    <div className='dl-right'>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
