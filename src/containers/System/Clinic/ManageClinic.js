import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss'
import { LANGUAGES } from '../../../utils';
import { toast } from 'react-toastify';
import _ from 'lodash';
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from '../../../utils'
import { createNewClinic } from '../../../services/userService'

const mdParser = new MarkdownIt

class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            contentHTML: "",
            contentMarkdown: "",
            address: '',
        }
    }

    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }
    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };
    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new Clinic succeed')
            this.setState({
                name: '',
                imageBase64: '',
                contentHTML: '',
                contentMarkdown: '',
                address: '',

            })
        } else {
            toast.error('something wrong')
            console.log('check res', res)
        }
    }

    render() {

        return (
            <div className='manage-clinic-container'>
                <div className='ms-title'>Manage Clinic</div>
                <div className='add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <label>Clinic's name</label>
                        <input
                            className="form-control"
                            type='text'
                            value={this.state.name}
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}
                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label>Clinic's Image</label>
                        <input
                            className='form-control-file'
                            type='file'
                            onChange={(e) => this.handleOnChangeImage(e)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Clinic's Address</label>
                        <input
                            className='form-control'
                            type='text'
                            value={this.state.address}
                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
                        />
                    </div>

                    <div className='col-12 '>
                        <MdEditor
                            style={{ height: "480px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>

                    <button
                        className="btn-save-clinic"
                        onClick={() => this.handleSaveNewClinic()}
                    >
                        {/* {hasData === true ? <FormattedMessage id="admin.manage-doctor.edit" /> :
                            <FormattedMessage id="admin.manage-doctor.save" />
                        } */}save

                    </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
