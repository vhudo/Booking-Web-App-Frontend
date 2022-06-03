import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, USER_ROLE } from "../../../utils";
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
            selectedDoctor: "",
            currentDate: new Date(),
            scheduleTime: [],
            isShowSelectDoctor: false
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
        let { userInfo } = this.props
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.ADMIN) {
                this.setState({
                    isShowSelectDoctor: true
                })
            }
            if (role === USER_ROLE.DOCTOR) {
                this.setState({
                    isShowSelectDoctor: false
                })
            }
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
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                scheduleTime: data,
            });
        }

    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
    }
    handleDateChange = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { scheduleTime } = this.state
        if (scheduleTime && scheduleTime.length > 0) {
            scheduleTime = scheduleTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected
                return item
            })
        }
        this.setState({ scheduleTime, });
    }

    handleSaveSchedule = async () => {
        let { scheduleTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (!currentDate) {
            toast.error("Invalid Date!")
            return
        }
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid Select Doctor!")
            return
        }

        let FormatedDate = new Date(currentDate).setHours(0, 0, 0, 0)
        if (scheduleTime && scheduleTime.length > 0) {
            let selectedTime = scheduleTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = FormatedDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                })
            } else {
                toast.error("Invalid Select Time!")
                return
            }
        }


        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            FormatedDate: FormatedDate,
        })
        if (res && res.errCode === 0) {
            toast.success("Save succeed!")
        }
        else {
            toast.error("Save Fail!")
            console.log('error', res)
        }
    }
    render() {
        let { scheduleTime, isShowSelectDoctor } = this.state
        let { language } = this.props
        // console.log('check state', this.state)
        // console.log('check props', this.props)
        return (
            <div className='m-s-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
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
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                selected={this.state.currentDate}
                                // onSelect={handleDateSelect} //when day is clicked
                                onChange={this.handleDateChange}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour'>
                            {scheduleTime && scheduleTime.length > 0
                                && scheduleTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                        </button>
                                    )
                                })}
                        </div>
                        <button
                            className='btn btn-primary mt-2'
                            onClick={() => this.handleSaveSchedule()}
                        >
                            <FormattedMessage id="manage-schedule.save" />
                        </button>

                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.user.allDoctors,
        language: state.app.language,
        allScheduleTime: state.user.scheduleTime,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
