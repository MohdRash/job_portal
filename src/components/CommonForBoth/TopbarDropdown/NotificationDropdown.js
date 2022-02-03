import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//i18n
import { withTranslation } from "react-i18next"
import { useSelector } from "react-redux"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const Role = sessionStorage.getItem("role")

  const { orders } = useSelector(state => ({
    orders: state.Orders.orders,
  }))

  const ApprovedOrders = orders?.results?.filter(
    item => item.status == "Approved"
  )

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon "
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          <span className="badge bg-danger rounded-pill">3</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <a href="#!" className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {Role == "dealer" && (
              <Link to="" className="text-reset notification-item">
                <div className="media">
                  <div className="avatar-xs me-3">
                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                      <i className="bx bx-cart" />
                    </span>
                  </div>
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">
                      {props.t(
                        `You Have ${ApprovedOrders?.length} Approved Orders`
                      )}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {props.t("If several languages coalesce the grammar")}
                      </p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />{" "}
                        {props.t("3 min ago")}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </SimpleBar>
          {/* <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              {props.t("View all")}{" "}
            </Link>
          </div> */}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
