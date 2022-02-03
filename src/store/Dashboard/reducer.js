import {
  GET_DASHBOARDDATA,
  GET_DASHBOARDDATA_SUCCESS,
  GET_DASHBOARDDATA_FAIL,
  GET_MONTHLY_CHART,
  GET_MONTHLY_CHART_SUCCESS,
  GET_MONTHLY_CHART_FAIL,
  GET_YEARLY_CHART_SUCCESS,
  GET_YEARLY_CHART_FAIL,
  GET_YEARLY_CHART,
  GET_MONTHLY_YEAR_CHART,
  GET_MONTHLY_YEAR_CHART_SUCCESS,
  GET_MONTHLY_YEAR_CHART_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  monthlyData: [],
  monthYearData: [],
  yearlyData: [],
  error: {},
  loading: false,
  yearLoading: false,
  dashboardData: {},
  dashboardLoading: false,
}

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MONTHLY_CHART:
    case GET_DASHBOARDDATA:
      return {
        ...state,
        loading: true,
      }
    case GET_YEARLY_CHART:
    case GET_MONTHLY_YEAR_CHART:
      return {
        ...state,
        yearLoading: true,
      }

    case GET_YEARLY_CHART_SUCCESS:
      return {
        ...state,
        yearlyData: action.payload,
        yearLoading: false,
      }

    case GET_YEARLY_CHART_FAIL:
      return {
        ...state,
        error: action.payload,
        yearLoading: false,
      }

    case GET_MONTHLY_CHART_SUCCESS:
      return {
        ...state,
        monthlyData: action.payload,
        loading: false,
      }

    case GET_MONTHLY_CHART_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case GET_MONTHLY_YEAR_CHART_SUCCESS:
      return {
        ...state,
        monthYearData: action.payload,
        yearLoading: false,
      }

    case GET_MONTHLY_YEAR_CHART_FAIL:
      return {
        ...state,
        error: action.payload,
        yearLoading: false,
      }

    case GET_DASHBOARDDATA:
      return {
        ...state,
        dashboardLoading: true,
      }

    case GET_DASHBOARDDATA_SUCCESS:
      return {
        ...state,
        dashboardData: action.payload,
        dashboardLoading: false,
      }

    case GET_DASHBOARDDATA_FAIL:
      return {
        ...state,
        error: action.payload,
        dashboardLoading: false,
      }

    default:
      return state
  }
}

export default Dashboard
