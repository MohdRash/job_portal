import React from "react"
import { Container } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import Breadcrumbs from "../../../components/Common/Breadcrumb"
import FinishedProductList from "./tasks"

function FinishedProduct() {
  return (
    <>
      <MetaTags>
        <title>Tested Products | Loha </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs title="Products" breadcrumbItem="Tested Products" />
        <Container fluid>
          <FinishedProductList />
        </Container>
      </div>
    </>
  )
}

export default FinishedProduct
