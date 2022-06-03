import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl';
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, USER_ROLE } from "../../../utils";
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment'
import LoadingOverlay from 'react-loading-overlay'
import RemedyModal from './RemedyModal'


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentDate: moment(new Date()).startOf('day').valueOf,
            currentDate: new Date(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
            isShowSelectDoctor: false,
            selectedDoctor: '',
            arrDoctors: [],
        };
    }

    componentDidMount() {
        let { user } = this.props
        if (user && !_.isEmpty(user)) {
            let role = user.roleId
            if (role === USER_ROLE.ADMIN) {
                this.setState({
                    isShowSelectDoctor: true
                })
            }
            if (role === USER_ROLE.DOCTOR) {
                this.setState({
                    isShowSelectDoctor: false,
                })
                this.getDataPatient()
            }
        }
        this.props.fetchAllDoctors();
    }
    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate, selectedDoctor, isShowSelectDoctor } = this.state
        let formatedDate = new Date(currentDate).setHours(0, 0, 0, 0)
        let res = []
        if (isShowSelectDoctor === true) {
            res = await getAllPatientForDoctor({
                doctorId: selectedDoctor.value,
                date: formatedDate
            })

        } else {
            res = await getAllPatientForDoctor({
                doctorId: user.id,
                date: formatedDate
            })

        }
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }



    }
    buildDataSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.EN ? labelEn : labelVi;
                object.value = item.id;
                result.push(object);
            });
        }
        // console.log("result", result);
        return result;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataSelect(this.props.allDoctors);
            this.setState({
                arrDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataSelect(this.props.allDoctors);
            this.setState({
                arrDoctors: dataSelect,
            });
        }

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        }
        )
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, async () => {
            await this.getDataPatient()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            patientLastName: item.patientData.lastName,
            reason: item.reason,
            // date: item.date,
            doctorName: item.doctorDataPatient.firstName,
            nameClinic: item.doctorDataPatient.Doctor_Info.nameClinic
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
        // console.log('data', data)
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
            doctorName: dataModal.doctorName,
            reason: dataModal.reason,
            nameClinic: dataModal.nameClinic
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Remedy Succeed')
            this.closeRemedyModal()
            await this.getDataPatient()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Somethings wrong')
            console.log('error send remedy', res)
        }
    }
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, isShowSelectDoctor } = this.state
        let { language } = this.props
        // console.log('check state', this.state)
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='mp-container'>
                        <div className='mp-title'>
                            <FormattedMessage id="manage-patient.title" />
                        </div>
                        <div className='mp-body row'>
                            {isShowSelectDoctor && isShowSelectDoctor === true ?
                                <div className='col-4 form-group'>
                                    <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                    <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.arrDoctors}
                                    />
                                </div>
                                :
                                <div></div>
                            }

                            <div className='col-4 form-group'>
                                <label><FormattedMessage id="manage-patient.choose-date" /></label>
                                <DatePicker
                                    selected={this.state.currentDate}
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate}
                                // minDate={new Date()}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th> <FormattedMessage id="manage-patient.time" /></th>
                                            <th><FormattedMessage id="manage-patient.firstName" /></th>
                                            <th><FormattedMessage id="manage-patient.lastName" /></th>
                                            <th><FormattedMessage id="manage-patient.address" /></th>
                                            <th><FormattedMessage id="manage-patient.gender" /></th>
                                            <th><FormattedMessage id="manage-patient.action" /></th>
                                        </tr>


                                        {dataPatient && dataPatient.length > 0
                                            ? dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.EN
                                                    ? item.timeTypeDataPatient.valueEn
                                                    : item.timeTypeDataPatient.valueVi
                                                let gender = language === LANGUAGES.EN
                                                    ? item.patientData.genderData.valueEn
                                                    : item.patientData.genderData.valueVi

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.lastName}</td>
                                                        <td>{item.patientData.adress}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className='mp-btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >
                                                                <FormattedMessage id="manage-patient.confirm" />
                                                            </button>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan={7} style={{ textAlign: 'center' }}>
                                                    <FormattedMessage id="manage-patient.no-data" />
                                                </td>
                                            </tr>
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>

            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
        allDoctors: state.user.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
