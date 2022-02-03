import React, { useEffect, useState } from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { getProducts, getApplication } from "store/actions"
import profileImg from "../../../assets/images/profile-img.png"

const WelcomeComp = () => {
  const dispatch = useDispatch()

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

  useEffect(() => {
    dispatch(getApplication())
  }, [dispatch])

  return (
    <React.Fragment>
      {products?.results?.map((item, index) => (
        <>
          <Card className="overflow-hidden">
            <div className="bg-primary bg-soft">
              <Row>
                <Col xs="7">
                  <div className="text-primary p-3">
                    <h5 className="text-primary">Welcome Back !</h5>
                    <p>We Wish You Best For Your Future</p>
                  </div>
                </Col>
                <Col xs="5" className="align-self-end">
                  <img src={profileImg} alt="" className="img-fluid" />
                </Col>
              </Row>
            </div>
            <CardBody className="pt-0">
              <Row>
                <Col sm="4">
                  <div className="avatar-md profile-user-wid mb-4">
                    <img
                      src={item.profilepic}
                      alt=""
                      className="img-thumbnail rounded-circle"
                    />
                  </div>
                  <h5 className="font-size-15 text-truncate">{item.first_name} {item.last_name}</h5>
                  <p className="text-muted mb-0 text-truncate">Ph: {item.phone}</p>
                </Col>

                <Col sm="8">
                  <div className="pt-4">
                    <Row>
                      <Col xs="6">
                      <p className="text-muted mb-0">Vacancies</p>
                        <h5 className="font-size-15">{applications.count}</h5>
                      </Col>
                      <Col xs="6">
                        <p className="text-muted mb-0">VISA Expiry Date</p>
                        <h5 className="font-size-15">{item.visa_expiry_date}</h5>
                      </Col>
                    </Row>
                    <div className="mt-4">
                      <Link
                        to="/student/fulldetail"
                        className="btn btn-primary  btn-sm"
                      >
                        View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </>
      ))}
      
    </React.Fragment>
  )
}
export default WelcomeComp
