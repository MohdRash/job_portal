import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/logo.svg"

const Register = props => {
  const dispatch = useDispatch()
  const [toggleShow, setToggleShow] = useState(false)

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.register,
    // registrationError: state.Account.registrationError,
    loading: state.register.loading,
  }))
  console.log(user);

  // handleValidSubmit
  const handleValidSubmit = values => {
    dispatch(registerUser(values))
  }

  // useEffect(() => {
  //   dispatch(apiError(""))
  // }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register User</title>
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
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Register Now</h5>
                        <p>We Wish You A Good Luck For Your Bright Future!</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
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
                      

                      <div className="mb-3">
                        <AvField
                          id="email"
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="username"
                          label="Username"
                          type="text"
                          required
                          placeholder="Enter username"
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="first_name"
                          label="First Name"
                          type="text"
                          required
                          placeholder="Enter First Name"
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="last_name"
                          label="Last Name"
                          type="text"
                          required
                          placeholder="Enter Last Name"
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
                          className="mt-1"
                          onChange={() => setToggleShow(!toggleShow)}
                        />
                        <label className="mx-2 ">Show password</label>
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password2"
                          label="Confirm Password"
                          type={`${toggleShow == true ? "text" : "password"}`}
                          required
                          placeholder="Confirm Password"
                          title="click to show passwoard"
                          className="position-relative"
                        />

                        <input
                          type="checkbox"
                          hidden
                          checked={toggleShow ? true : false}
                          className="mt-1"
                          onChange={() => setToggleShow(!toggleShow)}
                        />
                        <label hidden className="mx-2 ">Show password</label>
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                        
                      </div>

                    </AvForm>
                    <div className="mt-5 text-center">
                      <Link to="/verify" className="font-weight-medium text-primary">
                        Click To Verify Your OTP Now!
                      </Link>
                  </div>
                  </div>
                  
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Job Portal. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by <a rel="noreferrer" target='_blank' href='https://osperb.com'>Osperb</a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
