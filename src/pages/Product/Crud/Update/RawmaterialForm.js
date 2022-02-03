import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Card, CardBody, Form, CardTitle, Spinner } from "reactstrap"
import { map } from "lodash"
import { useParams } from "react-router"

//action
import { deleteRawmaterial, getProductDetail } from "store/actions"

function RawmaterialForm() {
  const dispatch = useDispatch()
  const params = useParams()
  //redux state
  const { productDetail, Productloading } = useSelector(state => ({
    productDetail: state.Products.productDetail,
    Productloading: state.Products.loading,
  }))

  useEffect(() => {
    dispatch(getProductDetail(params.id))
  }, [dispatch])

  const onDeleteRawMaterial = id => {
    dispatch(deleteRawmaterial(id))
  }

  return (
    <>
      {/* succesfully uploaded */}

      {productDetail?.rawmaterial?.length > 0 && (
        <Card>
          <CardBody>
            <CardTitle className="h4 mb-4">Raw Materials </CardTitle>
            {Productloading ? (
              <Spinner type="grow" color="gray" />
            ) : (
              <Form className="repeater" encType="multipart/form-data">
                <div>
                  {map(productDetail?.rawmaterial, (item, index) => (
                    <Row key={index}>
                      <Row className="text-muted mt-4">
                        <Col lg={12} md={4}>
                          <p>
                            <i className="mdi mdi-chevron-right text-primary me-1" />
                            <b>Store Item</b> : {item?.name || ""}
                          </p>
                        </Col>
                        <Col lg={5} md={3}>
                          <p>
                            <b>Quantity</b> : {item?.quantity || ""}
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
                              onClick={() => onDeleteRawMaterial(item?.id)}
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

export default RawmaterialForm
