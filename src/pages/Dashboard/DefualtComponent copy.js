import React from "react"
import { Row, Col, Card } from "reactstrap"

//Import Image
import features from "../../assets/images/img-1.png"

const DefualtComponent = () => {
  return (
    <React.Fragment>
      <Card>
        <div>
          <Row>
            <Col lg="9" sm="8">
              <div className="p-4">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>Loha Factory Dashboard</p>

                <div className="text-muted">
                  <p className="mb-1">
                    <i className="mdi mdi-circle-medium align-middle text-primary me-1" />{" "}
                    You are in the Loah Factory Dashboard make sure you are in
                    Right place
                  </p>
                  <p className="mb-1">
                    <i className="mdi mdi-circle-medium align-middle text-primary me-1" />{" "}
                    You want to more Access please Contact to your Superior
                    Officer
                  </p>
                  <p className="mb-0">
                    <i className="mdi mdi-circle-medium align-middle text-primary me-1" />{" "}
                    There are no activities in this dashboard!
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="3" sm="4" className="align-self-center">
              <div>
                <img src={features} alt="" className="img-fluid d-block" />
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </React.Fragment>
  )
}

export default DefualtComponent
