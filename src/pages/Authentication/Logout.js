import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import { CardBody, Spinner } from "reactstrap"

//actions
import { logoutUser } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Notification } from "components/Common/Notification"

const Logout = props => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => ({
    user: state.Login.user,
  }))

  useEffect(() => {
    dispatch(logoutUser(props.history))
  }, [dispatch])

  if (!user) {
    Notification({
      type: "success",
      message: "Logged out successfully",
      title: "",
    })
  }

  return (
    <React.Fragment>
      <div className="container">
        <CardBody className="d-flex" style={{ height: "100vh" }}>
          <Spinner className="d-block m-auto" />
        </CardBody>
      </div>
    </React.Fragment>
  )
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Logout)
