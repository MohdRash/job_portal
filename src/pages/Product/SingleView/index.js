import React, { useState } from "react"
import { Col, Container, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { Card, CardBody, Media, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { useEffect } from "react"

//actions
import { deleteProduct, getProductDetail } from "store/actions"

//components
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import ItemList from "./ItemList"
import DeleteModal from "components/Common/DeleteModal"

const ProductDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const [roleHandle, setroleHandle] = useState(false)

  const { productDetail, loading } = useSelector(state => ({
    productDetail: state.Products.productDetail,
    loading: state.Products.loading,
  }))

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    setIsOpen(true)
  }

  const handleDeleteEvent = () => {
    dispatch(deleteProduct(productDetail.id, history))
    setIsOpen(false)
    history.push("/products?removed")
  }

  useEffect(() => {
    dispatch(getProductDetail(params.id))
  }, [])

  const Role = sessionStorage.getItem("role")

  useEffect(() => {
    if (Role == "admin") {
      setroleHandle(true)
    }
    if (Role == "productionmanager") {
      setroleHandle(true)
    }
  }, [roleHandle])

  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />
      <MetaTags>
        <title>Product | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Products" breadcrumbItem="Product" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    {loading ? (
                      <Spinner type="grow" color="gray" />
                    ) : (
                      <>
                        <Media>
                          <Col md={{ size: 7, offset: 0 }} xs="9">
                            <div>
                              <img
                                src={productDetail?.image}
                                alt=""
                                id="expandedImg1"
                                className="img-fluid mx-auto d-block"
                              />
                            </div>
                          </Col>
                        </Media>

                        <div className="text-muted mt-4">
                          <Media className="overflow-hidden" body>
                            <h5 className="text-truncate font-size-15 mt-3">
                              {productDetail?.name}
                            </h5>
                            <p className="text-muted">
                              {productDetail?.unit_type}
                            </p>
                            <p className="text-muted">
                              {productDetail?.description}
                            </p>
                          </Media>
                          <p>
                            <i className="mdi mdi-chevron-right text-primary me-1" />
                            Number of Frames : {productDetail?.no_of_cols}
                          </p>
                          {Role == "supervisor" ? <></> : <p>
                            <i className="mdi mdi-chevron-right text-primary me-1" />
                            Cost :
                            <span className="text-info mx-2 font-size-17">
                              <i className="bx bx-rupee" />
                              {productDetail?.cost}
                            </span>
                          </p>}
                          {roleHandle && (
                            <p>
                              <i className="mdi mdi-chevron-right text-primary me-1" />
                              Profit : {productDetail?.profit}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    {roleHandle && (
                      <Row className="task-dates">
                        <Col sm="4" xs="6">
                          <div className="mt-4">
                            <Link
                              to={`/product/update/${productDetail?.id}`}
                              className={`btn btn-secondary ${loading && "disabled"
                                } btn-m`}
                            >
                              Edit{" "}
                              <i className="mdi mdi-arrow-right ms-1 bx-fade-right" />
                            </Link>
                          </div>
                        </Col>

                        <Col sm="4" xs="6">
                          <div className="mt-4">
                            <Link
                              style={{ opacity: 0.8 }}
                              to="#"
                              className={`btn btn-danger ${loading && "disabled"
                                }  btn-m`}
                              onClick={handleDelete}
                            >
                              Remove
                              <i className="fas fa-trash ms-1 bx-tada-hover"></i>
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    )}
                    {Role == "dealer" && (
                      <Row>
                        <Col sm="4" xs="6"></Col>
                        <Col sm="4" xs="6"></Col>

                        <Col sm="4" xs="6">
                          <div className="mt-4">
                            <Link
                              style={{ opacity: 0.8 }}
                              to="/order/create"
                              className={`btn text-light bg-success ${loading && "disabled"
                                }  btn-m`}
                              onClick={handleDelete}
                            >
                              Order Now
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    )}
                  </CardBody>
                </Card>
              </Col>

              {Role == "dealer" ? <></> : <Col lg="4" className="overflow-div">
                <ItemList />
              </Col>}
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ProductDetails

ProductDetails.propTypes = {
  history: PropTypes.object,
}
