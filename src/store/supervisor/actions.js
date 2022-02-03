import {
  GET_SUPERVISORS,
  GET_SUPERVISORS_SUCCESS,
  GET_SUPERVISORS_FAIL,
  GET_SUPERVISOR_DETAIL,
  GET_SUPERVISOR_DETAIL_SUCCESS,
  GET_SUPERVISOR_DETAIL_FAIL,
  CREATE_SUPERVISOR,
  CREATE_SUPERVISOR_SUCCESS,
  CREATE_SUPERVISOR_FAIL,
  UPDATE_SUPERVISOR,
  UPDATE_SUPERVISOR_SUCCESS,
  UPDATE_SUPERVISOR_FAIL,
  DELETE_SUPERVISOR,
  DELETE_SUPERVISOR_SUCCESS,
  DELETE_SUPERVISOR_FAIL,
  GET_BALANCETRANSACTIONS,
  GET_BALANCETRANSACTIONS_SUCCESS,
  GET_BALANCETRANSACTIONS_FAIL,
  GET_SCHEDULEEVENTS,
  GET_SCHEDULEEVENTS_SUCCESS,
  GET_SCHEDULEEVENTS_FAIL,
  BALANCEWITHDRAW,
  BALANCEWITHDRAW_SUCCESS,
  BALANCEWITHDRAW_FAIL,
  GET_DAILY_WORK,
  GET_DAILY_WORK_SUCCESS,
  UPDATE_DAILY_WORK,
  UPDATE_DAILY_WORK_SUCCESS,
  UPDATE_DAILY_WORK_FAIL,
  CREATE_DAILY_WORK,
  CREATE_DAILY_WORK_SUCCESS,
  CREATE_DAILY_WORK_FAIL,
  DELETE_DAILY_WORK,
  DELETE_DAILY_WORK_SUCCESS,
  DELETE_DAILY_WORK_FAIL,
} from "./actionTypes"

export const balanceWithdraw = amount => ({
  type: BALANCEWITHDRAW,
  payload: { amount },
})

export const balanceWithdrawSuccess = msg => ({
  type: BALANCEWITHDRAW_SUCCESS,
  payload: msg,
})

export const balanceWithdrawFail = error => ({
  type: BALANCEWITHDRAW_FAIL,
  payload: error,
})

export const getSchecduleEvents = (page, month) => ({
  type: GET_SCHEDULEEVENTS,
  payload: { page, month },
})

export const getSchecduleEventsSuccess = events => ({
  type: GET_SCHEDULEEVENTS_SUCCESS,
  payload: events,
})

export const getSchecduleEventsFail = error => ({
  type: GET_SCHEDULEEVENTS_FAIL,
  payload: error,
})

export const getBalancetransaction = page => ({
  type: GET_BALANCETRANSACTIONS,
  payload: { page },
})

export const getBalancetransactionSuccess = transactions => ({
  type: GET_BALANCETRANSACTIONS_SUCCESS,
  payload: transactions,
})
export const getBalancetransactionFail = error => ({
  type: GET_BALANCETRANSACTIONS_FAIL,
  payload: error,
})

export const getSupervisors = (searchText, page) => ({
  type: GET_SUPERVISORS,
  payload: { searchText, page },
})

export const getSupervisorsSuccess = supervisors => ({
  type: GET_SUPERVISORS_SUCCESS,
  payload: supervisors,
})
export const getSupervisorsFail = error => ({
  type: GET_SUPERVISORS_FAIL,
  payload: error,
})

export const getSupervisorDetail = (supervisorId, balPage, schedulepage) => ({
  type: GET_SUPERVISOR_DETAIL,
  payload: { supervisorId, balPage, schedulepage },
})

export const getSupervisorDetailSuccess = supervisorDetail => ({
  type: GET_SUPERVISOR_DETAIL_SUCCESS,
  payload: supervisorDetail,
})

export const getSupervisorDetailFail = error => ({
  type: GET_SUPERVISOR_DETAIL_FAIL,
  payload: error,
})

export const createSupervisor = (supervisor, history) => ({
  type: CREATE_SUPERVISOR,
  payload: { supervisor, history },
})

export const createSupervisorSuccess = supervisor => ({
  type: CREATE_SUPERVISOR_SUCCESS,
  payload: supervisor,
})

export const createSupervisorFail = error => ({
  type: CREATE_SUPERVISOR_FAIL,
  payload: error,
})

export const updateSupervisor = (supervisor, supervisorId, history) => ({
  type: UPDATE_SUPERVISOR,
  payload: { supervisor, supervisorId, history },
})

export const updateSupervisorSuccess = supervisor => ({
  type: UPDATE_SUPERVISOR_SUCCESS,
  payload: supervisor,
})

export const updateSupervisorFail = error => ({
  type: UPDATE_SUPERVISOR_FAIL,
  payload: error,
})

export const deleteSupervisor = (supervisorId, history) => ({
  type: DELETE_SUPERVISOR,
  payload: { supervisorId, history },
})

export const deleteSupervisorSuccess = supervisor => ({
  type: DELETE_SUPERVISOR_SUCCESS,
  payload: supervisor,
})

export const deleteSupervisorFail = error => ({
  type: DELETE_SUPERVISOR_FAIL,
  payload: error,
})

export const getDailyWorks = () => ({
  type: GET_DAILY_WORK,
})

export const getDailyWorksSuccess = works => ({
  type: GET_DAILY_WORK_SUCCESS,
  payload: works,
})

export const getDailyWorksFail = error => ({
  type: GET_DAILY_WORK_SUCCESS,
  payload: error,
})

export const updateDailyWork = data => ({
  type: UPDATE_DAILY_WORK,
  payload: data,
})

export const updateDailyWorkSuccess = data => ({
  type: UPDATE_DAILY_WORK_SUCCESS,
  payload: data,
})

export const updateDailyWorkFail = error => ({
  type: UPDATE_DAILY_WORK_FAIL,
  payload: error,
})

export const createDailyWork = data => ({
  type: CREATE_DAILY_WORK,
  payload: data,
})

export const createDailyWorkSuccess = data => ({
  type: CREATE_DAILY_WORK_SUCCESS,
  payload: data,
})

export const createDailyWorkFail = error => ({
  type: CREATE_DAILY_WORK_FAIL,
  payload: error,
})

export const deleteDailyWork = Id => ({
  type: DELETE_DAILY_WORK,
  payload: Id,
})

export const deleteDailyWorkSuccess = res => ({
  type: DELETE_DAILY_WORK_SUCCESS,
  payload: res,
})

export const deleteDailyWorkFail = error => ({
  type: DELETE_DAILY_WORK_FAIL,
  payload: error,
})
