import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom"

// Import Routes all
import {
  publicRoutes,
  commonRoute,
  AdminProtectedRoutes,
  dealerRoutes
} from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import "./assets/scss/custom.scss"

const App = props => {
  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Role = sessionStorage.getItem("role")
  const token = sessionStorage.getItem('token')

  function MyRoute() {
    let Routes = commonRoute
    switch (Role) {
      case "admin":
        Routes = AdminProtectedRoutes
        break
      case "student":
        Routes = dealerRoutes
        break
      default:
        Routes = commonRoute
        break
    }
    return Routes
  }

  const Layout = getLayout()
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}
          {MyRoute()?.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
          {!token && <Route render={() => <Redirect to={{ pathname: "/login" }} />} />}

          <Route render={() => <Redirect to={{ pathname: "/404" }} />} />,
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
