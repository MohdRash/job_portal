import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap"

//actions
import { getOrders, getProducts } from "store/actions"

//componetns
import NewProducts from "./NewProducts"
import MiniWidget from "./mini-widget"
import { Link } from "react-router-dom"
import StudentHome from "./home"

function DealerDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div>
      <Row>
        <Col lx="12" lg="12">
          {/* <StudentHome /> */}
        </Col>
      </Row>
      <Row></Row>
    </div>
  )
}

export default DealerDashboard
