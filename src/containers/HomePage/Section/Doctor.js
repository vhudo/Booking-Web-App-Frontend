import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";


class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors,
            });
        }
    }

    handelViewDetailDoctor = (doctor) => {
        // console.log('check view information', doctor)

        // if (this.props.history) {
        //     this.props.history.push(`/detail-doctor/${doctor.id}`)
        // }
    };
    render() {
        // console.log('check props dortor top', this.props.topDoctors)
        let { arrDoctors, language } = this.state;

        return (
            <div className="section-share section-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Top-rated doctors</span>
                        <button className="btn-section">More</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrDoctors &&
                                arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = "";
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, "base64").toString(
                                            "binary"
                                        );
                                    }
                                    let nameEn = `${item.firstName} ${item.lastName}, ${item.positionData.valueEn}`;
                                    let nameVi = `${item.lastName} ${item.firstName}, ${item.positionData.valueVi}`;
                                    return (
                                        <div className="section-customize" key={index} onClick={() => this.handelViewDetailDoctor(item)}>
                                            <Link to={`/detail-doctor/${item.id}`}>
                                                <div className="border-customize">

                                                    <div className="outer-bg">
                                                        <div
                                                            className="img section-doctor"
                                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                                        ></div>
                                                    </div>
                                                    <div className="position text-center">
                                                        <div> {language === LANGUAGES.VI ? nameVi : nameEn} </div>
                                                        <div>Title</div>
                                                        <div>Location</div>

                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        topDoctors: state.user.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
