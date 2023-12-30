
import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail,password: userPassword});
}

const getAllUsers = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
      

}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopTeacherHomeService = (limit) => {
    return axios.get(`/api/top-teacher-home?limit=${limit}`)
}

const getAllTeachers = () => {
    return axios.get(`/api/get-all-teachers`)
}

const saveDetailTeacherService = (data) => {
    return axios.post(`/api/save-infor-teachers`,data)
}

const getDetailInforTeacher = (inputId) => {
    return axios.get(`/api/get-detail-teacher-by-id?id=${inputId}`)
}

const saveBulkScheduleTeacher = (data) => {
    return axios.post(`/api/bulk-create-schedule`,data)
}
const getScheduleTeacherByDate = (teacherId, date) => {
    return axios.get(`/api/get-schedule-teacher-by-date?teacherId=${teacherId}&date=${date}`)
}
const getExtraInforTeacherById = (teacherId) => {
    return axios.get(`/api/get-extra-infor-teacher-by-id?teacherId=${teacherId}`)
}

const getProfileTeacherById = (teacherId) => {
    return axios.get(`/api/get-profile-teacher-by-id?teacherId=${teacherId}`)
}

const postStudentBookAppointment = (data) => {
    return axios.post('/api/student-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

export { handleLoginApi, getAllUsers,
        createNewUserService,deleteUserService,
        editUserService, getAllCodeService,
        getTopTeacherHomeService,getAllTeachers,
        saveDetailTeacherService,getDetailInforTeacher,
        saveBulkScheduleTeacher,getScheduleTeacherByDate,
        getExtraInforTeacherById,getProfileTeacherById,
        postStudentBookAppointment,postVerifyBookAppointment,createNewSpecialty} 

