import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_DASHBOARDDATA,
  GET_MONTHLY_CHART,
  GET_MONTHLY_YEAR_CHART,
  GET_YEARLY_CHART,
} from "./actionTypes"
import {
  getDashboardDataSuccess,
  getDashboardDataFail,
  getMonthlyChartSuccess,
  getMonthlyChartFail,
  getYearlyChartSuccess,
  getYearlyChartFail,
  getMonthlyYearChartSuccess,
  getMonthlyYearChartFail,
} from "./actions"
import { get } from "helpers/api_methods"
import moment from "moment"

const getMonthlyChartAPi = ({ date }) => {
  return get(
    `/supervisor/graph-month/?date=${
      date ? date : moment(Date.now()).format("YYYY-MM")
    }`
  )
}
const getYearlyChartAPi = ({ date }) => {
  return get(
    `/supervisor/yearly-revenue-graph/?date=${
      date ? date : moment(Date.now()).format("YYYY")
    }`
  )
}

const getMonthlyYearChartAPi = ({ date }) => {
  return get(
    `/supervisor/graph-year/?date=${
      date ? date : moment(Date.now()).format("YYYY")
    }`
  )
}

function* fetchMonthlyYearChart({ payload }) {
  try {
    const response = yield call(getMonthlyYearChartAPi, payload)
    yield put(getMonthlyYearChartSuccess(response))
  } catch (error) {
    yield put(getMonthlyYearChartFail(error))
  }
}

function* fetchYearlyChart({ payload }) {
  try {
    const response = yield call(getYearlyChartAPi, payload)
    yield put(getYearlyChartSuccess(response))
  } catch (error) {
    yield put(getYearlyChartFail(error))
  }
}

function* fetchMonthlyChart({ payload }) {
  try {
    const response = yield call(getMonthlyChartAPi, payload)
    yield put(getMonthlyChartSuccess(response))
  } catch (error) {
    yield put(getMonthlyChartFail(error))
  }
}

const getDashboardDataAPi = () => {
  // return get("/supervisor/dashboard-data/")
  return get("/main/student-view/cf8aa55a-1fe3-4f31-8686-f29e796bb38e/")
}


function* fetchDashboardData() {
  try {
    const response = yield call(getDashboardDataAPi)
    yield put(getDashboardDataSuccess(response))
  } catch (error) {
    yield put(getDashboardDataFail(error))
  }
}

function* finishedProdChartSaga() {
  yield takeEvery(GET_DASHBOARDDATA, fetchDashboardData)
  yield takeEvery(GET_MONTHLY_CHART, fetchMonthlyChart)
  yield takeEvery(GET_YEARLY_CHART, fetchYearlyChart)
  yield takeEvery(GET_MONTHLY_YEAR_CHART, fetchMonthlyYearChart)
}

export default finishedProdChartSaga
