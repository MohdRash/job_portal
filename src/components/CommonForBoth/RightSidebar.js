import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import SimpleBar from "simplebar-react"
import { Link } from "react-router-dom"

//action
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarThemeImage,
  changeSidebarType,
  changePreloader,
  changeTopbarTheme,
  showRightSidebarAction,
} from "../../store/actions"

//constants
import { layoutTypes } from "../../constants/layout"

import "../../components/CommonForBoth/rightbar.scss"

const RightSidebar = props => {
  const onCloseRightBar = () => {
    const { onClose } = props
    if (onClose) {
      onClose()
    }
  }
  return (
    <React.Fragment>
      <SimpleBar style={{ height: "900px" }}>
        <div data-simplebar className="h-100">
          <div className="rightbar-title px-3 py-4">
            <Link
              to="#"
              onClick={e => {
                onCloseRightBar()
              }}
              className="right-bar-toggle float-end"
            >
              <i className="mdi mdi-close noti-icon" />
            </Link>
          </div>
          <div className="p-4">
            <div className="radio-toolbar">
              <input
                type="radio"
                id="radioVertical"
                name="radioFruit"
                value={layoutTypes.VERTICAL}
                checked={props.layoutType === layoutTypes.VERTICAL}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeLayout(e.target.value)
                  }
                }}
              />
              <label className="me-1" htmlFor="radioVertical">
                Vertical
              </label>
              <input
                type="radio"
                id="radioHorizontal"
                name="radioFruit"
                value={layoutTypes.HORIZONTAL}
                checked={props.layoutType === layoutTypes.HORIZONTAL}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeLayout(e.target.value)
                  }
                }}
              />
              <label htmlFor="radioHorizontal">Horizontal</label>
            </div>
          </div>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

RightSidebar.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changePreloader: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarThemeImage: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  isPreloader: PropTypes.any,
  layoutType: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarThemeImage: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  topbarTheme: PropTypes.any,
  onClose: PropTypes.func,
}

const mapStateToProps = state => {
  return { ...state.Layout }
}

export default connect(mapStateToProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarThemeImage,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  changePreloader,
  showRightSidebarAction,
})(RightSidebar)
