import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getUsers,
  editUserService,
  deleteUserService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveInfoDoctorService,
  getAllSpecialty,
  getAllClinic
} from "../../services/userService";
import { toast } from "react-toastify";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});
export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

//gender
// export const fetchGenderRequest = () => ({
//     type: actionTypes.FETCH_GENDER_REQUEST
// })

export const fetchGenderRequest = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_REQUEST });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_GENDER_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_GENDER_FAILURE
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_GENDER_FAILURE
      });
      console.log("fetchGenderRequest error", e);
    }
  };
};




//role
export const fetchRoleRequest = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_REQUEST });
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailure());
      }
    } catch (e) {
      dispatch(fetchRoleFailure());
      console.log("fetchRoleRequest error", e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailure = () => ({
  type: actionTypes.FETCH_ROLE_FAILURE,
});

//position
export const fetchPositionRequest = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_REQUEST });
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailure());
      }
    } catch (e) {
      dispatch(fetchPositionFailure());
      console.log("fetchPositionRequest error", e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailure = () => ({
  type: actionTypes.FETCH_POSITION_FAILURE,
});

//fetch all user
export const fetchAllUserRequest = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailure());
      }
    } catch (e) {
      dispatch(fetchAllUserFailure());
      console.log("fetchPositionRequest error", e);
    }
  };
};

export const fetchAllUserSuccess = (userData) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: userData,
});

export const fetchAllUserFailure = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILURE,
});

//create user
export const createNewUserRequest = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create user succeed!");
        dispatch(createNewUserSuccess(res.data));
        dispatch(fetchAllUserRequest());
      } else {
        toast.error("Create user failed!");
        dispatch(createNewUserFailure());
      }
    } catch (e) {
      dispatch(createNewUserFailure());
      console.log("CreateNewUserRequest error", e);
    }
  };
};

export const createNewUserSuccess = (userData) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  data: userData,
});

export const createNewUserFailure = () => ({
  type: actionTypes.CREATE_USER_FAILURE,
});

//edit user
export const editUserRequest = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update user succeed!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserRequest());
      } else {
        toast.error("Update user failed!");
        dispatch(editUserFailure());
      }
    } catch (e) {
      toast.error("Update user failed!");
      dispatch(editUserFailure());
      console.log("EditUserRequest error", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailure = () => ({
  type: actionTypes.EDIT_USER_FAILURE,
});

//delete user
export const deleteUserRequest = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(user);
      if (res && res.errCode === 0) {
        toast.success("Delete user succeed!");
        dispatch(deleteUserSuccess(res.user));
        dispatch(fetchAllUserRequest());
      } else {
        toast.error("Delete user failed!");
        dispatch(deleteUserFailure());
      }
    } catch (e) {
      dispatch(deleteUserFailure());
      console.log("DeleteUserRequest error", e);
    }
  };
};

export const deleteUserSuccess = (userData) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailure = () => ({
  type: actionTypes.DELETE_USER_FAILURE,
});

//fetch top doctor
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILURE });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILURE });
      console.log("fetchTopDoctor error", e);
    }
  };
};

//fetch all doctor
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorsService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILURE });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILURE });
      console.log("fetchAllDoctors error", e);
    }
  };
};

//save info doctor
export const saveInfoDoctors = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveInfoDoctorService(data);
      console.log(res);
      if (res && res.errCode === 0) {
        toast.success("Save Information Doctor Succeed!");
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save Information Doctor Failed!");
        dispatch({ type: actionTypes.SAVE_INFO_DOCTOR_FAILURE });
      }
    } catch (e) {
      dispatch({ type: actionTypes.SAVE_INFO_DOCTOR_FAILURE });
      console.log("saveInfoDoctors error", e);
    }
  };
};

//fetch all schedule time
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FEATCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FEATCH_ALLCODE_SCHEDULE_TIME_FAILURE });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FEATCH_ALLCODE_SCHEDULE_TIME_FAILURE });
      console.log("fetchAllDoctors error", e);
    }
  };
};


export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      let resState = await getAllCodeService("STATE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic()
      if (resState && resState.errCode === 0
        && resPayment && resPayment.errCode === 0
        && resSpecialty && resSpecialty.errCode === 0
        && resClinic && resClinic.errCode === 0) {
        let data = {
          resState: resState.data,
          resPayment: resPayment.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data
        }
        dispatch({
          type: actionTypes.FETCH_REQUIRED_SUCCESS,
          data: data
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_REQUIRED_FAILURE
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_FAILURE
      });
      console.log("getRequiredDoctorInfo error", e);
    }
  };
};