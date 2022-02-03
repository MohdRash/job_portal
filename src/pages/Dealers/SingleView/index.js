import React from "react"
import { Col, Container, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { useEffect, useState } from "react"
import { Card, CardBody, Media, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"

//componetns
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import Table from "./Table"
import DeleteModal from "components/Common/DeleteModal"

//Import Images
import userProfile from "assets/images/logo/user.png"

//actions
import { deleteDealer, getDealerDetail } from "store/actions"


const DealerDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const { dealerDetail, loading, detailLoading, orders } = useSelector(
    state => ({
      dealerDetail: state.Dealers.dealerDetail,
      loading: state.loading,
      orders: state.Dealers.dealerDetail.orders,
      detailLoading: state.detailLoading,
    })
  )
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    setIsOpen(true)
  }
  const handleDeleteEvent = () => {
    dispatch(deleteDealer(dealerDetail.id, history))
    setIsOpen(false)
    history.goBack()
  }

  useEffect(() => {
    dispatch(getDealerDetail(params.id))
  }, [])

  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />

      <MetaTags>
        <title>Dealer | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Dealers" breadcrumbItem="Dealer" />
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
                              src={userProfile}
                              alt=""
                              className="avatar-md rounded-circle img-thumbnail"
                            />
                          </div>
                          <Media className="align-self-center" body>
                            <div className="text-muted">
                              <h5 className="mb-1">
                                {dealerDetail?.account?.username}
                              </h5>
                              <p className="mb-0 text-capitalize">
                                {dealerDetail?.account?.role}
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
                                  {dealerDetail?.account?.email}
                                </h5>
                                <p className="mb-1">
                                  {dealerDetail?.account?.phone}
                                </p>
                                <p className="mb-1">{dealerDetail?.location}</p>
                              </>
                            )}
                          </div>
                        </Media>
                      </Col>

                      <Col lg="2" className="d-lg-block">
                        <div className="mt-4">
                          {dealerDetail?.id && (
                            <Link
                              to={`/dealer/update/${dealerDetail?.id}`}
                              className={`btn btn-secondary ${
                                loading && "disabled"
                              } btn-sm`}
                            >
                              update Profile{" "}
                              <i className="mdi mdi-arrow-right ms-1 bx-fade-right" />
                            </Link>
                          )}
                        </div>
                        <div className="mt-4">
                          <Link
                            style={{ opacity: 0.8 }}
                            to="#"
                            className={`btn btn-danger ${
                              loading && "disabled"
                            }  btn-sm`}
                            onClick={handleDelete}
                          >
                            Remove Profile
                            <i className="fas fa-trash ms-1 bx-tada-hover"></i>
                          </Link>
                        </div>
                      </Col>

                      <Col lg="12" className="mt-4 align-self-center">
                        <div className="text-lg-center mt-4 mt-lg-0">
                          <Row>
                            <Col xs="4">
                              <div>
                                <p className="text-muted text-truncate mb-2">
                                  Profit
                                </p>
                                <h5 className="mb-0">{dealerDetail?.profit}</h5>
                              </div>
                            </Col>
                            <Col xs="4">
                              <div>
                                <p className="text-muted text-truncate mb-2">
                                  Total Orders
                                </p>
                                <h5 className="mb-0">{orders?.length}</h5>
                              </div>
                            </Col>
                            <Col xs="4">
                              <div>
                                <p className="text-muted text-truncate mb-2">
                                  Pending Orders
                                </p>
                                <h5 className="mb-0">
                                  {
                                    orders?.results?.filter(
                                      order => order.status == "Pending"
                                    )?.length
                                  }
                                </h5>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="12">
                <Table />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default DealerDetails

DealerDetails.propTypes = {
  history: PropTypes.object,
}
