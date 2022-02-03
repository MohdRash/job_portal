import { map } from "lodash"
import PropTypes from "prop-types"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Col, Card, CardBody, Spinner, Row } from "reactstrap"

const MiniWidget = () => {
  const { dashboardLoading, dashboardData } = useSelector(state => ({
    dashboardLoading: state.Dashboard.dashboardLoading,
    dashboardData: state.Dashboard.dashboardData,
  }))
  console.log(dashboardData);

  
  return (
    <React.Fragment>
      
        <Col sm="4">
          <Card>
            <CardBody>
              <Row className="mb-3">
                <Col>
                  <h5 className="border-bottom mb-2"><i className="bx bxs-graduation bg-light rounded me-2" style={{fontSize: '20px'}} /> University</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>{dashboardData?.student_other_detail?.university}</h5>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="4">
          <Card>
            <CardBody>
              <Row className="mb-3">
                <Col>
                  <h5 className="border-bottom mb-2"><i className="bx bxs-graduation bg-light rounded me-2" style={{fontSize: '20px'}} /> Contract Submited</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>{dashboardData?.student_other_detail?.contract_submit_date}</h5>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="4">
          <Card>
            <CardBody>
              <Row className="mb-3">
                <Col>
                  <h5 className="border-bottom mb-2"><i className="bx bxs-graduation bg-light rounded me-2" style={{fontSize: '20px'}} /> VISA Expiry Date</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>{dashboardData?.student_other_detail?.visa_expiry_date}</h5>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col> 
    </React.Fragment>
  )
}

MiniWidget.propTypes = {
  analatics: PropTypes.array,
}

export default MiniWidget
