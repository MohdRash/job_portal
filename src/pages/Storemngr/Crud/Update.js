import { AvField, AvForm } from "availity-reactstrap-validation"
import React, { useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap"

//actions
import { getStoremngrDetail, updateStoremngr } from "store/actions"

const UpdateStoremanager = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const params = useParams()

  const { storemngrDetail } = useSelector(state => ({
    storemngrDetail: state.Storemngrs.storemngrDetail,
  }))
  function handleValidSubmit(values) {
    dispatch(updateStoremngr(values, storemngrDetail.id, history))
    window.scroll(0, 0)
  }

  useEffect(() => {
    dispatch(getStoremngrDetail(params.id))
  }, [dispatch])

  return (
    <>
      <MetaTags>
        <title>Store Manager | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="3"></Col>
              <Col lg={12}>
                <Card style={{ padding: "3rem" }}>
                  <CardTitle className="h4 mb-4">Update Profile</CardTitle>
                  <CardBody>
                    <AvForm
                      className="form-horizontal "
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(v)
                      }}
                    >
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-username-Input"
                          className="col-sm-3 col-form-label"
                        >
                          User name
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-username-Input"
                            className="filePathClass"
                            name="username"
                            type="text"
                            value={storemngrDetail?.username}
                            validate={{
                              required: { value: true },
                              minLength: {
                                value: 4,
                                errorMessage:
                                  "Your name must be between 6 and 16 characters",
                              },
                              maxLength: {
                                value: 16,
                                errorMessage:
                                  "Your name must be between 6 and 16 characters",
                              },
                            }}
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-firstname-Input"
                          className="col-sm-3 col-form-label"
                        >
                          First name
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-firstname-Input"
                            name="first_name"
                            value={storemngrDetail?.first_name}
                            className="filePathClass"
                            type="text"
                            validate={{
                              required: { value: true },
                              minLength: {
                                value: 4,
                                errorMessage:
                                  "Your name must be between 6 and 16 characters",
                              },
                              maxLength: {
                                value: 16,
                                errorMessage:
                                  "Your name must be between 6 and 16 characters",
                              },
                            }}
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-lastname-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Last name
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-lastname-Input"
                            name="last_name"
                            value={storemngrDetail?.last_name}
                            type="text"
                            validate={{
                              required: { value: true },
                            }}
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="tel-input"
                          className="col-sm-3 col-form-label"
                        >
                          Phone No
                        </Label>
                        <Col sm={9}>
                          <AvField
                            name="phone"
                            className="form-control"
                            id="tel-input"
                            value={storemngrDetail?.phone}
                            type="mobile"
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Please enter your phone number",
                              },
                              minLength: {
                                value: 10,
                                errorMessage:
                                  "Your number must be 10 characters",
                              },
                              maxLength: {
                                value: 10,
                                errorMessage:
                                  "Your number must be 10 characters",
                              },
                            }}
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-email-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Email
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-email-Input"
                            name="email"
                            value={storemngrDetail?.email}
                            className="form-control"
                            type="email"
                            required
                          />
                        </Col>
                      </div>

                      <div className="row justify-content-end">
                        <Col sm={9}>
                          <div>
                            <Button
                              type="submit"
                              color="success"
                              className="w-md"
                            >
                              Update
                            </Button>
                          </div>
                        </Col>
                      </div>
                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3"></Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default UpdateStoremanager
