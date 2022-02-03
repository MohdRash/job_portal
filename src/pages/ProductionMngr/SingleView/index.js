import React, { useState } from "react"
import { Col, Container, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"

//componetns
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import PropTypes from "prop-types"

import { useEffect } from "react"
import { Card, CardBody, Media, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

//Import Images
import userProfile from "assets/images/logo/user.png"

//actions
import { deleteProductionmngr, getProductionmngrDetail, getProductionmngrs } from "store/actions"
import UpdateStoremanager from "../Crud/Update"
import DeleteModal from "components/Common/DeleteModal"


const ProductionManagerDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)

  const { productionmngrs, detailLoading, loading, productionmngrDetail } = useSelector(
    state => ({
      detailLoading: state.Productionmngrs.detailLoading,
      loading: state.Productionmngrs.loading,
      productionmngrDetail: state.Productionmngrs.productionmngrDetail,
      productionmngrs: state.Productionmngrs.productionmngrs,
    })
  )
  console.log(productionmngrDetail);
  const handleDelete = () => {
    setIsOpen(true)
  }
  const handleDeleteEvent = () => {
    dispatch(deleteProductionmngr(productionmngrDetail.id, history))
    setIsOpen(false)
  }
  useEffect(() => {
    dispatch(getProductionmngrDetail(params.id))
  }, [dispatch])

  useEffect(() => {
    dispatch(getProductionmngrs())
  }, [dispatch])

  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />
      <MetaTags>
        <title>{productionmngrDetail?.student_name} | Career Portal </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs
          title="Students"
          breadcrumbItem="About Student"
        />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg="6" md="6" className="mb-4">
                        <Media>
                          <div className="me-3">
                            <img
                              src={productionmngrDetail?.student_other_detail?.profilepic}
                              alt=""
                              className="avatar-md rounded-circle img-thumbnail"
                            />
                          </div>
                          <Media className="align-self-center" body>
                            <div className="text-muted">
                              <h5 className="mb-1">
                                {productionmngrDetail?.student_name}
                              </h5>
                              <p className="mb-0 text-capitalize">
                                {productionmngrDetail?.student_other_detail?.phone}
                              </p>
                            </div>
                          </Media>
                        </Media>
                      </Col>
                      

                      <Col lg="4" md="6" className="d-lg-block">
                        <Media className="align-self-center" body>
                          <div className="text-muted">
                            {detailLoading ? (
                              <Spinner />
                            ) : (
                              <>
                                <h5 className="mb-1">
                                  {productionmngrDetail?.email}
                                </h5>
                                <p className="mb-1">
                                  {productionmngrDetail?.phone}
                                </p>
                              </>
                            )}
                          </div>
                        </Media>
                      </Col>

                      <Col lg="2" className="d-lg-block">
                        <div className="mt-4">
                          <Link
                            style={{ opacity: 0.8 }}
                            to="#"
                            className={`btn btn-danger ${
                              loading && "disabled"
                            }  btn-sm`}
                            onClick={handleDelete}
                          >
                            Delete Account
                            <i className="fas fa-trash ms-1 bx-tada-hover"></i>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <UpdateStoremanager />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ProductionManagerDetails

ProductionManagerDetails.propTypes = {
  history: PropTypes.object,
}
