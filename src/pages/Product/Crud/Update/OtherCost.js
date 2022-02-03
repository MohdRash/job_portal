import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Card, CardBody, Form, CardTitle, Spinner } from "reactstrap"
import { map } from "lodash"
import { useParams } from "react-router"

//actions
import { deleteOtherCost, getProductDetail } from "store/actions"

function OtherCost(myDisabled) {
  const dispatch = useDispatch()
  const params = useParams()

  const { Productloading, otherCost } = useSelector(state => ({
    otherCost: state.Products.productDetail.othercost,
    Productloading: state.Products.loading,
  }))

  useEffect(() => {
    dispatch(getProductDetail(params.id))
  }, [dispatch])

  const onDeleteOtherCost = id => {
    dispatch(deleteOtherCost(id))
  }

  return (
    <>
      {otherCost?.length > 0 && (
        <Card>
          <CardBody>
            <CardTitle className="h4 mb-4">Other Cost </CardTitle>
            {Productloading ? (
              <Spinner type="grow" color="gray" />
            ) : (
              <Form className="repeater" encType="multipart/form-data">
                <div>
                  {map(otherCost, (item, index) => (
                    <Row key={index}>
                      <Row className="text-muted mt-4">
                        <Col lg={12} md={6}>
                          <p>
                            <i className="mdi mdi-chevron-right text-primary me-1" />
                            <b>Description</b> : {item.note}
                          </p>
                        </Col>

                        <Col lg={6} md={4}>
                          <p>
                            <b>Price</b> : {item.amount}
                          </p>
                        </Col>
                        <Col
                          lg={2}
                          md={2}
                          className="align-self-center mt-0 m-auto"
                        >
                          <div
                            className="d-grid "
                            style={{ maxWidth: "200px" }}
                          >
                            <i
                              style={{
                                color: "red",
                                opacity: "0.5",
                                cursor: "pointer",
                              }}
                              className="fas fa-trash"
                              title="remove"
                              onClick={() => onDeleteOtherCost(item.id)}
                            ></i>
                          </div>
                        </Col>
                      </Row>
                    </Row>
                  ))}
                </div>
              </Form>
            )}
          </CardBody>
        </Card>
      )}
    </>
  )
}

export default OtherCost
