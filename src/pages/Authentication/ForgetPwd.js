import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, Alert, Card, CardBody, Container } from "reactstrap"
import { Link, useHistory } from "react-router-dom"

//redux
import { useSelector, useDispatch } from "react-redux"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { userForgetPassword } from "store/actions"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"

const ForgetPwd = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [msg, setMsg] = useState("")
  const { forgetError, forgetSuccessMsg } = useSelector(state => ({
    forgetError: state.Login.forgetError,
    forgetSuccessMsg: state.Login.forgetSuccessMsg,
  }))

  function handleForgot(e, values) {
    setMsg(forgetSuccessMsg)
    dispatch(userForgetPassword(values))
  }
  const handler = () => {
    setMsg("")
    history.push("/login")
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>Forget Password | Loha</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Skote.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {msg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}

                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => handleForgot(e, v)}
                    >
                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          {msg ==
                            "Your new password has been sent to your email" ? (
                            <button
                              className="btn btn-success w-md"
                              type="submit"
                              onClick={handler}
                            >
                              Go back to Login
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary w-md "
                              type="submit"
                            >
                              Reset
                            </button>
                          )}
                        </Col>
                      </Row>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Loha. All Rights Reserved |
                  Developed by by  <a style={{ color: "#1781BB" }} href="https://osperb.com/">
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

export default ForgetPwd
