import React from "react"
import PropTypes from "prop-types"
import { Link, useHistory } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const Breadcrumb = props => {
  const history = useHistory()
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-2 font-size-18 d-flex"
            style={{ cursor: "pointer" }}
            onClick={() => history.goBack()}>

            {" "}
            <i
              className="fas fa-arrow-left mx-3 bx-fade-left"

            ></i>
            {props.breadcrumbItem}
          </h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0 d-flex justify-content-end mt-4">
              <BreadcrumbItem>
                <Link to="#">{props.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to="#">{props.breadcrumbItem}</Link>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
}

export default Breadcrumb
