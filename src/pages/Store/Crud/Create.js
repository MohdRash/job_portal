import { AvField, AvForm } from "availity-reactstrap-validation"
import React from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import {
  Alert,
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

import Breadcrumbs from "../../../components/Common/Breadcrumb"

//actions
import { createStoreItem } from "store/actions"

const CreateStore = ({ history }) => {
  const dispatch = useDispatch()

  const { createStoreItemerror, storeItems, loading } = useSelector(state => ({
    createStoreItemerror: state.StoreItems.createStoreItemerror,
    storeItems: state.StoreItems.storeItems,
    loading: state.StoreItems.loading,
  }))

  // handleValidSubmit
  const handleValidSubmit = (onSubmitProps, values) => {
    dispatch(createStoreItem(values, history))
  }
  return (
    <>
      <MetaTags>
        <title>Dealer | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Store" breadcrumbItem="Create Store Item" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="3"></Col>
              <Col lg={6}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4 mb-4">Fill this form</CardTitle>

                    <AvForm
                      className="form-horizontal "
                      onValidSubmit={(onSubmitProps, v) => {
                        handleValidSubmit(onSubmitProps, v)
                      }}
                    >
                      {createStoreItemerror && (
                        <Alert color="danger">{createStoreItemerror}</Alert>
                      )}

                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-username-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Item Name
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-username-Input"
                            name="name"
                            type="text"
                            required
                          />
                        </Col>
                      </div>

                      <div className="row mb-4">
                        <Label
                          htmlFor="tel-input"
                          className="col-sm-3 col-form-label"
                        >
                          Unit type
                        </Label>
                        <Col sm={9}>
                          <AvField
                            name="unit_type"
                            className="form-control"
                            id="tel-input"
                            type="text"
                            required
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-email-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Unit
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-email-Input"
                            name="unit"
                            className="form-control"
                            type="number"
                            min={0}
                            required
                          />
                        </Col>
                      </div>

                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-profit-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Price
                        </Label>
                        <Col sm={9}>
                          <AvField
                            name="price"
                            type="number" min={0}
                            className="form-control"
                            id="horizontal-profit-Input"
                            required
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-location-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Stock
                        </Label>
                        <Col sm={9}>
                          <AvField
                            name="stock"
                            type="number" min={0}
                            className="form-control"
                            id="horizontal-location-Input"
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
                              {loading && (
                                <>
                                  <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                </>
                              )}
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

export default CreateStore

CreateStore.propTypes = {
  history: PropTypes.object,
}
