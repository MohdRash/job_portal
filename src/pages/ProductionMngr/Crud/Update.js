import { AvField, AvForm } from "availity-reactstrap-validation"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { API_URL } from "helpers/api_methods"
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Label,
  NavItem,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap"

//actions
import { getProductionmngrDetail, updateProductionmngr, getProductionmngrs, createProductionmngr, createProductionmngrSuccess, createProductionmngrFail } from "store/actions"

//componets


const UpdateStoremanager = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const params = useParams()
  // const [state, setState] = useState(false)
  const [activeTab, setactiveTab] = useState(1)
  const [passedSteps, setPassedSteps] = useState([1])

  const { loading, productionmngrDetail, productionmngrs } = useSelector(state => ({
    loading: state.Storemngrs.loading,
    productionmngrDetail: state.Productionmngrs.productionmngrDetail,
    productionmngrs: state.Productionmngrs.productionmngrs,
  }))
  console.log(productionmngrDetail);
  console.log(productionmngrs);
  const [state, setState] = useState({
    company_cv: ''
  })

  console.log(state);
  console.log(state, productionmngrDetail?.student_other_detail?.id,);

  function handleValidSubmit(values, v) {
    dispatch(updateProductionmngr(v, productionmngrDetail.id, history))

    console.log(v);
  }

  function handleValidCvSubmit(values, v) {
    values.preventDefault()

    const createCv = {
      ...values,
      company_cv: company_cv,
    };

    dispatch(createProductionmngr(createCv, productionmngrDetail?.student_other_detail?.id, history))

    console.log(v);
  }



  // const handleValidCvSubmit = e => {
  //   e.preventDefault()
  //   console.log("v", e.target.file);

  //   // dispatch(createProductionmngr(v, productionmngrDetail?.student_other_detail?.id, history))

  //   console.log(state?.company_cv?.name);


  //   const form_data = new FormData()
  //   console.log("state");
  //   form_data.append("company_cv",  state?.company_cv, state?.company_cv) 


  //   let url = `${API_URL}/student/student-application/${productionmngrDetail?.student_other_detail?.id}/`
  //   // console.log("url : ", url);

  //   axios
  //     .patch(url, form_data, {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //         "enctype": "multipart/form-data",
  //         // "Access-Control-Allow-Credentials":true,
  //         // "credentials": 'include',
  //         Authorization: "token " + sessionStorage.getItem("token"),
  //       },
  //     })
  //     .then(res => {
  //       dispatch(createProductionmngrSuccess(res.data))
  //     })
  //     .catch(err => createProductionmngrFail(err))
  // }
  // console.log("ID", productionmngrDetail?.student_other_detail?.id);


  useEffect(() => {
    dispatch(getProductionmngrDetail(params.id))
  }, [dispatch, state])

  useEffect(() => {
    dispatch(getProductionmngrs())
  }, [dispatch])

  //dropdown for status
  const statusRole = [

    {
      stat: false,
      role: 'not paid'
    },
    {
      stat: true,
      role: 'paided'
    },
  ]


  return (
    <>
      <MetaTags>
        <title>{productionmngrDetail?.student_name} | Career Portal </title>
      </MetaTags>

      <Row>
        <Col xl="3"></Col>
        <Col lg={12}>
          <CardTitle className="h4 mb-4">Student form</CardTitle>

          <AvForm
            className="form-horizontal "
            onValidSubmit={(onSubmitProps, v) => {
              handleValidSubmit(onSubmitProps, v)
            }}
          >
            <Card className="mb-5">
              <CardBody>
                <div className="row mb-4">
                  <h5>Payment Status:</h5>
                  <Col sm={3} className="mt-3">
                    <AvField
                      id="horizontal-username-Input"
                      name="fees_paid"
                      type="select"
                      value={productionmngrDetail?.fees_paid !== true ? 'paided' : 'not paided'}
                    >
                      <option>choose payment status</option>
                      {statusRole?.map((item, key) => (
                        <option key={key} value={item.stat}>{item.role}</option>
                      ))}
                    </AvField>
                    <div className="mt-1">
                      <span>{productionmngrDetail?.fees_paid !== true ? <sm className='text-danger'>Note: student not paided the fee!</sm> : <sm className='text-warning'>Note: student already paided the fee!</sm>}</span>
                    </div>
                  </Col>
                  <Col sm={3} className="mt-2">
                    <div>
                      <Button
                        readOnly
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

            <h5>Personal Info:</h5>
            <Card className="mb-5">
              <CardBody>
                <div className="row mb-4">
                  <Col sm={3}>
                    <p className="mb-2">Student Name</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="username"
                      type="text"
                      value={productionmngrDetail.student_name || 'not entered'}
                    />

                  </Col>
                  <Col sm={3}>
                  <p className="mb-2">Date Of Birth</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="dob"
                      type="text"
                      value={productionmngrDetail.student_other_detail?.dob || 'not entered'}
                    />
                  </Col>
                  <Col sm={3}>
                  <p className="mb-2">Phone Number</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="phone"
                      type="text"
                      value={productionmngrDetail.student_other_detail?.phone || 'not entered'}
                    />
                  </Col>
                  <Col sm={3}>
                  <p className="mb-2">Address</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="address"
                      type="textarea"
                      value={productionmngrDetail.student_other_detail?.address || 'not entered'}
                    />
                  </Col>
                  <Col sm={3} className="mt-4">
                    <p className="mb-2">LinkedIn Username</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="linkedin_username"
                      type="text"
                      value={productionmngrDetail.student_other_detail?.linkedin_username || 'not entered'}
                    />
                  </Col>
                  <Col sm={3} className="mt-4">
                    <p className="mb-2">LinkedIn Password</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="linkedin_password"
                      type="text"
                      value={productionmngrDetail.student_other_detail?.linkedin_password || 'not entered'}
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
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="university"
                      type="text"
                      value={productionmngrDetail.student_other_detail?.university || 'not entered'}
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2">Campus</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="course_campus"
                      type="text"
                      value={productionmngrDetail.student_other_detail?.course_campus || 'not entered'}
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2">Course Title</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="course_title"
                      type="text"
                      value={productionmngrDetail.student_other_detail?.course_title || 'not entered'}
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2">Course Duration</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="course_duration"
                      type="text"
                      value={productionmngrDetail.student_other_detail?.course_duration || 'not entered'}
                    />
                  </Col>
                  <Col sm={3} className="mt-4">
                    <p className="mb-2">Internship/Placement</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="working_type"
                      type="text"
                      value={productionmngrDetail.student_other_detail?.working_type || 'not entered'}
                    />
                  </Col>
                  <Col sm={3} className="mt-4">
                    <p className="mb-2">Work Duration</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="work_duration"
                      type="text"
                      value={productionmngrDetail.student_other_detail?.work_duration || 'not entered'}
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
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[0].title"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[0]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[0].status"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[0]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 2</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[1].title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[1]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[1].status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[1]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 3</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[2].title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[2]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[2].status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[2]?.status || 'not entered'}
                            />


                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 4</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[3].title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[3]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[3].status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[3]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 5</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[4].title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[4]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[4].status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[4]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 6</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[5].title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[5]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[5].status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[5]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 7</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[6].title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[6]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="pecialization[6].status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[6]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 8</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[7].title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[7]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[7].status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[7]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 9</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[8].title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[8]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[8].status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[8]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 10</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[9].title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[9]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[9].status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[9]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 11</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[10]?.title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[10]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[10]?.status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[10]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 12</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[11]?.title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[11]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[11]?.status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[11]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 13</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[12]?.title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[12]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[12]?.status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[12]?.status || 'not entered'}
                            />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>Module 14</th>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[13]?.title"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[13]?.title || 'not entered'}
                            />
                          </td>
                          <td>
                            <AvField
                              readOnly
                              style={{fontWeight: '500', fontSize: '14px'}}
                              id="horizontal-username-Input"
                              className="border-0"
                              name="specialization[13]?.status"
                              placeholder="enter subject"
                              type="text"
                              value={productionmngrDetail?.student_other_detail?.specialization[13]?.status || 'not entered'}
                            />

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
                    <p className="mb-2">Course Start Date</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="course_start_date"
                      type="text"
                      value={productionmngrDetail?.student_other_detail?.course_start_date || 'not entered'}
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2" style={{fontWeight: '400', fontSize: '14px'}}>Course End Date</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="course_end_date"
                      type="text"
                      value={productionmngrDetail?.student_other_detail?.course_end_date || 'not entered'}
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2" style={{fontWeight: '400', fontSize: '14px'}}>Contract Sub. Date*</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="contract_submit_date"
                      type="text"
                      value={productionmngrDetail?.student_other_detail?.contract_submit_date || 'not entered'}
                    />
                  </Col>
                  <Col sm={3}>
                    <p className="mb-2" style={{fontWeight: '400', fontSize: '14px'}}>Exp. Certificate Date*</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="expr_certi_submit_date"
                      type="text"
                      value={productionmngrDetail?.student_other_detail?.expr_certi_submit_date || 'not entered'}
                    />
                  </Col>
                  <Col sm={3} className="mt-4">
                    <p className="mb-2" style={{fontWeight: '400', fontSize: '14px'}}>VISA Expiry Date*</p>
                    <AvField
                      readOnly
                      style={{fontWeight: '500', fontSize: '14px'}}
                      id="horizontal-username-Input"
                      name="visa_expiry_date"
                      type="text"
                      value={productionmngrDetail?.student_other_detail?.visa_expiry_date || 'not entered'}
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
                            readOnly
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            name="first_job_sector"
                            className="border-0"
                            type="text"
                            value={productionmngrDetail?.student_other_detail?.first_job_sector || 'not entered'}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>2nd Choice</th>
                        <td>
                          <AvField
                            readOnly
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            name="second_job_sector"
                            className="border-0"
                            type="text"
                            value={productionmngrDetail?.student_other_detail?.second_job_sector || 'not entered'}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>3rd Choice</th>
                        <td>
                          <AvField
                            readOnly
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="third_job_sector"
                            type="text"
                            value={productionmngrDetail?.student_other_detail?.third_job_sector || 'not entered'}
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
                            readOnly
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="first_job_role"
                            type="text"
                            value={productionmngrDetail?.student_other_detail?.first_job_role || 'not entered'}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>2<sup>nd</sup> Role</th>
                        <td>
                          <AvField
                            readOnly
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="second_job_role"
                            type="text"
                            value={productionmngrDetail?.student_other_detail?.second_job_role || 'not entered'}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="pt-4" style={{fontWeight: '400', fontSize: '14px'}}>3rd Role</th>
                        <td>
                          <AvField
                            readOnly
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="third_job_role"
                            type="text"
                            value={productionmngrDetail?.student_other_detail?.third_job_role || 'not entered'}
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
                            readOnly
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="first_job_role_reason"
                            type="text"
                            value={productionmngrDetail?.student_other_detail?.first_job_role_reason || 'not entered'}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" style={{fontWeight: '400', fontSize: '14px'}}>Whats your motive to apply for the job 2 ?</th>
                        <td>
                          <AvField
                            readOnly
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="second_job_role_reason"
                            type="text"
                            value={productionmngrDetail?.student_other_detail?.second_job_role_reason || 'not entered'}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" style={{fontWeight: '400', fontSize: '14px'}}>Whats your motive to apply for the job 3 ?</th>
                        <td>
                          <AvField
                            readOnly
                            style={{fontWeight: '500', fontSize: '14px'}}
                            id="horizontal-username-Input"
                            className="border-0"
                            name="third_job_role_reason"
                            type="text"
                            value={productionmngrDetail?.student_other_detail?.third_job_role_reason || 'not entered'}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </AvForm>
          <Card>
            <CardBody>
              <Row>
                <Col sm={6}>
                  <Label>Students CV</Label>
                  {productionmngrDetail?.student_other_detail?.cv ? (
                    <object data={productionmngrDetail?.student_other_detail?.cv} type="application/pdf" width="400" height="300">
                      <embed src={productionmngrDetail?.student_other_detail?.cv} width="400px" height="300px" />

                    </object>
                  ) : (
                    <p className="text-danger">This student didnt uploaded his/her cv</p>
                  )}

                </Col>
                <Col sm={6}>
                  <Label>Modified Students CV</Label>
                  {productionmngrDetail?.student_other_detail?.company_cv ? (
                    <object data={productionmngrDetail?.student_other_detail?.company_cv} type="application/pdf" width="400" height="300">
                      <embed src={productionmngrDetail?.student_other_detail?.company_cv} width="400px" height="300px" />
                    </object>
                  ) : (

                    <form className="form-horizontal">
                      <div className="row mb-4">
                        <Label htmlFor="image" className="col-sm-3 col-form-label">
                          Modified Student cv
                        </Label>
                        <Col sm={9}>
                          <input
                            name="company_cv"
                            type="file"
                            id="image"
                            accept="file/pdf"
                            className="form-control"
                            onChange={(e) => setState({...state,company_cv:e.target.files})}
                          />
                        </Col>
                        <Col sm={2}>
                          <div>
                            <Button type="submit" color="success" className="w-md" onClick={handleValidCvSubmit}>
                              {loading && (
                                <>
                                  <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                </>
                              )}
                              Upload CV
                            </Button>
                          </div>
                        </Col>
                      </div>
                    </form>

                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xl="3"></Col>
      </Row>
    </>
  )
}

export default UpdateStoremanager
