import React from "react"
import { Container } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import DatatableTables from "./DatatableTables"
import Breadcrumbs from "../../components/Common/Breadcrumb"

function Supervisors() {
  return (
    <>
      <MetaTags>
        <title>All Supervisors | Loha </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs title="Dashboard" breadcrumbItem="All Supervisors" />
        <Container fluid>
          <div className="container-fluid">
            <DatatableTables />
          </div>
        </Container>
      </div>
    </>
  )
}

export default Supervisors
