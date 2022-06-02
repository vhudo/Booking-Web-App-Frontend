import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { getscheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailabelTime: [],
            isOpenBookingModel: false,
            dataScheduleTimeModal: {}

        }
    }

    async componentDidMount() {
        let { language } = this.props
        // console.log(moment(new Date()).format('dddd - DD/MM'))
        // console.log(moment(new Date()).locale('en').format('ddd - MM/DD'))
        let arrDays = this.getArrDays(language)
        if (this.props.doctorId) {
            let res = await getscheduleDoctorByDate(this.props.doctorId, arrDays[0].value)
            this.setState({
                allAvailabelTime: res.data ? res.data : []
            })
        }
        this.setState({
            allDays: arrDays
        })


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let arrDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: arrDays
            })
        }

        if (prevProps.doctorId !== this.props.doctorId) {
            let arrDays = this.getArrDays(this.props.language)
            let res = await getscheduleDoctorByDate(this.props.doctorId, arrDays[0].value)
            this.setState({
                allAvailabelTime: res.data ? res.data : []
            })
        }
    }

    upperCaseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    getArrDays = (language) => {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.EN) {
                if (i === 0) {
                    let mmDD = moment(new Date()).format('MM/DD')
                    let today = `Today - ${mmDD}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - MM/DD')
                }

            }
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    let label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.upperCaseFirstLetter(label)
                }

            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            arrDays.push(object)
        }
        return arrDays
    }

    handleOnchangeSelect = async (e) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId
            let date = e.target.value
            let res = await getscheduleDoctorByDate(doctorId, date)
            console.log('check res schedule', res)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailabelTime: res.data ? res.data : []
                })
            }

        }
    }

    handleClickTimeSchedule = (time) => {
        this.setState({
            isOpenBookingModel: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingMode = () => {
        this.setState({
            isOpenBookingModel: false
        })
    }
    render() {
        let { allDays, allAvailabelTime, isOpenBookingModel, dataScheduleTimeModal } = this.state
        let { language } = this.props
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(e) => this.handleOnchangeSelect(e)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}

                        </select>
                    </div>
                    <div className='all-availabel-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                            </i>
                        </div>
                        <div className='time-content'>
                            {allAvailabelTime && allAvailabelTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvailabelTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.EN ?
                                                item.timeTypeData.valueEn : item.timeTypeData.valueVi
                                            return (
                                                <button
                                                    key={index}
                                                    className={language === LANGUAGES.EN ? 'btn-en' : 'btn-vi'}
                                                    onClick={() => this.handleClickTimeSchedule(item)}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className='far fa-hand-point-up'></i>
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </>
                                :
                                <div className='no-schedule'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenBookingModel}
                    closeModal={this.closeBookingMode}
                    dataTime={dataScheduleTimeModal}
                />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
