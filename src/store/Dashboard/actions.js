import {
  GET_DASHBOARDDATA,
  GET_DASHBOARDDATA_SUCCESS,
  GET_DASHBOARDDATA_FAIL,
  GET_MONTHLY_CHART,
  GET_MONTHLY_CHART_SUCCESS,
  GET_MONTHLY_CHART_FAIL,
  GET_YEARLY_CHART,
  GET_YEARLY_CHART_SUCCESS,
  GET_YEARLY_CHART_FAIL,
  GET_MONTHLY_YEAR_CHART,
  GET_MONTHLY_YEAR_CHART_SUCCESS,
  GET_MONTHLY_YEAR_CHART_FAIL,
} from "./actionTypes"

export const getMonthlyYearChart = date => ({
  type: GET_MONTHLY_YEAR_CHART,
  payload: { date },
})

export const getMonthlyYearChartSuccess = chartData => ({
  type: GET_MONTHLY_YEAR_CHART_SUCCESS,
  payload: chartData,
})
export const getMonthlyYearChartFail = error => ({
  type: GET_MONTHLY_YEAR_CHART_FAIL,
  payload: error,
})

export const getYearlyChart = date => ({
  type: GET_YEARLY_CHART,
  payload: { date },
})

export const getYearlyChartSuccess = chartData => ({
  type: GET_YEARLY_CHART_SUCCESS,
  payload: chartData,
})
export const getYearlyChartFail = error => ({
  type: GET_YEARLY_CHART_FAIL,
  payload: error,
})

export const getMonthlyChart = date => ({
  type: GET_MONTHLY_CHART,
  payload: { date },
})

export const getMonthlyChartSuccess = chartData => ({
  type: GET_MONTHLY_CHART_SUCCESS,
  payload: chartData,
})
export const getMonthlyChartFail = error => ({
  type: GET_MONTHLY_CHART_FAIL,
  payload: error,
})

export const getDashboardData = () => ({
  type: GET_DASHBOARDDATA,
})

export const getDashboardDataSuccess = dashboardData => ({
  type: GET_DASHBOARDDATA_SUCCESS,
  payload: dashboardData,
})
export const getDashboardDataFail = error => ({
  type: GET_DASHBOARDDATA_FAIL,
  payload: error,
})
