import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor'
import _ from 'lodash'
import Select from "react-select";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import DatePicker from '../../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import { postBookAppointment } from '../../../../services/userService';
import moment from 'moment';



class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phoneNumber: '',
            reason: '',
            DOB: '',
            doctorId: '',
            genders: '',
            selectedGender: '',
            timeType: ''
        }
    }

    async componentDidMount() {
        this.props.getGenders()
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }
    buildDataGender = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = language === LANGUAGES.EN ? item.valueEn : item.valueVi;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        // console.log("result", result);
        return result;
    };

    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            DOB: date[0]
        })
    }

    handleOnChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.EN ? dataTime.timeTypeData.valueEn : dataTime.timeTypeData.valueVi
            let date = language === LANGUAGES.EN ?
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd,MM/DD')
                : moment.unix(+dataTime.date / 1000).format('dddd,DD/MM')
            return `${date} at ${time}`
        }
        return <></>
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.EN ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
                : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
            return name
        }
        return <></>
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.DOB).getTime()
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)
        let nameClinic = this.props.dataTime.doctorData.Doctor_Info.nameClinic
        let addressClinic = this.props.dataTime.doctorData.Doctor_Info.addressClinic
        let res = await postBookAppointment({
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            reason: this.state.reason,
            date: date,
            doctorId: this.state.doctorId,
            selectedgender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
            nameClinic: nameClinic,
            addressClinic: addressClinic
        })
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment succeed")
            this.props.closeModal()
        }
        else {
            toast.error("Booking a new appointment error")
        }
    }

    render() {
        let { isOpenModal, closeModal, dataTime } = this.props
        let doctorId = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        // console.log('data time: ', dataTime)
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span
                            className='right'
                            onClick={closeModal}
                        ><i className='fas fa-time'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowAboutDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.name" /></label>
                                <input
                                    className='form-control'
                                    value={this.state.name}
                                    onChange={(e) => this.handleOnChangeInput(e, 'name')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.DOB" /></label>
                                <DatePicker
                                    className='form-control'
                                    value={this.state.DOB}
                                    onChange={this.handleOnChangeDatePicker}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input
                                    className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input
                                    className='form-control'
                                    value={this.state.reason}
                                    onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group' >
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>

                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.genders}
                                />


                                {/* </label> */}
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button
                            className='btn btn-success'
                            onClick={() => this.handleConfirmBooking()}
                        ><FormattedMessage id="patient.booking-modal.btnConfirm" /></button>
                        <button
                            className='btn btn-danger'
                            onClick={closeModal}
                        ><FormattedMessage id="patient.booking-modal.btnCancel" /></button>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.user.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderRequest())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
