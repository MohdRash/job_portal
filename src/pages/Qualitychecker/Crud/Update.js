import { AvField, AvForm } from "availity-reactstrap-validation"
import React, { useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap"
import PropTypes from "prop-types"

//actions
import { getQltcheckerDetail, updateQltchecker } from "store/actions"

const UpdateQltChecker = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const { qltcheckerDetail } = useSelector(state => ({
    qltcheckerDetail: state.Qltcheckers.qltcheckerDetail,
  }))
  console.log(qltcheckerDetail);
  function handleValidSubmit(values) {
    dispatch(updateQltchecker(values, qltcheckerDetail.id))
    window.scroll(0, 0)
  }

  useEffect(() => {
    dispatch(getQltcheckerDetail(params.id))
  }, [])

  //dropdown for status
  const statusRole = [
    {
      role:'applied'
    },
    {
      role:'declined'
    },
    {
      role:'pending'
    }
  ]


  return (
    <>
      <MetaTags>
        <title>Quality Checker | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="3"></Col>
              <Col lg={12}>
                <Card style={{ padding: "2rem" }}>
                  <CardBody>
                    <CardTitle className="h4 mb-4">Update Profile</CardTitle>

                    <AvForm
                      className="form-horizontal "
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(v)
                      }}
                    >
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-username-Input"
                          className="col-sm-3 col-form-label"
                        >
                          ID
                        </Label>
                        <Col sm={9}>
                          <AvField
                          readOnly
                            id="horizontal-username-Input"
                            className="filePathClass"
                            name="student"
                            type="text"
                            value={qltcheckerDetail?.student}
                            
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-username-Input"
                          className="col-sm-3 col-form-label"
                        >
                          User name
                        </Label>
                        <Col sm={9}>
                          <AvField
                          readOnly
                            id="horizontal-username-Input"
                            className="filePathClass"
                            name="student_name"
                            type="text"
                            value={qltcheckerDetail?.student_name}
                            
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-firstname-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Applied Company
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-firstname-Input"
                            name="company"
                            value={qltcheckerDetail?.company}
                            className="filePathClass"
                            type="text"
                            
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-lastname-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Applied Position
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-lastname-Input"
                            name="position"
                            value={qltcheckerDetail?.position}
                            type="text"
                            
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="tel-input"
                          className="col-sm-3 col-form-label"
                        >
                          Last Date
                        </Label>
                        <Col sm={9}>
                          <AvField
                            name="last_date"
                            className="form-control"
                            id="tel-input"
                            value={qltcheckerDetail?.last_date}
                            type="date"
                            
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-email-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Job Status
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-email-Input"
                            name="stage"
                            value={qltcheckerDetail?.stage || statusRole?.role}
                            className="form-control"
                            type="select"
                          >
                            {statusRole?.map((item, key) => (
                              <option key={key} value={item.role}>{item.role}</option>
                            ))}
                          </AvField>
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="tel-input"
                          className="col-sm-3 col-form-label"
                        >
                          Job Description
                        </Label>
                        <Col sm={9}>
                          <AvField
                            name="job_description"
                            className="form-control"
                            id="tel-input"
                            value={qltcheckerDetail?.job_description}
                            type="textarea"
                            validate={{
                              required: {
                                value: true,
                              },
                            }}
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
                              Update
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

export default UpdateQltChecker

UpdateQltChecker.propTypes = {
  history: PropTypes.object,
}
