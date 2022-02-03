import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Media, Row, Spinner } from "reactstrap"

//Simple bar
import SimpleBar from "simplebar-react"
import { map } from "lodash"

//Import Images
import moment from "moment"

const PendingOrder = () => {
  const { dashboardData } = useSelector(
    state => ({
      dashboardData: state.Dashboard.dashboardData,
    })
  )
  console.log(dashboardData);

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <Row className="mb-5">
            <Col className="col-12">
              <h4 className="card-title"></h4>
              <sm hidden>ID: {dashboardData.id}</sm>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <sm>Address: {dashboardData?.student_other_detail?.address}</sm>
              <p>Phone No: {dashboardData?.student_other_detail?.phone}</p>
              <p>DOB: {dashboardData?.student_other_detail?.dob}</p>
            </Col>
          </Row>
            
            
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default PendingOrder
