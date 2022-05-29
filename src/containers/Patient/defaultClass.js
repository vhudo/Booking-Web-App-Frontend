import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './defaultClass.scss'
import { LANGUAGES } from '../../../utils';

class defaultClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    render() {

        return (

            <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(defaultClass);
