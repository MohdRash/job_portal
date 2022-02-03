import { AvField, AvForm } from "availity-reactstrap-validation"
import React, { useEffect } from "react"
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

//actions
import { createQltchecker, getProductionmngrs } from "store/actions"

import Breadcrumbs from "../../../components/Common/Breadcrumb"



const CreateQltChecker = ({ history }) => {
  const dispatch = useDispatch()

  const { loading, productionmngrs } = useSelector(state => ({
    loading: state.Qltcheckers.loading,
    productionmngrs: state.Productionmngrs.productionmngrs,
  }))
  console.log(productionmngrs);

  // handleValidSubmit
  const handleValidSubmit = (values) => {

    dispatch(createQltchecker(values, history))
  }
  

  useEffect(() => {
    dispatch(getProductionmngrs())
  }, [dispatch])

  return (
    <>
      <MetaTags>
        <title>Create Job Details | Loha </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs
          title="Job Details"
          breadcrumbItem="Create Job Application"
        />
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
                          Application For
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-username-Input"
                            className="filePathClass"
                            name="student"
                            type="select"
                            
                          >
                            <option>Choose a student</option>
                            {productionmngrs?.results?.map((item, key) => (
                              <option key={key} value={item.id}>{item.student_name}</option>
                            ))}
                          </AvField>
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-username-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Student Name
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-username-Input"
                            className="filePathClass"
                            name="student_name"
                            type="text"
                            
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-firstname-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Company
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-firstname-Input"
                            name="company"
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
                         Job Position
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-lastname-Input"
                            name="position"
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
                            type="date"
                            
                          />
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
                            type="textarea"
                            validate={{
                              required: {
                                value: true,
                              },
                            }}
                          />
                        </Col>
                      </div>
                      <AvField
                        hidden
                        name="stage"
                        className="form-control"
                        id="tel-input"
                        type="text"
                        validate={{
                          required: {
                            value: true,
                          },
                        }}
                        value="applied"
                      />

                      <div className="row justify-content-end">
                        <Col sm={9}>
                          <div>
                            <Button
                              type="submit"
                              color="success"
                              className="w-md"
                            >
                              Create
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

export default CreateQltChecker

CreateQltChecker.propTypes = {
  history: PropTypes.object,
}
