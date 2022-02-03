import moment from "moment"
import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import DatePicker from "react-datepicker"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardBody, CardTitle, Col, Spinner } from "reactstrap"
import { getYearlyChart } from "store/actions"

import "react-datepicker/dist/react-datepicker.css"

const YearlyChart = () => {
  const dispatch = useDispatch()
  const [chartDate, setChartDate] = useState(Date.now())

  const { loading, total_revenue, total_profit } = useSelector(state => ({
    total_revenue: state.Dashboard.yearlyData.total_revenue,
    total_profit: state.Dashboard.yearlyData.total_profit,
    loading: state.Dashboard.loading,
  }))

  const totalRevenue = total_revenue?.reduce((a, b) => a + b)

  const series = [
    {
      name: "Average Profit",
      data: total_profit,
    },
    {
      name: "Revenue",
      data: total_revenue,
    },
  ]
  const options = {
    chart: {
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    colors: ["#f1b44c", "#50a5f1"],
    xaxis: {
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
    yaxis: {
      title: {
        text: "₹ (rupee)",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹ " + val + " rupee"
        },
      },
    },
  }

  useEffect(() => {
    dispatch(getYearlyChart(moment(chartDate).format("YYYY")))
  }, [dispatch, chartDate])

  return (
    <>
      <Col>
        <Card>
          <CardBody>
            <CardTitle
              className="mb-1 d-flex "
              style={{ justifyContent: "space-between" }}
            >
              Yearly Revenue
              <div
                className="clearfix w-fit-content"
                style={{ width: "fit-content" }}
              >
                <div className="float-end ">
                  <div
                    className="input-group input-group-sm "
                    style={{ width: "160px" }}
                  >
                    {" "}
                    <DatePicker
                      selected={chartDate}
                      onChange={date => setChartDate(date)}
                      dateFormat="yyyy"
                      showYearPicker
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </CardTitle>

            {loading ? (
              <>
                <Spinner type="grow" color="info" />
              </>
            ) : (
              <>
                {totalRevenue > 0 ? (
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                  />
                ) : (
                  <>
                    <p className="mt-4 text-info">No Annual Revenue yet!</p>
                  </>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default YearlyChart
