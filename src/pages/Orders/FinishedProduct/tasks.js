import React, { useState, useEffect } from "react"
import { Col, Card, CardBody, Nav, NavItem, NavLink } from "reactstrap"
import classnames from "classnames"
import DatatableTables from "./DatatableTables"
import SimpleBar from "simplebar-react"

import CreateFinisedProduct from "./Create"

const FinishedProductList = props => {
  const [activeTab, setActiveTab] = useState("1")
  const [roleHandle, setroleHandle] = useState(false)

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  const Role = sessionStorage.getItem("role")

  const myParams = window.location.search

  useEffect(() => {
    if (Role == "admin") {
      setroleHandle(true)
    }
    if (Role == "productionmanager") {
      setroleHandle(true)
    }
    if (Role == "qualitychecker") {
      setroleHandle(true)
    }
  }, [roleHandle])

  useEffect(() => {
    if (myParams == "?create") {
      setActiveTab("2")
    } else {
      setActiveTab("1")
    }
  }, [myParams])

  return (
    <React.Fragment>
      <Col xl="12">
        <Card>
          <CardBody>
            <Nav pills className="bg-light rounded">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "1",
                  })}
                  onClick={() => {
                    toggleTab("1")
                  }}
                >
                  Tested Products
                </NavLink>
              </NavItem>
              {roleHandle == true && (
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "2",
                    })}
                    onClick={() => {
                      toggleTab("2")
                    }}
                  >
                    Add QC Checked Product
                  </NavLink>
                </NavItem>
              )}
            </Nav>

            <div className="mt-4">
              <SimpleBar>
                <div className="table-responsive">
                  {activeTab == "1" && (
                    <div className="container-fluid">
                      <DatatableTables />
                    </div>
                  )}
                  {activeTab == "2" && <CreateFinisedProduct setActiveTab={setActiveTab} />}
                </div>
              </SimpleBar>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default FinishedProductList
