import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getUsers = (inputId) => {
  // return axios.get(`/api/get-user?id=${inputId}`)
  return axios.get("/api/get-user", {
    params: {
      id: inputId,
    },
  });
  // return axios.get('/api/get-user', { id: inputId })
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/update-user", inputData);
};

const getAllCodeService = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/home-top-doctor?limit=${limit}`);
};

const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveInfoDoctorService = (data) => {
  return axios.post("/api/save-info-doctor", data);
};

const getDetailDoctorService = (inputId) => {
  return axios.get(`/api/get-detail-doctor?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getscheduleDoctorByDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInfoDortorById = (doctorId) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDortorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
}

const getAllDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getAllClinic = () => {
  return axios.get(`/api/get-clinic`);
}

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

export {
  handleLoginApi,
  getUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService, saveInfoDoctorService, getDetailDoctorService,
  saveBulkScheduleDoctor, getscheduleDoctorByDate,
  getExtraInfoDortorById, getProfileDortorById,
  postBookAppointment, postVerifyBookAppointment,
  createNewSpecialty, getAllSpecialty, getAllDetailSpecialtyById,
  createNewClinic, getAllClinic, getAllDetailClinicById
};
