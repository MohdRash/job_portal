import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"
import OTPInput, { ResendOTP } from "otp-input-react";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { registerOtp } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/logo.svg"

const Verify = props => {
  const dispatch = useDispatch()
  const [toggleShow, setToggleShow] = useState(false)
  const [OTP, setOTP] = useState("");

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.register,
    // registrationError: state.Account.registrationError,
    loading: state.register.loading,
  }))
  console.log(user);

  console.log("user");

  // handleValidSubmit
  const handleValidSubmit = values => {
    console.log(values);
    values.otp = parseFloat(values.otp)
    dispatch(registerOtp(values))
  }

  // useEffect(() => {
  //   dispatch(apiError(""))
  // }, [])
  const otp_verification = sessionStorage.getItem("otp_verification")
  console.log("otp_verification");
  console.log(otp_verification);
  return (
    <React.Fragment>
      <MetaTags>
        <title>Verify OTP</title>
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
                        <h5 className="text-primary">Verify OTP</h5>
                        <p>OTP can be found at your email (used for registration)</p>
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
                          name="otp"
                          label="OTP"
                          className="form-control"
                          placeholder="OTP"
                          type="number"
                          required
                        />
                      </div>
                     
                        <AvField 
                          name="otp_verification"
                          type="hidden"
                          required
                          value={otp_verification}
                        />
                   
                      
                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Verify OTP
                        </button>
                      </div>

                    </AvForm>
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

export default Verify
