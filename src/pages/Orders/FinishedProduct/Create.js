import { AvField, AvForm } from "availity-reactstrap-validation"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap"
import PropTypes from "prop-types"


//actions
import { createFinishedProduct, finishedDetails } from "store/actions"

const CreateFinisedProduct = ({ setActiveTab }) => {
  const dispatch = useDispatch()

  const { finishedProdDetails, loading } = useSelector(state => ({
    finishedProdDetails: state.Products.finishedProdDetails,
    loading: state.Products.finishProdLoading,
  }))

  // handleValidSubmit
  const handleValidSubmit = async (e, values) => {
    dispatch(createFinishedProduct(values))

    setActiveTab(1)
  }

  const [prodId, setProdId] = useState()

  useEffect(() => {
    dispatch(finishedDetails(prodId))
  }, [prodId])



  return (
    <>
      <MetaTags>
        <title>Product | Loha </title>
      </MetaTags>

      <Container fluid>
        <div className="container-fluid">
          <Row>
            <Col lg={finishedProdDetails?.id ? "8" : "12"}>
              <Card>
                <CardBody>
                  {finishedProdDetails?.response && (
                    <Alert color="danger">
                      {finishedProdDetails?.response}
                    </Alert>
                  )}
                  <AvForm
                    className="form-horizontal "
                    onValidSubmit={(onSubmitProps, v) => {
                      handleValidSubmit(onSubmitProps, v)
                    }}
                  >
                    <div className="row mb-4">
                      <Label
                        htmlFor="horizontal-username-Input"
                        className="col-sm-3 col-form-label"
                      >
                        Id
                      </Label>
                      <Col sm={9}>
                        <AvField
                          id="horizontal-username-Input"
                          name="supervisor_schedule_item_auto_id"
                          type="text"
                          placeholder={`${moment(Date.now()).format("yyyy")}-`}
                          value={`${moment(Date.now()).format("yyyy")}-`}
                          required
                          onChange={e => setProdId(e.target.value)}
                        />
                      </Col>
                    </div>

                    <div className="row mb-4">
                      <Label
                        htmlFor="horizontal-location-Input"
                        className="col-sm-3 col-form-label"
                      >
                        Status
                      </Label>
                      <Col sm={9}>
                        <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                          <AvField type="select" name="qc_status" required>
                            <option>Select..</option>
                            <option>Approved</option>
                            <option>Defected</option>
                          </AvField>
                        </div>
                      </Col>
                    </div>

                    <div className="row mb-4">
                      <Label
                        htmlFor="tel-input"
                        className="col-sm-3 col-form-label"
                      >
                        Note
                      </Label>
                      <Col sm={9}>
                        <AvField
                          name="note"
                          className="form-control"
                          id="tel-input"
                          type="textarea"
                        />
                      </Col>
                    </div>

                    <div className="row justify-content-end">
                      <Col sm={3}>
                        <div>
                          <Button
                            type="submit"
                            color="success"
                            className={`w-md  ${finishedProdDetails?.id ? "" : "disabled"}`}
                          >
                            {loading && (
                              <>
                                <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                              </>
                            )}
                            QC Pass
                          </Button>
                        </div>
                      </Col>
                    </div>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              {finishedProdDetails?.id && (
                <Card outline color="success" className="border mt-4">
                  <CardBody>
                    <CardTitle className="mb-4 text-white">
                      <i className="mdi mdi-check-all me-3 text-info" />
                    </CardTitle>
                    <CardText>
                      <div className="text-muted">
                        <p className="mb-1">
                          <i className="mdi mdi-circle-medium align-middle text-primary me-1" />{" "}
                          Id :{" "}
                          <span className="text-size-14 h6">
                            {finishedProdDetails?.id}
                          </span>
                        </p>
                        <p className="mb-1">
                          <i className="mdi mdi-circle-medium align-middle text-primary me-1" />{" "}
                          Supervisor :{" "}
                          <span className="text-size-14 h6">
                            {finishedProdDetails?.supervisor}
                          </span>
                        </p>
                        <p className="mb-1">
                          <i className="mdi mdi-circle-medium align-middle text-primary me-1" />{" "}
                          Product :{" "}
                          <span className="text-size-14 h6">
                            {finishedProdDetails?.product}
                          </span>
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-circle-medium align-middle text-primary me-1" />{" "}
                          Quantity :{" "}
                          <span className="text-size-14 h6">
                            {finishedProdDetails?.quantity}
                          </span>
                        </p>
                      </div>
                    </CardText>
                  </CardBody>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}

export default CreateFinisedProduct
CreateFinisedProduct.propTypes = {
  setActiveTab: PropTypes.func,
}
