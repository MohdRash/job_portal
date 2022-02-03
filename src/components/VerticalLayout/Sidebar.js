import PropTypes from "prop-types"
import React from "react"
import { connect, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import { Link } from "react-router-dom"
import logo from "../../assets/images/logo/LOHA.png"
import logo_oa from "../../assets/images/logo/loha_oa.png"

const Sidebar = props => {
  const { leftMenu } = useSelector(state => ({
    leftMenu: state.Layout.leftMenu,
  }))
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/dashboard" className="logo logo-dark">
            <span className="logo-sm">
              {leftMenu ? (
                <img src={logo_oa} alt="lohalogo" height="18" />
              ) : (
                <img src={logo} alt="lohalogo" height="22" />
              )}
            </span>
            <span className="logo-lg">
              {leftMenu ? (
                <img src={logo_oa} alt="lohalogo" height="18" />
              ) : (
                <img src={logo} alt="lohalogo" height="22" />
              )}

              {/* <img src={logoDark} alt="" height="17" /> */}
            </span>
          </Link>

          <Link to="/dashboard" className="logo logo-light">
            <span className="logo-sm">
              <img src={logo} alt="" height="22" />

              {/* <img src={logoLightSvg} alt="" height="22" /> */}
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" height="22" />

              {/* <img src={logoLightPng} alt="" height="19" /> */}
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
