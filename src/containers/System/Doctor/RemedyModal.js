import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import { LANGUAGES } from '../../../utils';
import { CommonUtils } from '../../../utils'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='md'
                centered
            >
                <div className='modal-header'>
                    <h5 className='modal-title'>Send reciept succeed</h5>
                    <button type="button" className='close' aria-label='close'
                        onClick={closeRemedyModal}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>

                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Patient's Email</label>
                            <input className='form-control' type='email'
                                value={this.state.email}
                                onChange={(e) => this.handleOnChangeEmail(e)} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Choose File</label>
                            <input className='form-control-file' type='file'
                                onChange={(e) => this.handleOnChangeImage(e)} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => this.handleSendRemedy()}>Send </Button>{' '}
                    <Button color='secondary' onClick={closeRemedyModal}>Cancel </Button>
                </ModalFooter>

            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
