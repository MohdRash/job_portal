import React from "react"
import { MetaTags } from "react-meta-tags"
import { Container } from "reactstrap"

//componetns
import AdminDashboard from "./AdminDashboard"
import DealerDashboard from "./DealerDashboard"
import StudentHome from "./DealerDashboard/home"
import DefualtComponent from "./StudentDashboard/DefualtComponent"

function index() {
  const Role = sessionStorage.getItem("role")

  function MyDashboard() {
    let Dashboard = <DefualtComponent />
    switch (Role) {
      case "admin":
        Dashboard = <AdminDashboard />
        break
      
      case "student":
        Dashboard = <StudentHome />
        break

    default:
        // Dashboard = <DefualtComponent />
        // break
        Dashboard = <StudentHome />
        break
    }
    return Dashboard
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Career Portal | Home</title>
        </MetaTags>
        <Container fluid>
          {Role=="admin"? <h4>Dashboard</h4>: ''}
        </Container>
        {MyDashboard()}
      </div>
    </React.Fragment>
  )
}

export default index
