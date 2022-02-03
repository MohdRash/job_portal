import { AvField, AvForm } from "availity-reactstrap-validation"
import axios from "axios"
import React,{ useEffect, useState } from "react"
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
import { getApplication, getApplicationDetail } from "store/actions"

//componets


const ApplicationDetail = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const params = useParams()
  // const [state, setState] = useState(false)
  const [activeTab, setactiveTab] = useState(1)
  const [passedSteps, setPassedSteps] = useState([1])

  const { loading, applicationDetails, application } = useSelector(state => ({
    loading: state.Products.loading,
    applicationDetails: state.Products.applicationDetails,
    applications: state.Products.applications
  }))
  console.log(applicationDetails);


  function handleValidSubmit() {
   
  }

  function handleValidCvSubmit() {
    
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
    dispatch(getApplicationDetail(params.id))
  }, [dispatch])

  useEffect(() => {
    dispatch(getApplication())
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
        <title>About Application | Career </title>
      </MetaTags>

      <div className="page-content">
        {/* <Breadcrumbs
          title="All Job Applications"
          breadcrumbItem="About Applications"
        /> */}
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
                          {applicationDetails?.student_name}
                        </h5>
                      </Col>
                      <Col lg="4" md="4" sm="6">
                        <Label>Applied Company</Label>
                        <h5 className="mb-1">
                          {applicationDetails?.company}
                        </h5>
                      </Col>
                      <Col lg="4" md="4" sm="6">
                        <Label>Applied Position</Label>
                        <h5 className="mb-1">
                          {applicationDetails?.position}
                        </h5>
                      </Col>
                      <Col lg="4" md="4" sm="6">
                        <Label>Last date</Label>
                        <h5 className="mb-1">
                          {applicationDetails?.last_date}
                        </h5>
                      </Col>
                      <Col lg="4" md="4" sm="6">
                        <Label>Job Description</Label>
                        <h5 className="mb-1">
                          {applicationDetails?.job_description}
                        </h5>
                      </Col>
                      <Col lg="4" md="4" sm="6">
                        <Label>Job Status</Label>
                        <h5 className="mb-1">
                          {applicationDetails?.stage}
                        </h5>
                      </Col>
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

export default ApplicationDetail
