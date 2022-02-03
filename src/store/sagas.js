import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import authRegSaga from "./auth/register/saga"
import LayoutSaga from "./layout/saga"
import contactsSaga from "./profile/saga"
import dealersSaga from "./dealers/saga"
import supervisorsSaga from "./supervisor/saga"
import storeItemsSaga from "./storeItem/saga"
import productsSaga from "./product/saga"
import ordersSaga from "./orders/saga"
import storemngrsSaga from "./storemanager/saga"
import qltcheckersSaga from "./qltchecker/saga"
import productionmngrsSaga from "./productionmngr/saga"
import finishedProdChartSaga from "./Dashboard/saga"
export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    fork(authRegSaga),
    fork(LayoutSaga),
    fork(contactsSaga),
    fork(dealersSaga),
    fork(supervisorsSaga),
    fork(storeItemsSaga),
    fork(productsSaga),
    fork(ordersSaga),
    fork(storemngrsSaga),
    fork(qltcheckersSaga),
    fork(productionmngrsSaga),
    fork(finishedProdChartSaga),
  ])
}
