import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, Col } from "reactstrap"

const MiniCards = props => {
  const { dashboardData } = useSelector(
    state => ({
      dashboardData: state.Dashboard.dashboardData,
    })
  )
  console.log(dashboardData);

  return (
    <>
      {dashboardData?.next_supervisor_available_day && (
        <Col lg={4}>
          <Link to="#">
            <Card className="mini-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap">
                  <div className="me-3">
                    <p className="text-muted mb-2">Next Free slot</p>
                    <h5 className="mb-0">
                      {dashboardData?.next_supervisor_available_day}
                    </h5>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="bx bxs-book-bookmark"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      )}

      {/* {supervisors?.count > 0 && (
        <Col lg={4}>
          <Link to="/supervisors">
            <Card className="blog-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap">
                  <div className="me-3">
                    <p className="text-muted mb-2">Supervisors</p>
                    <h5 className="mb-0">{supervisors?.count}</h5>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="bx bxs-note"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      )}
      {qltcheckers?.count > 0 && (
        <Col lg={4}>
          <Link to="/qualitycheckers">
            <Card className="blog-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap">
                  <div className="me-3">
                    <p className="text-muted mb-2">Quality Checkers</p>
                    <h5 className="mb-0">{qltcheckers?.count}</h5>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="bx bxs-message-square-dots"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      )} */}
    </>
  )
}

export default MiniCards
