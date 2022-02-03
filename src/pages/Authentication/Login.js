import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useEffect, useState } from "react"
import { withRouter, Link } from "react-router-dom"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo/loha_oa.png"

import { Notification } from "../../components/Common/Notification"

import "toastr/build/toastr.min.css"

const Login = ({ history }) => {
  const dispatch = useDispatch()
  const [toggleShow, setToggleShow] = useState(false)
  const { error, user, loading } = useSelector(state => ({
    error: state.Login.error,
    user: state.Login.user,
    loading: state.Login.loading,
  }))
  // handleValidSubmit
  const handleValidSubmit = values => {
    dispatch(loginUser(values, history))
  }

  useEffect(() => {
    dispatch(apiError(""))
    if (user) {
      Notification({
        type: "success",
        message: user?.response,
        title: "",
      })
    }

    if (user?.token) {
      history.push("/dashboard")
    }
  }, [user])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Loha </title>
      </MetaTags>

      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img src={logo} alt="" className="" height="20" />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(v)
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <AvField
                          name="username"
                          label="Username"
                          className="form-control"
                          placeholder="Enter username"
                          type="text"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          type={`${toggleShow == true ? "text" : "password"}`}
                          required
                          placeholder="Enter Password"
                          title="click to show passwoard"
                          className="position-relative"
                        />

                        <input
                          type="checkbox"
                          checked={toggleShow ? true : false}
                          className="mt-2"
                          onChange={() => setToggleShow(!toggleShow)}
                        />
                        <label className="mx-2 ">Show password</label>
                      </div>

                      <div>
                      <Link to="/register" className="text-muted">
                          dont have account? create now
                        </Link>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          {loading && (
                            <>
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                            </>
                          )}
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-3 text-center">
                <p>
                  © {new Date().getFullYear()} Loha. All Rights Reserved |
                  Developed by <a style={{ color: "#1781BB" }} href="https://osperb.com/">
                    Osperb
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
