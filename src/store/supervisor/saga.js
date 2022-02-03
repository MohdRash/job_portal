import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_SUPERVISORS,
  GET_SUPERVISOR_DETAIL,
  CREATE_SUPERVISOR,
  UPDATE_SUPERVISOR,
  DELETE_SUPERVISOR,
  GET_BALANCETRANSACTIONS,
  GET_SCHEDULEEVENTS,
  BALANCEWITHDRAW,
  GET_DAILY_WORK,
  UPDATE_DAILY_WORK,
  CREATE_DAILY_WORK,
  DELETE_DAILY_WORK,
} from "./actionTypes"
import {
  getSupervisorsSuccess,
  getSupervisorsFail,
  getSupervisorDetailSuccess,
  getSupervisorDetailFail,
  createSupervisorSuccess,
  createSupervisorFail,
  updateSupervisorSuccess,
  updateSupervisorFail,
  deleteSupervisorSuccess,
  deleteSupervisorFail,
  getBalancetransactionSuccess,
  getBalancetransactionFail,
  getSchecduleEventsSuccess,
  getSchecduleEventsFail,
  balanceWithdrawSuccess,
  balanceWithdrawFail,
  getDailyWorksSuccess,
  getDailyWorksFail,
  updateDailyWorkSuccess,
  updateDailyWorkFail,
  createDailyWorkSuccess,
  createDailyWorkFail,
  deleteDailyWorkSuccess,
  deleteDailyWorkFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"
import moment from "moment"

function getDailyWorksApi() {
  return get("/supervisor/supervisor_daily_work/")
}
function getScheduleEventsApi({ page, month }) {
  if (month) {
    return get(`/supervisor/calender-data/?date=${month ? month : moment(Date.now()).format("MMMM-YYYY")}`)
  }
  if (page) {
    return get(`/supervisor/supervisor_schedule_item/?page=${page ? page : 1}`)
  }
}

function getTransactionAPi({ page }) {
  return get(`/supervisor/balancetransactions/?page=${page ? page : 1}`)
}

function getSupervisorsAPi({ searchText, page }) {
  if (searchText) {
    return get(`/supervisor/supervisor/?search=${searchText && searchText}`)
  } else {
    return get(`/supervisor/supervisor/?page=${page ? page : 1}`)
  }
}
const getSupervisorDetailsAPi = ({ supervisorId, balPage, schedulepage }) => {
  if (balPage) {
    return get(`/supervisor/supervisor/${supervisorId}/?bal_page=${balPage ? balPage : 1}`)
  } else {
    return get(`/supervisor/supervisor/${supervisorId}/?schedulepage=${schedulepage ? schedulepage : 1}`)
  }
}
const createSupervisorApi = ({ supervisor }) => {
  return post("/supervisor/supervisor/", supervisor)
}
const updateSupervisorApi = ({ supervisorId, supervisor }) => {
  return ApiPut(`/supervisor/supervisor/${supervisorId}/`, supervisor)
}
const deleteSupervisorApi = ({ supervisorId }) => {
  return del(`/supervisor/supervisor/${supervisorId}/`)
}
const withdrawBalanceApi = ({ amount }) => {
  return post("/supervisor/balancetransactions/", amount)
}
const updateDailyWorkApi = payload => {
  return ApiPut(
    `/supervisor/supervisor_daily_work/${payload.supervisor}/`,
    payload
  )
}
const createDailyWorkApi = (data) => {
  return post("/supervisor/supervisor_daily_work/", data)
}
const deleteDailyWorkApi = Id => {
  return del(`/supervisor/supervisor_daily_work/${Id}/`)
}

function* fetchDailyWorks() {
  try {
    const response = yield call(getDailyWorksApi)
    yield put(getDailyWorksSuccess(response))
  } catch (error) {
    yield put(getDailyWorksFail(error))
  }
}

function* onUpdateDailyWorks({ payload }) {
  try {
    const response = yield call(updateDailyWorkApi, payload)
    yield put(updateDailyWorkSuccess(response))
  } catch (error) {
    yield put(updateDailyWorkFail(error))
  }
}

function* onCreateDailyWorks({ payload }) {
  try {
    const response = yield call(createDailyWorkApi, payload)
    yield put(createDailyWorkSuccess(response))
  } catch (error) {
    yield put(createDailyWorkFail(error))
  }
}
function* onDeleteDailyWorks({ payload }) {
  try {
    const response = yield call(deleteDailyWorkApi, payload)
    yield put(deleteDailyWorkSuccess({ ...response, payload }))
  } catch (error) {
    yield put(deleteDailyWorkFail(error))
  }
}

function* onWithdrawBalance({ payload }) {
  try {
    const response = yield call(withdrawBalanceApi, payload)
    yield put(balanceWithdrawSuccess(response))
  } catch (error) {
    yield put(balanceWithdrawFail(error))
  }
}

function* fetchScheduleEvents({ payload }) {
  try {
    const response = yield call(getScheduleEventsApi, payload)
    yield put(getSchecduleEventsSuccess(response))
  } catch (error) {
    yield put(getSchecduleEventsFail(error))
  }
}

function* fetchBalancetransaction({ payload }) {
  try {
    const response = yield call(getTransactionAPi, payload)
    yield put(getBalancetransactionSuccess(response))
  } catch (error) {
    yield put(getBalancetransactionFail(error))
  }
}

function* fetchSupervisors({ payload }) {
  try {
    const response = yield call(getSupervisorsAPi, payload)
    yield put(getSupervisorsSuccess(response))
  } catch (error) {
    yield put(getSupervisorsFail(error))
  }
}

function* fetchSupervisorDetail({ payload }) {
  try {
    const response = yield call(getSupervisorDetailsAPi, payload)
    yield put(getSupervisorDetailSuccess(response))
  } catch (error) {
    yield put(getSupervisorDetailFail(error))
  }
}
function* onCreateSupervisor({ payload }) {
  try {
    const response = yield call(createSupervisorApi, payload)
    yield put(createSupervisorSuccess(response))
    payload.history.push("/supervisors")

  } catch (error) {
    yield put(createSupervisorFail(error))
  }
}

function* onUpdateSupervisor({ payload }) {
  try {
    const response = yield call(updateSupervisorApi, payload)
    yield put(updateSupervisorSuccess(response))
    payload.history.push("/supervisors")
  } catch (error) {
    yield put(updateSupervisorFail(error))
  }
}

function* onDeleteSupervisor({ payload }) {
  try {
    const response = yield call(deleteSupervisorApi, payload)
    yield put(deleteSupervisorSuccess(response))
    payload.history.push("/supervisors")
  } catch (error) {
    yield put(deleteSupervisorFail(error))
  }
}

function* supervisorsSaga() {
  yield takeEvery(GET_SUPERVISORS, fetchSupervisors)
  yield takeEvery(GET_SUPERVISOR_DETAIL, fetchSupervisorDetail)
  yield takeEvery(CREATE_SUPERVISOR, onCreateSupervisor)
  yield takeEvery(UPDATE_SUPERVISOR, onUpdateSupervisor)
  yield takeEvery(DELETE_SUPERVISOR, onDeleteSupervisor)
  yield takeEvery(GET_BALANCETRANSACTIONS, fetchBalancetransaction)
  yield takeEvery(GET_SCHEDULEEVENTS, fetchScheduleEvents)
  yield takeEvery(BALANCEWITHDRAW, onWithdrawBalance)
  yield takeEvery(GET_DAILY_WORK, fetchDailyWorks)
  yield takeEvery(UPDATE_DAILY_WORK, onUpdateDailyWorks)
  yield takeEvery(CREATE_DAILY_WORK, onCreateDailyWorks)
  yield takeEvery(DELETE_DAILY_WORK, onDeleteDailyWorks)
}

export default supervisorsSaga
