import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Badge, Col, Row } from "reactstrap"

function SupervisorProfile() {
  const { userProfile } = useSelector(state => ({
    userProfile: state.Contacts.userProfile,
  }))

  const [toggle, setToggle] = useState(false)
  return (
    <>
      <Col lg="12" className="mt-4 align-self-center">
        <div className="text-lg-center mt-4 mt-lg-0">
          <Row>
            <Col xs="3"></Col>
            <Col xs="3">
              <div>
                <p className="text-muted text-truncate mb-2">Frames per Day</p>
                <h5 className="mb-0 text-info">{userProfile?.cols_per_day}</h5>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <p className="text-muted text-truncate mb-2">Cost per Frame</p>
                <h5 className="mb-0 text-info">{userProfile?.cost_per_col}</h5>
              </div>
            </Col>
            <Col xs="3">
              <div>
                <p className="text-muted mb-2">Available Balance</p>
                {!toggle && (
                  <Badge
                    style={{ cursor: "pointer" }}
                    className="font-size-12 badge-soft-warning p-2"
                    pill
                    onClick={() => setToggle(true)}
                  >
                    See Balance
                  </Badge>
                )}
                <h5 className="text-info" onClick={() => setToggle(false)}>
                  {toggle && <>{userProfile?.balance}</>}
                </h5>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  )
}

export default SupervisorProfile
