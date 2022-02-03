import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Col, Row } from "reactstrap"

//actions
import {
  getFinishedProduct,
  getProducts,
  getSchecduleEvents,
} from "store/actions"

//componets
import Calender from "./Calender"
import Transaction from "../Common/Transation"
import MiniWidget from "./mini-widget"

function SupervisorDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFinishedProduct("", ""))
    dispatch(getProducts())
    dispatch(getSchecduleEvents())
  }, [dispatch])

  return (
    <div>
      <Row>
        <Col lx="4" lg="4">
          <MiniWidget />
        </Col>
        <Col lx="4" lg="4"></Col>

        <Calender />
      </Row>
      <Row>
        <Transaction />
      </Row>
    </div>
  )
}

export default SupervisorDashboard
