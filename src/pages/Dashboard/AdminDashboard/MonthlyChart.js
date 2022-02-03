import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Spinner } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import DatePicker from "react-datepicker"

//actions
import { getMonthlyChart, getMonthlyYearChart } from "../../../store/actions"

import "react-datepicker/dist/react-datepicker.css"

function MonthlyChart(props) {
  const dispatch = useDispatch()

  const { loading, wageChart, colsChart, yearWage, yearCols } = useSelector(
    state => ({
      wageChart: state.Dashboard.monthlyData.wage,
      colsChart: state.Dashboard.monthlyData.cols,
      loading: state.Dashboard.loading,
      yearWage: state.Dashboard.monthYearData.wage,
      yearCols: state.Dashboard.monthYearData.cols,
    })
  )

  const [ChartDate, setChartDate] = useState(Date.now())
  const [yearChart, setYearChart] = useState(Date.now())
  const [toggle, setToggle] = useState(false)

  const options = {
    chart: {
      toolbar: "false",
      dropShadow: {
        enabled: !0,
        color: "#000",
        top: 18,
        left: 7,
        blur: 8,
        opacity: 0.2,
      },
    },
    dataLabels: {
      enabled: !1,
    },
    colors: ["#50a5f1", "#E91E63"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
  }

  const series = [
    {
      name: "Wage Paid",
      data: wageChart,
    },
    {
      name: "Column",
      data: colsChart,
    },
  ]

  useEffect(() => {
    dispatch(getMonthlyChart(moment(ChartDate).format("YYYY-MM")))
    dispatch(getMonthlyYearChart(moment(yearChart).format("YYYY")))
  }, [dispatch, ChartDate])

  const totalWage = wageChart?.reduce((a, b) => a + b)
  const totalCols = colsChart?.reduce((a, b) => a + b)
  const totalWageYear = yearWage?.reduce((a, b) => a + b)
  const totalColsYear = yearCols?.reduce((a, b) => a + b)

  //YEARLY CHART
  const YearSeries = [
    {
      name: "Wage Paid",
      data: yearWage,
    },
    {
      name: "Column",
      data: yearCols,
    },
  ]

  const YearOptions = {
    chart: {
      toolbar: "false",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },

    colors: ["#556ee6", "#34c38f"],
    xaxis: {
      type: "datetime",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  }

  return (
    <React.Fragment>
      <Col xl="12">
        <Card>
          <CardBody>
            <div className="clearfix">
              <div className="float-end ">
                <h4
                  className="card-title mb-3 text-info col-md-12"
                  style={{ cursor: "pointer" }}
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? "Monthly Analytics" : "Yearly Analytics"}
                  <i className="fas fa-chart-line text-warning mx-1 bx-fade-right"></i>
                </h4>
                {toggle ? (
                  <>
                    <div className="input-group input-group-sm ">
                      <DatePicker
                        selected={yearChart}
                        onChange={date => setYearChart(date)}
                        dateFormat="yyyy"
                        showYearPicker
                        className="form-control"
                      />
                    </div>
                  </>
                ) : (
                  <div className="input-group input-group-sm ">
                    <DatePicker
                      selected={ChartDate}
                      onChange={date => setChartDate(date)}
                      dateFormat="yyyy-MM  (MMMM)"
                      showMonthYearPicker
                      className="form-control"
                    />
                  </div>
                )}
              </div>
              {totalCols > 0 ? (
                <>
                  {toggle ? (
                    <>
                      {" "}
                      <h4 className="card-title mb-0 d-inline-block pt-4">
                        Yearly Analytics{" "}
                      </h4>
                      <p className="text-gray mt-4 mb-1">
                        <i className="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i>
                        Total Wage Paid In this Year (
                        {moment(ChartDate).format("YYYY-MM")})
                      </p>
                      <h5 className="text-info mx-2">
                        <i className="fas fa-rupee-sign mx-2"></i>
                        {totalWageYear}
                      </h5>
                      <p className="text-gray mt-4 mb-1">
                        <i className="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i>
                        Total Column Created In this Year (
                        {moment(ChartDate).format("YYYY-MM")})
                      </p>
                      <h5 className="text-info mx-2">
                        <i className="fas fa-rupee-sign mx-2"></i>
                        {totalColsYear}
                      </h5>
                    </>
                  ) : (
                    <>
                      <h4 className="card-title mb-0 d-inline-block pt-4">
                        Monthly Analytics{" "}
                      </h4>
                      <p className="text-gray mt-4 mb-1">
                        <i className="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i>
                        Total Wage Paid In this month (
                        {moment(ChartDate).format("YYYY-MM")})
                      </p>
                      <h5 className="text-info mx-2">
                        <i className="fas fa-rupee-sign mx-2"></i>
                        {totalWage}
                      </h5>
                      <p className="text-gray mt-4 mb-1">
                        <i className="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i>
                        Total Column Created In this month (
                        {moment(ChartDate).format("YYYY-MM")})
                      </p>
                      <h5 className="text-info mx-2">
                        <i className="fas fa-rupee-sign mx-2"></i>
                        {totalCols}
                      </h5>
                    </>
                  )}
                </>
              ) : (
                <h4 className="card-title mb-0 d-inline-block pt-4">
                  {" "}
                  Analytics{" "}
                </h4>
              )}
            </div>
            {loading ? (
              <>
                <Spinner type="grow" color="info" />
              </>
            ) : (
              <>
                {totalCols > 0 ? (
                  <Row style={{ paddingBottom: "1rem" }}>
                    <Col lg="12">
                      <div id="line-chart" dir="ltr">
                        {toggle ? (
                          <ReactApexChart
                            series={YearSeries}
                            options={YearOptions}
                            type="line"
                            height={320}
                            className="apex-charts"
                          />
                        ) : (
                          <ReactApexChart
                            series={series}
                            options={options}
                            type="line"
                            height={320}
                            className="apex-charts"
                          />
                        )}
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <p className="text-info ">No Monthly Analytics yet!</p>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default MonthlyChart
