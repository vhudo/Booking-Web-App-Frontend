import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  genders: [],
  isLoadingGender: false,
  roles: [],
  isLoadingRole: false,
  positions: [],
  isLoadingPosition: false,
  users: [],
  topDoctors: [],
  allDoctors: [],
  scheduleTime: [],
  allRequiredInfoDoctor: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    //login
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };

    //gender
    case actionTypes.FETCH_GENDER_REQUEST:
      state.genders = action.data;
      state.isLoadingGender = true;
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILURE:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    //role
    case actionTypes.FETCH_ROLE_REQUEST:
      state.roles = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILURE:
      state.roles = [];
      return {
        ...state,
      };

    //position
    case actionTypes.FETCH_POSITION_REQUEST:
      state.positions = action.data;
      state.isLoadingPosition = true;
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      state.isLoadingPosition = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILURE:
      state.isLoadingPosition = false;
      state.positions = [];
      return {
        ...state,
      };

    //user
    case actionTypes.FETCH_ALL_USER_REQUEST:
      // console.log("fire fetch user request: ", action);
      state.users = action.users;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILURE:
      state.users = [];
      return {
        ...state,
      };

    //top doctor

    case actionTypes.FETCH_TOP_DOCTOR_REQUEST:
      // console.log("fire fetch user request: ", action);
      state.topDoctors = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILURE:
      state.topDoctors = [];
      return {
        ...state,
      };

    //all doctor
    case actionTypes.FETCH_ALL_DOCTOR_REQUEST:
      // console.log("fire fetch user request: ", action);
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILURE:
      state.allDoctors = [];
      return {
        ...state,
      };

    //all time schedule
    case actionTypes.FEATCH_ALLCODE_SCHEDULE_TIME_REQUEST:
      // console.log("fire fetch user request: ", action);
      state.scheduleTime = action.dataTime;
      return {
        ...state,
      };

    case actionTypes.FEATCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.scheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FEATCH_ALLCODE_SCHEDULE_TIME_FAILURE:
      state.scheduleTime = [];
      return {
        ...state,
      };

    //all required information

    case actionTypes.FETCH_REQUIRED_SUCCESS:
      state.allRequiredInfoDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_FAILURE:
      state.allRequiredInfoDoctor = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default appReducer;
