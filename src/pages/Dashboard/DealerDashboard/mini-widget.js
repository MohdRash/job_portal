import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Col, Card, CardBody, Spinner, Media, Row, Container, Label, Input, Table, TabPane, Form, TabContent, NavItem, Button, CardTitle } from "reactstrap"
import { map, range } from "lodash"
import classnames from "classnames"
import { MetaTags } from "react-meta-tags"
import UpdateStoremanager from "./Update"

import { getProducts, createProduct, getApplication } from "store/actions"
import { AvField, AvForm } from "availity-reactstrap-validation"
import { API_URL } from "helpers/api_methods"
import axios from "axios"
import MyPagination from "components/Common/MyPagination"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

const MiniWidget = () => {
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
                    <Card>
                      <CardBody>
                        <Row>
                          <Col lg="6" md="6" sm="12" xs="7" className="mb-4">
                            <Media>
                              <Col lg="4" md="3" sm="8" xs="6">
                                <div className="me-3">
                                  <img
                                    src={item?.profilepic}
                                    alt=""
                                    className="avatar-md rounded-circle img-thumbnail"
                                  />
                                </div>
                              </Col>
                              <Col lg="6" md="6" sm="12" xs="12">
                                <Media className="align-self-center" body>
                                  <div className="text-muted">
                                    <h5 className="mb-1">
                                      {item?.first_name} {item?.last_name}
                                    </h5>
                                    <p className="mb-0 text-capitalize">
                                      Email: {item?.student_email}
                                    </p>
                                    <p className="mb-0 text-capitalize">
                                      Phone: {item?.phone}
                                    </p>
                                  </div>
                                </Media>
                              </Col>
                            </Media>
                          </Col>
                          <Col lg="6" md="6" className="pt-2">
                            <Media>
                              <div>
                                <Label>VISA Expiry Date</Label>
                                <h5>{item.visa_expiry_date || 'not entered'}</h5>
                              </div>
                            </Media>
                          </Col>
                          <a className="text-blue" style={{width: '200px'}} onClick={printme}>Download Info</a>
                        </Row>
                      </CardBody>
                    </Card>
                    <Row>
                      <Col xl="12">
                        <Card>
                          <CardBody>
                            <Row>
                              <h4 className="pb-2">Student Info:</h4>
                              <Col lg="4" md="4" sm="6" className="mb-4">

                                <Label>Address</Label>
                                <h5 className="mb-1">
                                  {item?.address || 'no data provided'}
                                </h5>
                              </Col>
                              
                              <Col lg="4" md="4" sm="6">
                                <Label>Contact Number</Label>
                                <h5 className="mb-1">
                                  {item?.phone || 'no data provided'}
                                </h5>
                              </Col>
                              <Col lg="4" md="4" sm="6">
                                <Label>Univerity</Label>
                                <h5 className="mb-1">
                                  {item?.university || 'no data provided'}
                                </h5>
                              </Col>
                              <Col lg="4" md="4" sm="6">
                                <Label>Campus</Label>
                                <h5 className="mb-1">
                                  {item?.course_campus || 'no data provided'}
                                </h5>
                              </Col>
                              <Col lg="4" md="4" sm="6">
                                <Label>VISA Expiry Date</Label>
                                <h5 className="mb-1">
                                  {item?.visa_expiry_date || 'no data provided'}
                                </h5>
                              </Col>
                              <Col className="mt-2" lg="4" md="4" sm="6">
                                <Label>Course Name</Label>
                                <h5 className="mb-1">
                                  {item?.course_title || 'no data provided'}
                                </h5>
                              </Col>
                              <Col className="mt-2" lg="4" md="4" sm="6">
                                <Label>Course Start Date</Label>
                                <h5 className="mb-1">
                                  {item?.course_start_date || 'no data provided'}
                                </h5>
                              </Col>
                              <Col className="mt-2" lg="4" md="4" sm="6">
                                <Label>Course End Date</Label>
                                <h5 className="mb-1">
                                  {item?.course_end_date || 'no data provided'}
                                </h5>
                              </Col>
                              <Col className="mt-2" lg="4" md="4" sm="6">
                                <Label>LinkedIn username</Label>
                                <h5 className="mb-1">
                                  {item?.linkedin_username || 'no data provided'}
                                </h5>
                              </Col>
                              <Col className="mt-2" lg="4" md="4" sm="6">
                                <Label>LinkedIn password</Label>
                                <h5 className="mb-1">
                                  {item?.linkedin_password || 'no data provided'}
                                </h5>
                              </Col>

                              <Row className="mt-5">
                                <h4>Specialized In:</h4>
                                  <div className="table-responsive mb-4">
                                    <Table className="table mb-5 vh-200 table-bordered">
                                      <thead className="text-center">
                                        <tr>
                                          <th><i className="bx bx-cctv" /> All Modules</th>
                                          <th><i className="bx bx-eraser" /> Subject</th>
                                          <th><i className="bx bx-stats" /> Status</th>
                                        </tr>
                                      </thead>
                                      <tbody className="text-center">
                                        <tr>
                                          <th scope="row" className="pt-4">Module 1</th>
                                          <td>{item.specialization[0]?.title}</td>
                                          <td>{item?.specialization[0]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 2</th>
                                          <td>{item?.specialization[1]?.title}</td>
                                          <td>{item?.specialization[1]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 3</th>
                                          <td>{item?.specialization[2]?.title}</td>
                                          <td>{item?.specialization[2]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 4</th>
                                          <td>{item?.specialization[3]?.title}</td>
                                          <td>{item?.specialization[3]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 5</th>
                                          <td>{item?.specialization[4]?.title}</td>
                                          <td>{item?.specialization[4]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 6</th>
                                          <td>{item?.specialization[5]?.title}</td>
                                          <td>{item?.specialization[5]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 7</th>
                                          <td>{item?.specialization[6]?.title}</td>
                                          <td>{item?.specialization[6]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 8</th>
                                          <td>{item?.specialization[7]?.title}</td>
                                          <td>{item?.specialization[7]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 9</th>
                                          <td>{item?.specialization[8]?.title}</td>
                                          <td>{item?.specialization[8]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 10</th>
                                          <td>{item?.specialization[9]?.title}</td>
                                          <td>{item?.specialization[9]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 11</th>
                                          <td>{item?.specialization[10]?.title}</td>
                                          <td>{item?.specialization[10]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 12</th>
                                          <td>{item?.specialization[11]?.title}</td>
                                          <td>{item?.specialization[11]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 13</th>
                                          <td>{item?.specialization[12]?.title}</td>
                                          <td>{item?.specialization[12]?.status}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" className="pt-4">Module 14</th>
                                          <td>{item?.specialization[13]?.title}</td>
                                          <td>{item?.specialization[13]?.status}</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                              </Row>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Card>
                        <CardBody>
                          <Row>
                            <h4 className="pb-2">Application Info:</h4>
                            <Col lg="4" md="4" sm="6">
                              <Label>Applied Company Name</Label>
                              <h5 className="mb-1">
                                {item?.company_name || 'no data provided'}
                              </h5>
                            </Col>
                            <Col lg="4" md="4" sm="6">
                              <Label>Exp. Certificates Submision Date</Label>
                              <h5 className="mb-1">
                                {item?.expr_certi_submit_date || 'no data provided'}
                              </h5>
                            </Col>
                            <Col lg="4" md="4" sm="6">
                              <Label>Contract Submision Date</Label>
                              <h5 className="mb-1">
                                {item?.contract_submit_date || 'no data provided'}
                              </h5>
                            </Col>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>Work Type</Label>
                              <h5 className="mb-1">
                                {item?.working_type || 'no data provided'}
                              </h5>
                            </Col>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>Work Duration</Label>
                              <h5 className="mb-1">
                                {item?.work_duration || 'no data provided'}
                              </h5>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Row>
                    <Row>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>First Job Role</Label>
                              <h5 className="mb-1">
                                {item?.first_job_role || 'no data provided'}
                              </h5>
                            </Col>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>First Job Sector</Label>
                              <h5 className="mb-1">
                                {item?.first_job_sector || 'no data provided'}
                              </h5>
                            </Col>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>Reason For Choosing {item?.first_job_sector}</Label>
                              <h5 className="mb-1">
                                {item?.first_job_role_reason || 'no data provided'}
                              </h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>Second Job Role</Label>
                              <h5 className="mb-1">
                                {item?.second_job_role || 'no data provided'}
                              </h5>
                            </Col>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>Second Job Sector</Label>
                              <h5 className="mb-1">
                                {item?.second_job_sector || 'no data provided'}
                              </h5>
                            </Col>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>Reason For Choosing {item?.second_job_sector}</Label>
                              <h5 className="mb-1">
                                {item?.second_job_role_reason || 'no data provided'}
                              </h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>Third Job Role</Label>
                              <h5 className="mb-1">
                                {item?.third_job_role || 'no data provided'}
                              </h5>
                            </Col>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>Third Job Sector</Label>
                              <h5 className="mb-1">
                                {item?.third_job_sector || 'no data provided'}
                              </h5>
                            </Col>
                            <Col className="mt-2" lg="4" md="4" sm="6">
                              <Label>Reason For Choosing {item?.third_job_sector}</Label>
                              <h5 className="mb-1">
                                {item?.third_job_role_reason || 'no data provided'}
                              </h5>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Row>
                    <Row>
                      <Col className="col-12">
                        <Card>
                          <CardBody>
                          <h4 className="pb-3">Vacancies Available:</h4>
                            <ToolkitProvider
                              keyField="id"
                              columns={columns}
                              data={applicationData}
                              search
                            >
                              {toolkitProps => (
                                <React.Fragment>
                                  <Row hidden className="mb-2">
                                    <Col md="4">
                                      <div className="search-box me-2 mb-2 d-inline-block">
                                        <div className="position-relative">
                                          <form
                                            className="app-search d-lg-block"
                                            onChange={e => handleSearch(e)}
                                          >
                                            <div className="position-relative">
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search a name..."
                                                defaultValue={searchText}
                                              />
                                              <span className="bx bx-search-alt" />
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                  
                                    <>
                                      <Row>
                                        <Col xl="12">
                                          <div className="table-responsive">
                                            <BootstrapTable
                                              keyField={"id"}
                                              responsive
                                              bordered={false}
                                              striped={false}
                                              defaultSorted={defaultSorted}
                                              selectRow={selectRow}
                                              classes={"table align-middle table-nowrap"}
                                              headerWrapperClasses={"thead-light"}
                                              {...toolkitProps.baseProps}
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <MyPagination
                                        pages={pages}
                                        clcickedPage={page}
                                        onNunClick={(item) => setPage(item)}
                                        onNextClick={() => setPage(page + 1)}
                                        onPrevClick={() => setPage(page - 1)}
                                        onFastNextClick={() => setPage(pages.length)}
                                        onFastPrevClick={() => setPage(1)}
                                        apiPage={pageSend}
                                      />
                                    </>
                                </React.Fragment>
                              )}
                            </ToolkitProvider>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    
                    {/* <UpdateStoremanager /> */}
                </Container>
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

MiniWidget.propTypes = {
  analatics: PropTypes.array,
}

export default MiniWidget
