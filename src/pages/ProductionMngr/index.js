import React from "react"
import { Container } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import DatatableTables from "./DatatableTables"

function ProductionManager() {
  return (
    <>
      <MetaTags>
        <title>All Students | Career </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs
          title="Dashboard"
          breadcrumbItem="All Students"
        />
        <Container fluid>
          <div className="container-fluid">
            <DatatableTables />
          </div>
        </Container>
      </div>
    </>
  )
}

export default ProductionManager
