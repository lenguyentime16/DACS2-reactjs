
import actionTypes from "./actionTypes";
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopTeacherHomeService, getAllTeachers, saveDetailTeacherService
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        }
        catch (e) {
            dispatch(fetchGenderFailed());
            console.log('error', e);
        }

    }
}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
})

export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        }
        catch (e) {
            dispatch(fetchPositionFailed());
            console.log('error', e);
        }

    }
}

export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        }
        catch (e) {
            dispatch(fetchRoleFailed());
            console.log('error', e);
        }

    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a user succeed!")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        }
        catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e);
        }

    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

export const fetchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("Fetch a user error!")
                dispatch(fetchAllUsersFailed());
            }
        }
        catch (e) {
            toast.error("Fetch a user error!")
            dispatch(fetchAllUsersFailed());
            console.log('error', e);
        }

    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete a user succeed!")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete a user error!")
                dispatch(saveUserFailed());
            }
        }
        catch (e) {
            toast.error("Delete a user error!")
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e);
        }

    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Updata a user succeed!")
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update a user error!")
                dispatch(editUserFailed());
            }
        }
        catch (e) {
            toast.error("Update a user error!")
            dispatch(editUserFailed());
            console.log('EditUserFailed error', e);
        }

    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})

export const fetchTopTeacher = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopTeacherHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_TEACHER_SUCCESS,
                    dataTeachers: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_TEACHER_FAILDED
                })
            }
        }

        catch (e) {
            console.log('FETCH_TOP_TEACHER_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_TEACHER_FAILDED
            })
        }

    }
}

export const fetchAllTeachers = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTeachers();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_TEACHER_SUCCESS,
                    dataTeach: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_TEACHER_FAILDED
                })
            }
        }

        catch (e) {
            console.log('FETCH_ALL_TEACHER_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_TEACHER_FAILDED
            })
        }

    }
}

export const saveDetailTeacher = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailTeacherService(data);
            if (res && res.errCode === 0) {
                toast.success("Save the user succeed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_TEACHER_SUCCESS,
                })
            } else {
                toast.error("Save the user error!");
                console.log(res);
                dispatch({
                    type: actionTypes.SAVE_DETAIL_TEACHER_FAILDED
                })
            }
        }

        catch (e) {
            toast.error("Save the user error!");
            console.log('SAVE_DETAIL_TEACHER_FAILDED', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_TEACHER_FAILDED
            })
        }

    }
}


export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED
                })
            }
        }

        catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED
            })
        }

    }
}

export const getRequiredTeacherInfor = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_TEACHER_INFOR_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data
                }
                dispatch(fetchRequiredTeacherInforSuccess(data));
            } else {
                dispatch(fetchRequiredTeacherInforFailed());
            }
        }
        catch (e) {
            dispatch(fetchRequiredTeacherInforFailed());
            console.log('error', e);
        }

    }
}


export const fetchRequiredTeacherInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_TEACHER_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredTeacherInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_TEACHER_INFOR_FAILDED
})

// let res1 =await getTopTeacherHomeService(3);