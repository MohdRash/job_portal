import { AvField, AvForm } from "availity-reactstrap-validation"
import React, { useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
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
import { getStoreItemDetail, updateStoreItem } from "store/actions"

const UpdateStore = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const { storeItemDetail, loading, createStoreItemerror } = useSelector(
    state => ({
      createStoreItemerror: state.StoreItems.createStoreItemerror,
      storeItemDetail: state.StoreItems.storeItemDetail,
      loading: state.StoreItems.loading,
    })
  )
  function handleValidSubmit(values) {
    dispatch(updateStoreItem(values, storeItemDetail.id, history))
  }

  useEffect(() => {
    dispatch(getStoreItemDetail(params.id))
  }, [])

  return (
    <>
      <MetaTags>
        <title>Store | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Stores" breadcrumbItem="Update Store" />
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
                      {createStoreItemerror && (
                        <Alert color="danger">{createStoreItemerror}</Alert>
                      )}

                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-username-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Store Name
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-username-Input"
                            name="name"
                            type="text"
                            value={storeItemDetail?.name}
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
                            value={storeItemDetail?.unit_type}
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
                            type="number" min={0}
                            value={storeItemDetail?.unit}
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
                            value={storeItemDetail?.stock}
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
                            value={storeItemDetail?.price}
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
                                  {/* <Spinner color="white" /> */}
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

export default UpdateStore

UpdateStore.propTypes = {
  history: PropTypes.object,
}
