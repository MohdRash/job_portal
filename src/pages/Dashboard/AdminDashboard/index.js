import React, { useEffect, useState } from "react"
import { Badge, Card, CardBody, Col, Form, Input, Label, NavItem, Row, TabContent, Table, TabPane } from "reactstrap"
import { useDispatch } from "react-redux"

//action
import {
  getDashboardData,
  getFinishedProduct,
  getOrders,
  getProducts,
} from "store/actions"

//components
import PersonalCv from "./PersonalCv"
import CompanyCv from "./CompanyCv"
import FinishedProductList from "./FinishedProduct"
import StudentLevelData from "./StudentLevelData"
import MiniWidget from "./mini-widget"
import PendingOrder from "./PendingOrder"
import MiniCards from "./mini-card"
import MonthlyChart from "./MonthlyChart"
import YearlyChart from "./YearlyChart"
import { AvField, AvForm } from "availity-reactstrap-validation"
import { Link, NavLink } from "react-router-dom"
import classnames from "classnames"
import WelcomeComp from "./WelcomeComp"

function AdminDashboard() {
  const dispatch = useDispatch()
  const [activeTab, setactiveTab] = useState(1)
  const [passedSteps, setPassedSteps] = useState([1])

  //repeater
  const [rows1, setrows1] = useState([{ id: 1 }])
  const [formRows, setFormRows] = useState([{ id: 1 }])

  useEffect(() => {
    dispatch(getFinishedProduct("", ""))
    dispatch(getOrders("", ""))
    dispatch(getProducts())
    dispatch(getDashboardData())
  }, [dispatch])

  function handleValidSubmit(values) {

    const updateSettingsData = {
      homeShop: settings?.homeShop?._id,
      returnDuration: values.returnDuration,
      shopSearchDistance: parseFloat(values.shopSearchDistance),
      privacyPolicy: values.privacyPolicy,
    };

    dispatch(updateSettings(updateSettingsData, settings?._id, history));
  }

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  }

  

  

  return (
    <>
    <Row>
      <Col lx="4" lg="4">
        <PendingOrder />
        {/* <OutOfStockItems /> */}
        <FinishedProductList />
      </Col>
      <Col lx="8" lg="8">
        <Row>
          <MiniWidget />
        </Row>
        <Row>
          <MiniCards />
        </Row>
        <MonthlyChart />
        <YearlyChart />
      </Col>
      {/* <Transaction /> */}
    </Row>

    
    </>
  )
}

export default AdminDashboard
