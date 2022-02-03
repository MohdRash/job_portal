import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"
import { connect, useSelector } from "react-redux"
import { map } from "lodash"
import { withTranslation } from "react-i18next"

//components
import { mySideBar } from "components/VerticalLayout/sidebarData"

const Navbar = props => {
  const { orders } = useSelector(state => ({
    orders: state.Orders.orders,
  }))
  const pendingOrder = orders?.results?.filter(item => item.status == "Pending")

  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })
  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  const Role = sessionStorage.getItem("role")

  function sidebarProtected() {
    let sidebar = []
    switch (Role) {
      case "admin":
        sidebar = mySideBar
        break
      case "productionmanager":
        sidebar = mySideBar?.filter(
          sidebar => sidebar.heading !== "Production Manager"
        )
        break
      case "supervisor":
        sidebar = supervisorSidebar()
        break
      case "storemanager":
        sidebar = storeManagerSidebar()

        break
      case "dealer":
        sidebar = dealerSidebar()
        break
      case "qualitychecker":
        sidebar = mySideBar?.filter(
          sidebar => sidebar.heading == "Finished Products"
        )
        break
      default:
        sidebar = commonRoute
        break
    }
    return sidebar
  }

  function dealerSidebar() {
    const sidebar = mySideBar?.filter(
      sidebar => sidebar.heading == "Orders" || sidebar.heading == "Product"
    )
    sidebar.forEach(bar => {
      bar.subTitles = bar.subTitles.filter(
        subTitle => subTitle.title !== "Create Product"
      )
    })
    const sideBarUpdated = {
      ...sidebar[0],
      badgeValue: pendingOrder?.length,
    }

    return [{ ...sideBarUpdated }, { ...sidebar[1] }]
  }

  function storeManagerSidebar() {
    const sidebar = mySideBar?.filter(
      sidebar => sidebar.heading == "Product" || sidebar.heading == "Store"
    )
    sidebar.forEach(bar => {
      bar.subTitles = bar.subTitles.filter(
        subTitle => subTitle.title !== "Create Product"
      )
    })
    return sidebar
  }

  function supervisorSidebar() {
    const sidebar = mySideBar?.filter(
      sidebar =>
        sidebar.heading == "Product" || sidebar.heading == "Finished Products" || sidebar.heading == "Work Schedules"
    )
    sidebar.forEach(bar => {
      bar.subTitles = bar.subTitles.filter(
        subTitle => subTitle.title !== "Create Product"
      )
    })
    return sidebar
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none "
                    to="/dashboard"
                  >
                    <i className="bx bx-home-circle me-2"></i>
                    {props.t("Dashboard")} {props.menuOpen}
                  </Link>
                </li>

                {map(sidebarProtected(), (item, index) => (
                  <li className="nav-item dropdown" key={index}>
                    <Link
                      to="/#"
                      className="nav-link dropdown-togglez arrow-none d-flex"
                    >
                      <i className={`bx bxs-${item.iconClass} bx-sm me-2`}></i>
                      {/* {props.t(`${item?.heading}`)}{" "} */}
                      <div className="arrow-down "></div>
                    </Link>
                    <div className={classname("dropdown-menu")}>
                      {map(item?.subTitles, (title, index) => (
                        <Link
                          key={index}
                          to={title?.routeLink}
                          className="dropdown-item"
                        >
                          {props.t(`${title?.title}`)}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
