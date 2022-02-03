import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

// Redux
import { withRouter, Link, useHistory } from "react-router-dom"

//images
import user1 from "../../../assets/images/logo/user.png"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const Roll = sessionStorage.getItem("role")

  const handleLogout = async () => {
    sessionStorage.clear("token")
    window.location.reload(false);
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">
            {sessionStorage.getItem("user")}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <Link to="/profile">
            <DropdownItem>
              <i className="bx bx-user font-size-16 align-middle me-1" />
              {props.t("Profile")}
            </DropdownItem>
          </Link>
          {Roll == "supervisor" && (
            <DropdownItem tag="a" href="/profile?wallet">
              <i className="bx bx-wallet font-size-16 align-middle me-1" />
              {props.t("My Wallet")}
            </DropdownItem>
          )}

          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout All Devices")}</span>
          </Link>
          <span className="dropdown-item" style={{ cursor: "pointer" }} onClick={handleLogout}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout On This Device")}</span>
          </span>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  // const { error, success } = state.
  return
}

export default withRouter(withTranslation()(ProfileMenu))
