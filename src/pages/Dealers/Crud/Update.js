import { AvField, AvForm } from "availity-reactstrap-validation"
import React, { useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap"
import PropTypes from "prop-types"

//actions
import { getDealerDetail, updateDealer } from "store/actions"

//componets
import Breadcrumbs from "../../../components/Common/Breadcrumb"

const UpdateDealer = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const { dealerDetail, loading } = useSelector(state => ({
    dealerDetail: state.Dealers.dealerDetail,
    loading: state.loading,
  }))
  function handleValidSubmit(values) {
    dispatch(updateDealer(values, dealerDetail.id, history))
  }

  useEffect(() => {
    dispatch(getDealerDetail(params.id))
  }, [])

  return (
    <>
      <MetaTags>
        <title>Dealer | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Dealers" breadcrumbItem="Update Dealer" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="3"></Col>
              <Col lg={6}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4 mb-4">
                      {/* Fill this form */}
                    </CardTitle>

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
                            value={dealerDetail?.account?.username}
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
                            value={dealerDetail?.account?.first_name}
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
                            value={dealerDetail?.account?.last_name}
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
                          Phone
                        </Label>
                        <Col sm={9}>
                          <AvField
                            name="phone"
                            className="form-control"
                            id="tel-input"
                            value={dealerDetail?.account?.phone}
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
                            value={dealerDetail?.account?.email}
                            className="form-control"
                            type="email"
                            required
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-location-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Location
                        </Label>
                        <Col sm={9}>
                          <AvField
                            name="location"
                            type="text"
                            value={dealerDetail?.location}
                            className="form-control"
                            id="horizontal-location-Input"
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-profit-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Profit
                        </Label>
                        <Col sm={9}>
                          <AvField
                            name="profit"
                            type="number" min={0}
                            value={dealerDetail?.profit}
                            className="form-control"
                            id="horizontal-profit-Input"
                            validate={{
                              maxLength: {
                                value: 3,
                                errorMessage:
                                  "Your number must be 10 characters",
                              },
                            }}
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
                              Submit
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

export default UpdateDealer

UpdateDealer.propTypes = {
  history: PropTypes.object,
}
