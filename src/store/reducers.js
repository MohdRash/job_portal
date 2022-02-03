import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"

// Authentication
import register from "./auth/register/reducer"

//contacts
import Contacts from "./profile/reducer"

//Dealer
import Dealers from "./dealers/reducer"

//supervisor
import Supervisors from "./supervisor/reducer"

//store item
import StoreItems from "./storeItem/reducer"

//product
import Products from "./product/reducer"

//orders
import Orders from "./orders/reducer"

//storemngr
import Storemngrs from "./storemanager/reducer"

//qualitychecker
import Qltcheckers from "./qltchecker/reducer"

//prodcution manager
import Productionmngrs from "./productionmngr/reducer"

//finished Prod Chart
import Dashboard from "./Dashboard/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  register,
  Contacts,
  Dealers,
  Storemngrs,
  Supervisors,
  Qltcheckers,
  StoreItems,
  Products,
  Orders,
  Productionmngrs,
  Dashboard,
})

export default rootReducer
