import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Card, CardBody, Form, CardTitle, Spinner, Button } from "reactstrap"
import { map } from "lodash"

//actions
import { createOtherCost, deleteOtherCost } from "store/actions"

import AvField from "availity-reactstrap-validation/lib/AvField"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import { Link } from "react-router-dom"

function OtherCost(myDisabled) {
  const dispatch = useDispatch()

  const { loading, productDetail, createdOtherCost } = useSelector(state => ({
    loading: state.StoreItems.loading,
    productDetail: state.Products.productDetail,
    createdOtherCost: state.Products.createdOtherCost,
  }))

  const [newCost, setNewCost] = useState([])
  const [rawData, setRawData] = useState({
    product: productDetail.id || "",
    note: "",
    amount: "",
  })

  useEffect(() => {
    setRawData({ ...rawData, product: productDetail.id })
  }, [productDetail])

  const onAddFormRow = () => {
    dispatch(createOtherCost(rawData))

  }

  const onDeleteFormRow = id => {
    dispatch(deleteOtherCost(id))
    var modifiedRows = [...newCost]
    modifiedRows = modifiedRows.filter(x => x["id"] !== id)
    setNewCost(modifiedRows)
  }

  useEffect(() => {
    if (createdOtherCost?.id) {
      setNewCost([...newCost, createdOtherCost])
    }
  }, [createdOtherCost])

  return (
    <>
      {newCost.length > 0 && (
        <Row>
          <Col xl="1"></Col>
          <Col lg={10}>
            <Card>
              <CardBody>
                <CardTitle className="h4 mb-4">Uploaded Other Cost </CardTitle>
                <Form className="repeater" encType="multipart/form-data">
                  <div>
                    {map(newCost, (item, index) => (
                      <Row key={index}>
                        <Row className="text-muted mt-4">
                          <Col lg={4} md={5}>
                            <p>
                              <i className="mdi mdi-chevron-right text-primary me-1" />
                              Discription : {item.note}
                            </p>
                          </Col>

                          <Col lg={4} md={4}>
                            <p>Price : {item.amount}</p>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            className="align-self-center m-auto"
                          >
                            <div
                              className="d-grid "
                              style={{ maxWidth: "200px" }}
                            >
                              <input
                                type="button"
                                className="btn btn-danger mt-0 mr-lg-0 mb-4"
                                style={{ maxWidth: "120px" }}
                                value="Remove"
                                onClick={() => onDeleteFormRow(item.id)}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Row>
                    ))}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="1"></Col>
        </Row>
      )}

      <Row>
        <Col xl="1"></Col>
        <Col lg={10}>
          <Card>
            <CardBody>
              <CardTitle className="h4 mb-4">Other Cost</CardTitle>
              {loading ? (
                <Spinner type="grow" color="gray" />
              ) : (
                <AvForm className="repeater" encType="multipart/form-data">
                  <div>
                    <Row>
                      <Col lg={3}></Col>
                      <Col lg={3} className="mb-3">
                        <label>Description
                        </label>
                        <AvField
                          name="discription"
                          rows="1"
                          type="textarea"
                          className="form-control"
                          id="resume"
                          onChange={e =>
                            setRawData({
                              ...rawData,
                              ["note"]: e.target.value,
                            })
                          }
                          required
                        />
                      </Col>

                      <Col lg={3} className="mb-3">
                        <label>Price</label>
                        <AvField
                          name="price"
                          type="number" min={0}
                          className="form-control"
                          id="resume"
                          onChange={e =>
                            setRawData({
                              ...rawData,
                              ["amount"]: e.target.value,
                            })
                          }
                          required
                        />
                      </Col>
                      <Col lg={3}>
                        <input
                          type="button"
                          className="btn btn-dark mt-4 mr-lg-0"
                          value="Add New"
                          style={{
                            pointerEvents:
                              myDisabled.myDisabled === true && "none",
                          }}
                          onClick={() => onAddFormRow()}
                        />
                      </Col>
                      <Col lg={9} md={9}></Col>
                      <Col lg={3} md={3} className="mt-4">
                        <Link to="/products" className="btn btn-info mb-2 info"> Go to product list </Link>
                      </Col>
                    </Row>
                  </div>
                </AvForm>
              )}

            </CardBody>
          </Card>
        </Col>
        <Col xl="1"></Col>
      </Row>
    </>
  )
}

export default OtherCost
