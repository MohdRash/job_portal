import React, { useEffect, useState } from "react"
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Spinner,
  Button,
  Alert,
} from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import moment from "moment"
import DatePicker from "react-datepicker"
import { map } from "lodash"

//actions
import { getOrderDetail, updateOrder } from "store/actions"

//componetns
import OrderDetail from "./OrderDetail"

//css
import "react-datepicker/dist/react-datepicker.css"

function OrderStatus() {
  const dispatch = useDispatch()
  const params = useParams()
  const [startDate, setStartDate] = useState(Date.now())
  const [newStatus, setNewStatus] = useState({
    status: "",
    start_date: moment(startDate).format("YYYY-MM-DD"),
  })
  const { orderDetail, loading, error } = useSelector(state => ({
    orderDetail: state.Orders.orderDetail,
    error: state.Orders.error,
    loading: state.Orders.loading,
  }))
  useEffect(() => {
    dispatch(getOrderDetail(params.id))
  }, [dispatch])

  const status = [
    {
      id: 100,
      statusText: "Pending",
      class: "info",
      text: "Pending",
    },
    {
      id: 200,
      statusText: "Approved",
      class: "success",
      text: "Approve",
    },
    {
      id: 300,
      statusText: "Canceled",
      class: "danger",
      text: "Cancel",
    },

    {
      id: 400,
      statusText: "Shipped",
      class: "success",
      text: "Shipped",
    },
    {
      id: 500,
      statusText: "Delivered",
      class: "success",
      text: "Delivered",
    },
  ]

  function statusList() {
    if (orderDetail?.status == "Pending") {
      return status?.slice(1, 3)
    } else if (orderDetail?.status == "Approved") {
      return status?.filter(item => item.statusText == "Shipped")
    } else if (orderDetail?.status == "Shipped") {
      return status?.filter(item => item.statusText == "Delivered")
    } else if (orderDetail?.status == "Started") {
      return status?.filter(item => item.statusText == "Shipped")
    }
  }

  function handlerFinalValue(event) {
    setNewStatus({
      ...newStatus,
      ["status"]: event.target.value,
    })
    {
      if (event.target.value == "Approved") {
        dispatch(
          updateOrder("", params.id, "", {
            status: event.target.value,
            start_date: moment(startDate).format("YYYY-MM-DD"),
          })
        )
      } else {
        dispatch(
          updateOrder("", params.id, "", {
            status: event.target.value,
            start_date: "",
          })
        )
      }
    }
  }
  const Status = status => {
    if (status == "Pending") {
      return "info"
    }
    if (status == "Approved") {
      return "success"
    }
    if (status == "Canceled") {
      return "danger"
    }
    if (status == "Started") {
      return "warning"
    }
    if (status == "Shipped") {
      return "success"
    }
    if (status == "Delivered") {
      return "success"
    }
  }

  const handleSubmit = () => {
    dispatch(updateOrder("", params.id, "", newStatus))
  }
  const Role = sessionStorage.getItem("role")

  const Handler = () => {
    if (orderDetail?.status == "Canceled") {
      return false
    } else if (Role == "dealer") {
      return false
    } else if (orderDetail?.status == "Delivered") {
      return false
    } else {
      return true
    }
  }
  return (
    <>
      <Col lg={`${Handler() ? "8" : "12"}`}>
        <Card>
          <CardBody>
            {loading ? (
              <Spinner type="grow" color="gray" />
            ) : (
              <>
                <OrderDetail />
              </>
            )}

            <Row className="task-dates">
              <Col sm="4" xs="6">
                <div className="mt-4">
                  <Badge
                    className={
                      "font-size-14 p-2 badge-soft-" +
                      `${Status(orderDetail?.status)}`
                    }
                    pill
                  >
                    {orderDetail?.status}
                  </Badge>
                </div>
              </Col>
              {newStatus?.label == "canceled" && (
                <Col sm="4" xs="6">
                  <div className="mt-4">
                    <Link
                      style={{ opacity: 0.8 }}
                      to="#"
                      className={`btn btn-danger btn-sm`}
                    >
                      Delete this order
                      <i className="fas fa-trash ms-1"></i>
                    </Link>
                  </div>
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
      {Handler() && (
        <Col lg="4">
          <Card>
            <CardBody>
              {orderDetail?.status == "Pending" && (
                <>
                  <Col className="mb-4 position-relative">
                    <label htmlFor="resume">Start Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      minDate={moment().toDate()}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                    />
                    <Button
                      type="submit"
                      color="success"
                      className="w-md mb-2 btn-sm"
                      style={{
                        position: "absolute",
                        right: "0",
                        height: "36px",
                      }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Col>
                </>
              )}
              <CardTitle className="mb-4">Update Status</CardTitle>
              {error?.response && (
                <Alert color="danger">{error?.response}</Alert>
              )}
              <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                {map(statusList(), (item, index) => (
                  <Button
                    key={index}
                    type="submit"
                    color={item.class}
                    value={item.statusText}
                    className="w-md mb-2 btn-sm "
                    style={{ marginRight: "1rem" }}
                    onClick={e => handlerFinalValue(e)}
                  >
                    {item.text}
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      )}
    </>
  )
}

export default OrderStatus
