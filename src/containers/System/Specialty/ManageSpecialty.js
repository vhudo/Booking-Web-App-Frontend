import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss'
import { toast } from 'react-toastify';
import _ from 'lodash';
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from '../../../utils'
import { createNewSpecialty } from '../../../services/userService'

const mdParser = new MarkdownIt

class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            contentHTML: "",
            contentMarkdown: "",
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
    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeed')
            this.setState({
                name: '',
                imageBase64: '',
                contentHTML: '',
                contentMarkdown: '',

            })
        } else {
            toast.error('something wrong')
            console.log('check res', res)
        }
    }

    render() {

        return (

            <div className='manage-specialty-container'>
                <div className='ms-title'>Manage Specialty</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Specialty's name</label>
                        <input
                            className="form-control"
                            type='text'
                            value={this.state.name}
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}
                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label>Specialty's Image</label>
                        <input
                            className='form-control-file'
                            type='file'
                            onChange={(e) => this.handleOnChangeImage(e)}
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
                        className="btn-save-specialty"
                        onClick={() => this.handleSaveNewSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
