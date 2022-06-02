import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailDoctorService } from "../../../services/userService";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      arrDoctors: [],
      hasData: false,

      arrPayments: [],
      arrState: [],
      arrSpecialty: [],
      arrClinic: [],
      selectedPayment: "",
      selectedState: "",
      selectedSpecialty: "",
      selectedClinic: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: ""
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequiredDoctorInfo();
  }

  buildDataSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === 'USERS') {
        inputData.map((item, index) => {
          let object = {};
          let labelEn = `${item.firstName} ${item.lastName}`;
          let labelVi = `${item.lastName} ${item.firstName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        })
      }
      if (type === 'STATE' || type === 'PAYMENT') {
        inputData.map((item, index) => {
          let object = {};
          let labelEn = `${item.valueEn}`;
          let labelVi = `${item.valueVi}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        })
      }
      if (type === 'SPECIALTY') {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        })
      }
      if (type === 'CLINIC') {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        })
      }
    }
    // console.log("result", result);
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataSelect(this.props.allDoctors, 'USERS');
      this.setState({
        arrDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataSelect(this.props.allDoctors, 'USERS');
      let dataPayment = this.buildDataSelect(this.props.allRequiredInfoDoctor.resPayment, 'PAYMENT')
      let dataSpecialty = this.buildDataSelect(this.props.allRequiredInfoDoctor.resSpecialty, 'SPECIALTY')
      let dataClinic = this.buildDataSelect(this.props.allRequiredInfoDoctor.resSpecialty, 'CLINIC')
      this.setState({
        arrDoctors: dataSelect,
        arrPayments: dataPayment,
        arrSpecialty: dataSpecialty,
        arrClinic: dataClinic,
      });
    }

    if (prevProps.allRequiredInfoDoctor !== this.props.allRequiredInfoDoctor) {
      let { resState, resPayment, resSpecialty, resClinic } = this.props.allRequiredInfoDoctor
      let dataState = this.buildDataSelect(resState, 'STATE')
      let dataPayment = this.buildDataSelect(resPayment, 'PAYMENT')
      let dataSpecialty = this.buildDataSelect(resSpecialty, 'SPECIALTY')
      let dataClinic = this.buildDataSelect(resClinic, 'CLINIC')
      // console.log('all required information: ', dataState,dataPayment ,dataSpecialty,dataClinic)
      this.setState({
        arrPayments: dataPayment,
        arrState: dataState,
        arrSpecialty: dataSpecialty,
        arrClinic: dataClinic,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
    // console.log("handleEditorChange", html, text);
  };
  handleSaveContent = () => {
    let { hasData } = this.state
    this.props.saveInfoDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPayment: this.state.selectedPayment.value,
      selectedState: this.state.selectedState.value,
      selectedSpecialty: this.state.selectedSpecialty.value,
      selectedClinic: this.state.selectedClinic.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
      specialtyId: this.state.selectedSpecialty.value,
    });
  };

  handleOnChangeText = (e, id) => {
    let stateCopy = { ...this.state }
    stateCopy[id] = e.target.value
    this.setState({
      ...stateCopy
    });
  };

  findItem = (arr, id) => {
    return arr.find(item => { return item && item.value === id })
  }

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor }, () => {
      //   console.log(`Doctor selected:`, this.state.selectedDoctor);
    });
    let { arrPayments, arrState, arrSpecialty, arrClinic } = this.state
    let res = await getDetailDoctorService(selectedDoctor.value)
    if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Doctor_Info) {
      let markdown = res.data.Markdown
      let Doctor_Info = res.data.Doctor_Info

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,

        addressClinic: Doctor_Info.addressClinic,
        nameClinic: Doctor_Info.nameClinic,
        note: Doctor_Info.note,
        paymentId: Doctor_Info.paymentId,
        stateId: Doctor_Info.stateId,
        specialtyId: Doctor_Info.specialtyId,
        clinicId: Doctor_Info.clinicId,


        selectedPayment: this.findItem(arrPayments, Doctor_Info.paymentId),
        selectedState: this.findItem(arrState, Doctor_Info.stateId),
        selectedSpecialty: this.findItem(arrSpecialty, Doctor_Info.specialtyId),
        selectedClinic: this.findItem(arrClinic, Doctor_Info.clinicId),

        hasData: true,
      })
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        nameClinic: '',
        addressClinic: '',
        note: '',
        selectedPayment: '',
        selectedState: '',
        selectedSpecialty: '',
        selectedClinic: '',
        hasData: false
      })
    }

  };

  handleChangeSelectInfoDoctor = async (selectedOption, name) => {
    let stateName = name.name
    let stateCopy = { ...this.state }
    stateCopy[stateName] = selectedOption
    this.setState({ ...stateCopy }, () => {
      // console.log(`selected:`, { ...stateCopy });
    });
  };

  render() {
    // console.log("check", this.state);
    let { hasData } = this.state
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-info">
          <div className="left form-group">
            <label><FormattedMessage id="admin.manage-doctor.select-doctor" /> </label>
            <Select
              placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.arrDoctors}
            />
          </div>
          <div className="right">
            <label> <FormattedMessage id="admin.manage-doctor.information" /> </label>
            <textarea
              className="form-control"
              onChange={(e) => this.handleOnChangeText(e, 'description')}
              value={this.state.description}
            ></textarea>
          </div>
        </div>

        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.clinic" /></label>
            <input className="form-control"
              onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
              value={this.state.nameClinic} />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
            <input className="form-control"
              onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}
              value={this.state.addressClinic} />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.state" /></label>
            <Select
              placeholder={<FormattedMessage id="admin.manage-doctor.state" />}
              value={this.state.selectedState}
              onChange={this.handleChangeSelectInfoDoctor}
              options={this.state.arrState}
              name="selectedState"
            />
          </div>

          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
            <Select
              placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectInfoDoctor}
              options={this.state.arrPayments}
              name={"selectedPayment"}
            />
          </div>

          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.note" /></label>
            <input className="form-control"
              onChange={(e) => this.handleOnChangeText(e, 'note')}
              value={this.state.note} />
          </div>
        </div>

        <div className="row">
          <div className="col-4 group-form">
            <label><FormattedMessage id="admin.manage-doctor.select-specialty" /></label>
            <Select
              value={this.state.selectedSpecialty}
              options={this.state.arrSpecialty}
              placeholder={<FormattedMessage id="admin.manage-doctor.select-specialty" />}
              onChange={this.handleChangeSelectInfoDoctor}
              name={'selectedSpecialty'}
            >
            </Select>
          </div>
          <div className="col-4 group-form">
            <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
            <Select
              value={this.state.selectedClinic}
              options={this.state.arrClinic}
              placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
              onChange={this.handleChangeSelectInfoDoctor}
              name={'selectedClinic'}
            >
            </Select>
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className="btn btn-primary save-content-doctor"
          onClick={() => this.handleSaveContent()}
        >
          {hasData === true ? <FormattedMessage id="admin.manage-doctor.edit" /> :
            <FormattedMessage id="admin.manage-doctor.save" />
          }

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.user.allDoctors,
    language: state.app.language,
    allRequiredInfoDoctor: state.user.allRequiredInfoDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctors(data)),
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
