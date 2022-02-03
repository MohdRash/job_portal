import React, { useState } from "react"
import { Col, Container, Label, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { useEffect } from "react"
import { Card, CardBody, Media, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"

//actions
import { deleteQltchecker, getQltcheckerDetail, getProductionmngrDetail } from "store/actions"

//componetns
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import UpdateQltChecker from "../Crud/Update"
import DeleteModal from "components/Common/DeleteModal"

//Import Images
import userProfile from "assets/images/logo/user.png"

const QltCheckerDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const { qltcheckerDetail, loading, detailLoading } = useSelector(state => ({
    loading: state.Qltcheckers.loading,
    detailLoading: state.detailLoading,
    qltcheckerDetail: state.Qltcheckers.qltcheckerDetail,
  }))
  console.log(qltcheckerDetail);

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    setIsOpen(true)
  }
  const handleDeleteEvent = () => {
    dispatch(deleteQltchecker(qltcheckerDetail.id, history))
    setIsOpen(false)
    history.push("/qualitycheckers")
  }

  useEffect(() => {
    dispatch(getQltcheckerDetail(params.id))
  }, [])

  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />

      <MetaTags>
        <title>About Application | Career </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs
          title="All Job Applications"
          breadcrumbItem="About Applications"
        />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg="4" md="4" sm="6" className="mb-4">
                        
                        <Label>Student Name</Label>
                        <h5 className="mb-1">
                          {qltcheckerDetail?.student_name}
                        </h5>
                      </Col>
                      <Col lg="4" md="4" sm="6">
                        <Label>Applied Company</Label>
                        <h5 className="mb-1">
                          {qltcheckerDetail?.company}
                        </h5>
                      </Col>
                      <Col lg="4" md="4" sm="6">
                        <Label>Applied Position</Label>
                        <h5 className="mb-1">
                          {qltcheckerDetail?.position}
                        </h5>
                      </Col>
                      <Col lg="4" md="4" sm="6">
                        <Label>Last date</Label>
                        <h5 className="mb-1">
                          {qltcheckerDetail?.last_date}
                        </h5>
                      </Col>
                      <Col lg="4" md="4" sm="6">
                        <Label>Job Description</Label>
                        <h5 className="mb-1">
                          {qltcheckerDetail?.job_description}
                        </h5>
                      </Col>
                      <Col lg="4" md="4" sm="6">
                        <Label>Job Status</Label>
                        <h5 className="mb-1">
                          {qltcheckerDetail?.stage}
                        </h5>
                      </Col>
                      <Row>
                      <Col lg="2">
                        <div className="mt-4">
                          <Link
                            style={{ opacity: 0.8 }}
                            to="#"
                            className={`btn btn-danger ${
                              loading && "disabled"
                            }  btn-sm`}
                            onClick={handleDelete}
                          >
                            Delete Application
                            <i className="fas fa-trash ms-1 bx-tada-hover"></i>
                          </Link>
                        </div>
                      </Col>
                      <Col lg="2">
                        <div className="mt-4">
                          <Link
                            style={{ opacity: 0.8 }}
                            to={`/qualitychecker/update/${qltcheckerDetail?.id}`}
                            className={`btn btn-primary ${
                              loading && "disabled"
                            }  btn-sm`}
                          >
                            Update Application
                            <i className="fas fa-trash ms-1 bx-tada-hover"></i>
                          </Link>
                        </div>
                      </Col>
                      </Row>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default QltCheckerDetails

QltCheckerDetails.propTypes = {
  history: PropTypes.object,
}
