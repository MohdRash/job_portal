import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Col, Card, CardBody, Spinner, Media, Row, Container, Label, Input, Table, TabPane, Form, TabContent, NavItem, Button, CardTitle } from "reactstrap"
import { map, range } from "lodash"
import classnames from "classnames"
import { MetaTags } from "react-meta-tags"
// import UpdateStoremanager from "./Update"

import { getProducts, createProduct, getApplication } from "store/actions"
import { AvField, AvForm } from "availity-reactstrap-validation"
import { API_URL } from "helpers/api_methods"
import axios from "axios"
import MyPagination from "components/Common/MyPagination"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import WelcomeComp from "./WelcomeComp"
import Vacancies from "./separateDatas/vacancy"

const StudentHome = () => {
  const dispatch = useDispatch()
  const [activeTab, setactiveTab] = useState(1)
  const [passedSteps, setPassedSteps] = useState([1])
  const [picture, setPicture] = useState();
  const [searchText, setSearchText] = useState("")
  const [page, setPage] = useState(1)

  const { products, applications, loading } =
    useSelector(state => ({
      loading: state.Products.loading,
      products: state.Products.products,
      applications: state.Products.applications,
    }))
    console.log(products);


  useEffect(() => {
    dispatch(getProducts())

  }, [dispatch])

const printme=()=>{
  if(products?.count > 0){
    window.print()
  }
}


  //page
  const totalPages = Math.ceil(applications?.count / 10)
  const pages = range(1, totalPages + 1)

  const pageSend = () => {
    if (page >= pages.length) {
      return pages.length
    }
    if (page < 1) {
      return 1
    } else {
      return page
    }
  }

  useEffect(() => {
    dispatch(getApplication(searchText, pageSend()))
  }, [dispatch, page, searchText])

  // handleValidSubmit
  const handleValidSubmit = (e, v) => {
    e.preventDefault()

    // let form_data = new FormData();
    // form_data.append('pic', picture, picture.name);
    // form_data.append('cv', picture, picture.name);
    // console.log(v);

    let url = `${API_URL}/student/student-application/`
    axios
      .post(url, v, {
        headers: {
          "content-type": "application/json",
          Authorization: "token " + sessionStorage.getItem("token"),
        },
      })
      .then(res => {
      })
      .catch(err =>
        console.log(err))
    // dispatch(createProduct(v, form_data))
  }

  const handleChange =(e)=>{
    const files = Array.from(e.target.files)

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
  }

  const handleValidSubmit2 = (v) => {
    console.log(v);

  }


  const statusRole = [
    {
      name: 'Passed',
      role: 'passed'
    },
    {
      name: 'Not Assigned Yet',
      role: 'not_assigned_yet'
    },
    {
      name: 'On Going',
      role: 'ongoing'
    },
    {
      name: 'Failed',
      role: 'failed'
    },
    {
      name: 'Submitted',
      role: 'submitted'
    },
    {
      name: 'Not Selected',
      role: 'not_selected'
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

  const columns = [
    {
      dataField: "company",
      text: "Company",
      sort: true,
    },
    {
      dataField: "position",
      text: "Vacancy Position",
    },
    {
      dataField: "last_date",
      text: "Last Date",
    },
    {
      dataField: "job_description",
      text: "Application Link",
    },
    {
      dataField: "action",
    },
  ]

  const applicationData = map(applications?.results, (item, index) => ({
    ...item,
    key: index,

    application_submitted: (
      item.application_submitted=== true? 'Submitted' : 'not submitted'
    ),

    fees_paid: (
      item.fees_paid === true ? <b className="text-success">Paid</b> : <b className="text-danger">not paid</b>
    ),

    action: (
      <div>
        <a
          href={`${item?.job_description}`}
          className="btn-success btn-sm"
          target="_blank"
          rel="noreferrer"
        >
          Apply Now
        </a>
      </div>
    ),
  }))

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ]

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  const handleSearch = e => {
    e.preventDefault()
    setSearchText(e.target.value)
  }

  return (
    <React.Fragment>
      {products?.results?.map((item) => (item.fees_paid =='True')) ?
        <>

          {products?.count !== 0 ? products?.results?.map((item, index) => (
            <div key={index}>

              <div className="page-content">
                <Container fluid>
                  <Row>
                    <Col lg="6" sm="12">
                      <WelcomeComp />
                    </Col>
                    <Col lg="6" sm="12">
                      <Card>
                        <CardBody>
                          <Row>
                            <h5 className="text-center">Download Modified Cv</h5>
                            <Col className="text-center">
                              <a href={item.company_cv} className="cvhov text-secondary" download>
                                <i className="bx bx-note" style={{fontSize: '10rem'}} />
                              </a>
                            </Col>
                          </Row>
                          <Row className="mt-5">
                            <a href={item.cv} className="text-center" download>Download original cv</a>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
                  <Vacancies />
              </div>
            </div>
          )) :
            <div>
              <Row>
        <Col xl="3"></Col>
        <Col lg={12}>

          <AvForm
            className="form-horizontal "
            onValidSubmit={(onSubmitProps, v) => {
              handleValidSubmit(onSubmitProps, v)
            }}
          >
            <h5>Personal Info:</h5>
            <Card className="mb-5">
              <CardBody>
                <div className="row mb-4">
                  <Col sm={3}>
                    <p className="mb-2">Student Name</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="student_name"
                      type="text"
                    />

                  </Col>
                  <Col sm={3}>
                  <p className="mb-2">Date Of Birth</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="dob"
                      type="date"
                    />
                  </Col>
                  <Col sm={3}>
                  <p className="mb-2">Phone Number</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="phone"
                      type="text"
                    />
                  </Col>
                  <Col sm={3}>
                  <p className="mb-2">Address</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="address"
                      type="textarea"
                    />
                  </Col>
                  <Col sm={3} className="mt-4">
                    <p className="mb-2">LinkedIn Username</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="linkedin_username"
                      type="text"
                    />
                  </Col>
                  <Col sm={3} className="mt-4">
                    <p className="mb-2">LinkedIn Password</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="linkedin_password"
                      type="text"
                    />
                  </Col>

                </div>
              </CardBody>
            </Card>

            <h5>University & Course Details</h5>
            <Card className="mb-5">
              <CardBody>
                <Row>
                  <Col sm={3}>
                    <p className="mb-2">University</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="university"
                      type="text"
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2">Campus</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="course_campus"
                      type="text"
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2">Course Title</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="course_title"
                      type="text"
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2">Course Duration</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="course_duration"
                      type="text"
                    />
                  </Col>
                  <Col sm={3} className="mt-4">
                    <p className="mb-2">Internship/Placement</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="working_type"
                      type="text"
                    />
                  </Col>
                  <Col sm={3} className="mt-4">
                    <p className="mb-2">Work Duration</p>
                    <AvField
                      
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="work_duration"
                      type="text"
                    />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <h5>Modules & Specifications</h5>
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
                          <th scope="row" className="pt-4" style={{fontSize: '14px', fontWeight: '400'}}>Module 1</th>
                          <td>
                          <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[0].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[0].status"
                              type="select"
                            >
                               {statusRole?.map((item, key) => (
                              <option key={key} value={item.role}>{item.name}</option>
                            ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 2</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[1].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[1].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 3</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[2].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[2].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>


                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 4</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[3].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[3].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 5</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[4].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[4].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 6</th>
                          <td>
                          <AvField
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              placeholder="enter subject"
                              name="specialization[5].title"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[5].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 7</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[6].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[6].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 8</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[7].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[7].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 9</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[8].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[8].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 10</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[9].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[9].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 11</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[10].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[10].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 12</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[11].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[11].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 13</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[12].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[12].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 14</th>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[13].title"
                              placeholder="enter subject"
                              type="text"
                            />
                          </td>
                          <td>
                            <AvField
                              
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[13].status"
                              type="select"
                            >
                              {statusRole?.map((item, key) => (
                                <option key={key} value={item.role}>{item.name}</option>
                              ))}
                            </AvField>

                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Row>
              </CardBody>
            </Card>

            <h5>Course Timeline</h5>
            <Card className="mb-5">
              <CardBody>  
                <Row>
                  <Col sm={3}>
                    <p className="mb-2" style={{fontWeight: '400', fontSize: '14px'}}>Course Start Date</p>
                    <AvField
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="course_start_date"
                      type="date"
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2" style={{fontWeight: '400', fontSize: '14px'}}>Course End Date</p>
                    <AvField
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="course_end_date"
                      type="date"
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2" style={{fontWeight: '400', fontSize: '14px'}}>Contract Sub. Date*</p>
                    <AvField
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="contract_submit_date"
                      type="date"
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2" style={{fontWeight: '400', fontSize: '14px'}}>Exp. Certificate Date*</p>
                    <AvField
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="expr_certi_submit_date"
                      type="date"
                    />
                  </Col>
                  <Col sm={3} className="mt-4">
                    <p className="mb-2" style={{fontWeight: '400', fontSize: '14px'}}>VISA Expiry Date*</p>
                    <AvField
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="visa_expiry_date"
                      type="date"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <h5>Student Favourite Job Sectors</h5>
            <Card className="mb-5">
              <CardBody>
                <div className="table-responsive">
                  <Table className="table mb-0 table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>1st Choice</th>
                        <td>
                          <AvField
                            
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            name="first_job_sector"
                            className="border-0"
                            placeholder="enter your first choice"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>2nd Choice</th>
                        <td>
                          <AvField
                            
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            name="second_job_sector"
                            className="border-0"
                            placeholder="enter your second choice"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>3rd Choice</th>
                        <td>
                          <AvField
                            
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="third_job_sector"
                            placeholder="enter your third choice"
                            type="text"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>

            <h5>Student Future Job roles</h5>
            <Card className="mb-5">
              <CardBody>
                <div className="table-responsive">
                  <Table className="table mb-0 table-bordered">

                    <tbody>
                      <tr>
                        <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>1st Role</th>
                        <td>
                          <AvField
                            
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="first_job_role"
                            placeholder="enter your first job role"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>2nd Role</th>
                        <td>
                          <AvField
                            
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="second_job_role"
                            placeholder="enter your second job role"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>3rd Role</th>
                        <td>
                          <AvField
                            
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="third_job_role"
                            placeholder="enter your third job role"
                            type="text"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>

            <h5>Questions based on students future job role</h5>
            <Card className="mb-5">
              <CardBody>
                <div className="table-responsive">
                  <Table className="table mb-0 table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row" style={{fontWeight: '400', fontSize: '14px'}}>Whats your motive to apply for the job 1 ?</th>
                        <td>
                          <AvField
                            
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="first_job_role_reason"
                            placeholder="enter your answer"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" style={{fontWeight: '400', fontSize: '14px'}}>Whats your motive to apply for the job 2 ?</th>
                        <td>
                          <AvField
                            
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="second_job_role_reason"
                            placeholder="enter your answer"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" style={{fontWeight: '400', fontSize: '14px'}}>Whats your motive to apply for the job 3 ?</th>
                        <td>
                          <AvField
                            
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="third_job_role_reason"
                            placeholder="enter your answer"
                            type="text"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Row>
                    <p>area for cv</p>  

                </Row>
              </CardBody>
            </Card>

            <Card className="mb-5">
              <CardBody>
                <div className="row mb-4">
                  <Col sm={3} className="mt-2">
                    <div>
                      <Button
                        type="submit"
                        color="success"
                        className="w-md"
                      >
                        {loading && (
                          <>
                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                          </>
                        )}
                        Submit
                      </Button>
                    </div>
                  </Col>
                </div>
              </CardBody>
            </Card>
          </AvForm>
          
        </Col>
        <Col xl="3"></Col>
      </Row>
            </div>
          }
        </> : <p>Please Pay The Fee First To Fill The Form</p>}
    </React.Fragment>
  )
}

StudentHome.propTypes = {
  analatics: PropTypes.array,
}

export default StudentHome
