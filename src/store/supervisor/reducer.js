import {
  GET_SUPERVISORS,
  GET_SUPERVISOR_DETAIL,
  CREATE_SUPERVISOR,
  UPDATE_SUPERVISOR,
  DELETE_SUPERVISOR,
  GET_SUPERVISORS_SUCCESS,
  GET_SUPERVISORS_FAIL,
  GET_SUPERVISOR_DETAIL_SUCCESS,
  GET_SUPERVISOR_DETAIL_FAIL,
  CREATE_SUPERVISOR_SUCCESS,
  CREATE_SUPERVISOR_FAIL,
  UPDATE_SUPERVISOR_SUCCESS,
  UPDATE_SUPERVISOR_FAIL,
  DELETE_SUPERVISOR_SUCCESS,
  DELETE_SUPERVISOR_FAIL,
  GET_BALANCETRANSACTIONS,
  GET_BALANCETRANSACTIONS_SUCCESS,
  GET_BALANCETRANSACTIONS_FAIL,
  GET_SCHEDULEEVENTS_SUCCESS,
  GET_SCHEDULEEVENTS_FAIL,
  GET_SCHEDULEEVENTS,
  BALANCEWITHDRAW,
  BALANCEWITHDRAW_SUCCESS,
  BALANCEWITHDRAW_FAIL,
  GET_DAILY_WORK,
  UPDATE_DAILY_WORK,
  GET_DAILY_WORK_SUCCESS,
  GET_DAILY_WORK_FAIL,
  UPDATE_DAILY_WORK_SUCCESS,
  UPDATE_DAILY_WORK_FAIL,
  CREATE_DAILY_WORK_SUCCESS,
  CREATE_DAILY_WORK_FAIL,
  CREATE_DAILY_WORK,
  DELETE_DAILY_WORK_SUCCESS,
  DELETE_DAILY_WORK_FAIL,
  DELETE_DAILY_WORK,
} from "./actionTypes"

const INIT_STATE = {
  balanceTransaction: [],
  scheduleEvents: [],
  supervisors: [],
  dailyWorks: [],
  supervisorDetail: {
    id: "",
    cols_per_day: "",
    cost_per_col: "",
    account: {
      email: "",
      username: "",
      phone: "",
      first_name: "",
      last_name: "",
    },
    balance_transaction: {},
  },
  error: {},
  loading: false,
  trnLoading: false,
  scheduleLoading: false,
  createSupervisorerror: null,
  withdrawMsg: "",
  withdrawLOading: false,
  dailyWorksLoading: false,
}

const Supervisors = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SUPERVISORS:
    case GET_SUPERVISOR_DETAIL:
    case CREATE_SUPERVISOR:
    case UPDATE_SUPERVISOR:
    case DELETE_SUPERVISOR:
      return {
        ...state,
        loading: true,
      }

    case GET_SCHEDULEEVENTS:
      return {
        ...state,
        scheduleLoading: true,
      }
    case BALANCEWITHDRAW:
      return {
        ...state,
        withdrawLOading: true,
      }

    case BALANCEWITHDRAW_SUCCESS:
      return {
        ...state,
        withdrawMsg: action.payload,
        withdrawLOading: false,
      }

    case BALANCEWITHDRAW_FAIL:
      return {
        ...state,
        withdrawMsg: action.payload,
        withdrawLOading: false,
      }

    case GET_SCHEDULEEVENTS_SUCCESS:
      return {
        ...state,
        scheduleEvents: action.payload,
        scheduleLoading: false,
      }

    case GET_SCHEDULEEVENTS_FAIL:
      return {
        ...state,
        error: action.payload,
        scheduleLoading: false,
      }

    case GET_BALANCETRANSACTIONS:
      return {
        ...state,
        trnLoading: true,
      }

    case GET_BALANCETRANSACTIONS_SUCCESS:
      return {
        ...state,
        balanceTransaction: action.payload,
        trnLoading: false,
      }

    case GET_BALANCETRANSACTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        trnLoading: false,
      }

    case GET_SUPERVISORS_SUCCESS:
      return {
        ...state,
        supervisors: action.payload,
        loading: false,
      }

    case GET_SUPERVISORS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_SUPERVISOR_SUCCESS:
      return {
        ...state,
        supervisors: action.payload,
        createSupervisorerror: null,
        loading: false,
      }

    case CREATE_SUPERVISOR_FAIL:
      return {
        ...state,
        createSupervisorerror: action.payload,
        loading: false,
      }

    case GET_SUPERVISOR_DETAIL_SUCCESS:
      return {
        ...state,
        supervisorDetail: action.payload,
        loading: false,
        withdrawMsg: action.payload,
      }

    case GET_SUPERVISOR_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPDATE_SUPERVISOR_SUCCESS:
      return {
        ...state,
        supervisors: state.supervisors.map(supervisor =>
          supervisor.id.toString() === action.payload.id.toString()
            ? { supervisor, ...action.payload }
            : supervisor
        ),
        loading: false,
      }

    case UPDATE_SUPERVISOR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_SUPERVISOR_SUCCESS:
      return {
        ...state,
        supervisors: state.supervisors.filter(
          supervisor =>
            supervisor.id.toString() !== action.payload.id.toString()
        ),
        loading: false,
      }

    case DELETE_SUPERVISOR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case GET_DAILY_WORK:
    case UPDATE_DAILY_WORK:
    case CREATE_DAILY_WORK:
    case DELETE_DAILY_WORK:
      return {
        ...state,
        dailyWorksLoading: true,
      }
    case GET_DAILY_WORK_SUCCESS:
      return {
        ...state,
        dailyWorksLoading: false,
        dailyWorks: action.payload,
      }
    case GET_DAILY_WORK_FAIL:
      return {
        ...state,
        error: action.payload,
        dailyWorksLoading: false,
      }
    case UPDATE_DAILY_WORK_SUCCESS:
      return {
        ...state,
        dailyWorks: state.dailyWorks.map(dailyWork =>
          dailyWork.id.toString() === action.payload.id.toString()
            ? { dailyWork, ...action.payload }
            : dailyWork
        ),
        dailyWorksLoading: false,
      }

    case UPDATE_DAILY_WORK_FAIL:
      return {
        ...state,
        error: action.payload,
        dailyWorksLoading: false,
      }

    case CREATE_DAILY_WORK_SUCCESS:
      return {
        ...state,
        dailyWorks: state.dailyWorks.results.unshift(...action.payload),
        dailyWorksLoading: false,
      }

    case CREATE_DAILY_WORK_FAIL:
      return {
        ...state,
        error: action.payload,
        dailyWorksLoading: false,
      }
    case DELETE_DAILY_WORK_SUCCESS:
      return {
        ...state,
        results: {
          ...state.dailyWorks.results.filter(
            i => i.id.toString() !== action.payload.toString()
          ),
        },
        // dailyWorks: {
        //   ...state.dailyWorks.results.filter(
        //     i => i.id.toString() !== action.payload.toString()
        //   ),
        // },
        dailyWorksLoading: false,
      }

    case DELETE_DAILY_WORK_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Supervisors
