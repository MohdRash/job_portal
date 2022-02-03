import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Transaction from "pages/Dashboard/Common/Transation"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Media,
  Button,
  Spinner,
} from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { getUserProfile, updateUserPass } from "../../store/profile/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "assets/images/logo/user.png"
import SupervisorProfile from "./SupervisorProfile"

const UserProfile = props => {
  const dispatch = useDispatch()

  const [toggle, setToggle] = useState(false)
  const [transaction, setTransaction] = useState(false)
  const { userProfile, loading } = useSelector(state => ({
    userProfile: state.Contacts.userProfile,
    loading: state.Contacts.loading,
  }))

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  function handleValidSubmit(event, values) {
    dispatch(updateUserPass(values))
    setToggle(false)
  }
  const Role = sessionStorage.getItem("role")

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Career Portal</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumb title="Career Portal" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Media>
                    <div className="ms-0 ">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>

                    <Media body className="align-self-center px-3">
                      {loading ? (
                        <>
                          <Spinner type="grow" color="secondary" />
                        </>
                      ) : (
                        <div className="text-muted ">
                          <h5>{userProfile?.username}</h5>
                          <p className="mb-1">{userProfile?.role}</p>
                          <p className="mb-1">{userProfile?.email}</p>
                          <p className="mb-0">{userProfile?.phone}</p>
                        </div>
                      )}
                    </Media>
                  </Media>
                  {Role == "supervisor" && <SupervisorProfile />}

                  <Col sm="4" xs="6">
                    <div className="mt-4">
                      <Button
                        className={`btn btn-dark ${
                          loading && "disabled"
                        } btn-m mx-2`}
                        onClick={() => setToggle(!toggle)}
                      >
                        {toggle ? "Hide Edit" : " Edit"}
                        <i
                          className={`mdi  ms-1 bx-fade-right mdi-arrow-${
                            toggle ? "down" : "right"
                          } `}
                        />
                      </Button>
                      {Role == "supervisor" && (
                        <Button
                          className={`btn btn-success
                           ${loading && "disabled"} btn-m mx-2`}
                          onClick={() => setTransaction(!transaction)}
                        >
                          {transaction
                            ? "Hide Transaction Table"
                            : "See All Transaction"}
                          <i
                            className={`mdi  ms-1 bx-fade-right mdi-arrow-${
                              transaction ? "down" : "right"
                            } `}
                          />
                        </Button>
                      )}
                    </div>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {transaction && <Transaction />}

          {toggle && (
            <>
              <h4 className="card-title mb-4">Update Password</h4>

              <Card>
                <CardBody>
                  <AvForm
                    className="form-horizontal"
                    onValidSubmit={(e, v) => {
                      handleValidSubmit(e, v)
                    }}
                  >
                    <div className="form-group">
                      <AvField
                        name="old_password"
                        label="Old Password"
                        className="form-control mb-3"
                        placeholder="Enter Old Password"
                        type="text"
                      />
                      <AvField
                        name="new_password"
                        label="New Password"
                        className="form-control mb-3"
                        placeholder="Enter New Password "
                        type="text"
                        required
                      />
                      <AvField
                        name="confirm_new_password"
                        label="New Password"
                        className="form-control"
                        placeholder="Confirm your Password "
                        type="text"
                        required
                      />
                    </div>
                    <div className="text-center mt-4">
                      <Button type="submit" color="danger">
                        Update Your Password
                      </Button>
                    </div>
                  </AvForm>
                </CardBody>
              </Card>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
