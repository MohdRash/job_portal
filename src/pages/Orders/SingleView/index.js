import React from "react"
import { Container, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import Breadcrumbs from "../../../components/Common/Breadcrumb"
import OrderStatus from "./OrderStatus"
import OrderItems from "./OrderItems"

function OrderDetails() {
  return (
    <>
      <MetaTags>
        <title>Order | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Orders" breadcrumbItem="Order" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <OrderStatus />
            </Row>
            <Row>
              <OrderItems />
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default OrderDetails
