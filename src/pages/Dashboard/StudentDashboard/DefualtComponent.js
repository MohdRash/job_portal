import React, {useEffect, useState } from "react"
import { Badge, Card, CardBody, Col, Form, Input, Label, NavItem, Row, TabContent, Table, TabPane } from "reactstrap"
import { useDispatch } from "react-redux"


//Import Image
import features from "../../../assets/images/img-1.png"

//action
import {
  getDashboardData
} from "store/actions"

// components
import CompanyCv from "./CompanyCv"
import StudentLevelData from "./StudentLevelData"
import PendingOrder from "./PendingOrder"
import { AvField, AvForm } from "availity-reactstrap-validation"
import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import classnames from "classnames"
import WelcomeComp from "./WelcomeComp"



const DefualtComponent = () => {
  const dispatch = useDispatch()
  const [activeTab, setactiveTab] = useState(1)
  const [passedSteps, setPassedSteps] = useState([1])

  const { dashboardData } = useSelector(
    state => ({
      dashboardData: state.Dashboard.dashboardData,
    })
  )
  console.log(dashboardData);

  useEffect(() => {
    dispatch(getDashboardData())
  }, [dispatch])

  const statusRole = [
    {
      role:'Passed'
    },
    {
      role:'Not assigned yet'
    },
    {
      role:'Ongoing'
    },
    {
      role:'Failed'
    },
    {
      role:'Submitted'
    }
  ]

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  }

  return (
    <React.Fragment>

    <Row>
      <Col lx="4" lg="4">
        <WelcomeComp />
        {/* <FinishedProductList /> */}
      </Col>
      <Col lx="8" lg="8">
        <Row>
          {/* <MiniWidget /> */}
        </Row>
        <Row>
          {/* <MiniCards /> */}
          <Col className="col-6">
          <PendingOrder />
            {/* <PersonalCv /> */}
          </Col>
          <Col className="col-6">
            <CompanyCv />
          </Col>
        </Row>
        
      </Col>
      <StudentLevelData />
    </Row>

    <Row>
      
      <Col lg="12">
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Submit Your Details</h4>
            <div className="wizard clearfix">
              <div className="steps clearfix">
                <ul>
                  <NavItem
                    className={classnames({ current: activeTab === 1 })}
                  >
                    <Link
                      to='#'
                      className={classnames({ current: activeTab === 1 })}
                      onClick={() => {
                        setactiveTab(1)
                      }}
                      disabled={!(passedSteps || []).includes(1)}
                    >
                      <span className="number">01</span> Your Personal Info
                    </Link>
                  </NavItem>
                  <NavItem
                    className={classnames({ current: activeTab === 2 })}
                  >
                    <Link
                      to='#'
                      className={classnames({ active: activeTab === 2 })}
                      onClick={() => {
                        setactiveTab(2)
                      }}
                      disabled={!(passedSteps || []).includes(2)}
                    >
                      <span className="number ms-2">02</span> University & Course Details
                    </Link>
                  </NavItem>
                  <NavItem
                    className={classnames({ current: activeTab === 3 })}
                  >
                    <Link
                      to='#'
                      className={classnames({ active: activeTab === 3 })}
                      onClick={() => {
                        setactiveTab(3)
                      }}
                      disabled={!(passedSteps || []).includes(3)}
                    >
                      <span className="number">03</span> Course Timeline
                    </Link>
                  </NavItem>
                  <NavItem
                    className={classnames({ current: activeTab === 4 })}
                  >
                    <Link
                      to='#'
                      className={classnames({ active: activeTab === 4 })}
                      onClick={() => {
                        setactiveTab(4)
                      }}
                      disabled={!(passedSteps || []).includes(4)}
                    >
                      <span className="number">04</span> Confirm Detail
                    </Link>
                  </NavItem>
                </ul>
              </div>
              <div className="content clearfix mt-4">
                <AvForm
                  className="form-horizontal"
                  onValidSubmit={(e, v) => {
                    handleValidSubmit(v)
                  }}
                >
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId={1}>
                      <Form>
                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label for="basicpill-firstname-input1">
                                First name
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="basicpill-firstname-input1"
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label for="basicpill-lastname-input2">
                                Surname
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="basicpill-lastname-input2"
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label for="basicpill-phoneno-input3">
                                Date Of Birth
                              </Label>
                              <Input
                                type="date"
                                className="form-control"
                                id="basicpill-phoneno-input3"
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label for="basicpill-email-input4">
                                LinkedIn Link
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="basicpill-email-input4"
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label for="basicpill-email-input4">
                                LinkedIn username
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="basicpill-email-input4"
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label for="basicpill-email-input4">
                                LinkedIn Password
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="basicpill-email-input4"
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label for="basicpill-email-input4">
                                Passport Size Photo
                              </Label>
                              <Input
                                type="file"
                                className="form-control"
                                id="basicpill-email-input4"
                              />
                            </div>
                          </Col>
                        </Row>
                        
                      </Form>
                    </TabPane>
                    <TabPane disabled tabId={2}>
                      <div>
                        <Form>
                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-pancard-input5">
                                Name of University
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-pancard-input5"
                                />
                              </div>
                            </Col>

                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-vatno-input6">
                                  Campus
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-vatno-input6"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-cstno-input7">
                                Course Title
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-cstno-input7"
                                />
                              </div>
                            </Col>

                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-servicetax-input8">
                                Course Duration
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-servicetax-input8"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-companyuin-input9">
                                Internship/Placement /NA
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-companyuin-input9"
                                />
                              </div>
                            </Col>

                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-declaration-input10">
                                  Duration
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-Declaration-input10"
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Card>
                              <CardBody>
                              <Label className="border-bottom"><i className="bx bx-book-bookmark" /> Modules & Specifications</Label>
                                <div className="table-responsive">
                                  <Table className="table mb-0 table-bordered">
                                    <thead className="text-center">
                                      <tr>
                                        <th><i className="bx bx-cctv" /> All Modules</th>
                                        <th><i className="bx bx-eraser" /> Subject</th>
                                        <th><i className="bx bx-stats" /> Status</th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-center">
                                      <tr>
                                        <th scope="row">Module 1</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 2</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 3</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 4</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 5</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 6</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 7</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 8</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 9</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 10</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 11</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 12</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 13</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Module 14</th>
                                        <td><Input placeholder="enter subject" className="border-0" /></td>
                                        <td>
                                          <Input type="select" className="border-0" >
                                            {statusRole?.map((item, key) => (
                                              <option key={key} value={item.role}>{item.role}</option>
                                            ))}
                                          </Input>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </CardBody>
                            </Card>
                          </Row>

                        </Form>
                      </div>
                    </TabPane>
                    <TabPane disabled tabId={3}>
                      <div>
                        <Form>
                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-namecard-input11">
                                Course Start Date
                                </Label>
                                <Input
                                  type="date"
                                  className="form-control"
                                  id="basicpill-namecard-input11"
                                />
                              </div>
                            </Col>

                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-namecard-input11">
                                Course End Date
                                </Label>
                                <Input
                                  type="date"
                                  className="form-control"
                                  id="basicpill-namecard-input11"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-cardno-input12">
                                Contract Submission Date*
                                </Label>
                                <Input
                                  type="date"
                                  className="form-control"
                                  id="basicpill-cardno-input12"
                                />
                              </div>
                            </Col>

                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-card-verification-input0">
                                Experience Certificate Submission Date*
                                </Label>
                                <Input
                                  type="date"
                                  className="form-control"
                                  id="basicpill-card-verification-input0"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-expiration-input13">
                                VISA Expiry Date
                                </Label>
                                <Input
                                  type="date"
                                  className="form-control"
                                  id="basicpill-expiration-input13"
                                />
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </TabPane>
                    <TabPane disabled tabId={4}>
                      <div className="row justify-content-center">
                        <Row>
                          <Card>
                            <CardBody>
                              <Label className="border-bottom"><i className="bx bx-briefcase" /> Your Favourite Job Sectors</Label>
                              <div className="table-responsive">
                                <Table className="table mb-0 table-bordered">
                                  
                                  <tbody>
                                    <tr>
                                      <th scope="row">1<sup>st</sup> Choice</th>
                                      <td><Input placeholder="Job Sector..." className="border-0" /></td>
                                    </tr>
                                    <tr>
                                      <th scope="row">2<sup>nd</sup> Choice</th>
                                      <td><Input placeholder="Job Sector..." className="border-0" /></td>
                                    </tr>
                                    <tr>
                                      <th scope="row">3<sup>rd</sup> Choice</th>
                                      <td><Input placeholder="Job Sector..." className="border-0" /></td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div> 
                            </CardBody>
                          </Card>
                        </Row>

                        <Row>
                          <Card>
                            <CardBody>
                              <Label className="border-bottom"><i className="bx bx-user-circle" /> Your Future Job roles</Label>
                              <div className="table-responsive">
                                <Table className="table mb-0 table-bordered">
                                  
                                  <tbody>
                                    <tr>
                                      <th scope="row">1<sup>st</sup> Choice</th>
                                      <td><Input placeholder="enter choice..." className="border-0" /></td>
                                    </tr>
                                    <tr>
                                      <th scope="row">2<sup>nd</sup> Choice</th>
                                      <td><Input placeholder="enter choice..." className="border-0" /></td>
                                    </tr>
                                    <tr>
                                      <th scope="row">3<sup>rd</sup> Choice</th>
                                      <td><Input placeholder="enter choice..." className="border-0" /></td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div> 
                            </CardBody>
                          </Card>
                        </Row>

                        <Row>
                          <Card>
                            <CardBody>
                              <Label className="border-bottom"><i className=" bx bx-question-mark" /> Questions based on your future job role</Label>
                              <div className="table-responsive">
                                <Table className="table mb-0 table-bordered">
                                  
                                  <tbody>
                                    <tr>
                                      <th scope="row">Whats your motive to apply for the job 1 ?</th>
                                      <td><Input placeholder="your answer..." className="border-0" /></td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Whats your motive to apply for the job 2 ?</th>
                                      <td><Input placeholder="your answer..." className="border-0" /></td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Whats your motive to apply for the job 3 ?</th>
                                      <td><Input placeholder="your answer..." className="border-0" /></td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </CardBody>
                          </Card>
                        </Row>
                        <Row>
                          <Card>
                            <CardBody>
                              <Label>Upload CV*</Label>
                              <AvField name='uploadCv' type='file' />
                            </CardBody>
                          </Card>
                        </Row>
                        <Row>
                          <Label>
                            <Input type="checkbox" />
                            &nbsp; I agree, all the details given above are real and I accept to face penalty if my details contains false information.
                          </Label>
                        </Row>
                      </div>
                    </TabPane>
                  </TabContent>
                </AvForm>
              </div>
              <div className="actions clearfix">
                <ul>
                  <li
                    className={
                      activeTab === 1 ? "previous disabled" : "previous"
                    }
                  >
                    {activeTab === 4 ?
                      <Link to='#' className="mx-3" type="submit">
                        Submit</Link>
                    : ''}
                    <Link
                      to="#"
                      onClick={() => {
                        toggleTab(activeTab - 1)
                      }}
                    >
                      Previous
                    </Link>
                  </li>
                  <li
                    className={activeTab === 4 ? "next disabled" : "next"}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        toggleTab(activeTab + 1)
                      }}
                    >
                      Next
                    </Link>
                    
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

    </Row>

      
    </React.Fragment>
  )
}

export default DefualtComponent
