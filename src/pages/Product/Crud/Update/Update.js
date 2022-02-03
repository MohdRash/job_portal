import React from "react"
import { MetaTags } from "react-meta-tags"
import { Col, Container, Row } from "reactstrap"

//componenets
import Breadcrumbs from "../../../../components/Common/Breadcrumb"
import RawmaterialForm from "./RawmaterialForm"
import InputFroms from "./InputFroms"
import OtherCost from "./OtherCost"
import ProductCard from "./ProductCard"

const UpdateProduct = () => {
  return (
    <>
      <MetaTags>
        <title>Product | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Products" breadcrumbItem="Update Product" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col lg={8} md={12}>
                <ProductCard />
                <InputFroms />
              </Col>

              <Col xl="4">
                <OtherCost />
                <RawmaterialForm />
              </Col>
            </Row>
            <Row></Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default UpdateProduct
