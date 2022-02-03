import React from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"


const WelcomeComp = () => {

  const { dashboardLoading, dashboardData } = useSelector(state => ({
    dashboardLoading: state.Dashboard.dashboardLoading,
    dashboardData: state.Dashboard.dashboardData,
  }))
  console.log(dashboardData);

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary pb-2">Welcome Back!</h5>
                <p>{dashboardData.student_name}</p>
              </div>
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={dashboardData?.student_other_detail?.profilepic}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
            </Col>

            <Col sm="6">
              <div className="pt-5 mt-2">
                <Row>
                  <Col xs="12">
                    <h5 className="font-size-15">CV Status</h5>
                    <p className="text-muted mb-0">{dashboardData?.student_other_detail?.cv ? <sm className="text-success">Uploaded</sm> : <sm className="text-danger">Not Uploaded</sm>}</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
