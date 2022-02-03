import React, { createRef, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { map } from "lodash"

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "reactstrap"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"
import ActivityComp from "./ActivityComp"

//css
import "@fullcalendar/bootstrap/main.css"

//redux
import { useSelector, useDispatch } from "react-redux"
import { getSchecduleEvents } from "store/actions"
import moment from "moment"

const Calender = props => {
  const dispatch = useDispatch()
  const [month, setMonth] = useState()
  const [loading, setLoading] = useState(false)

  const { scheduleEvents } = useSelector(state => ({
    scheduleEvents: state.Supervisors.scheduleEvents,
  }))


  useEffect(() => {
    dispatch(getSchecduleEvents("", moment(month?._d).format('MMMM-YYYY')))
  }, [dispatch, month])

  const events = map(scheduleEvents, (event, index) => ({
    ...event,
    key: index,
    id: event?.auto_id,
    title: event?.product,
    date: event?.date,
    end: event?.date,
    className: "bg-info text-white ",
  }))

  const [modal, setModal] = useState(false)
  const [number, setNumber] = useState('')
  const [detailsEvent, setDetailsEvent] = useState(null)



  const toggle = () => {
    setModal(!modal)
  }
  const handleDateClick = arg => {

    if (arg?.event?._def?.extendedProps) {
      toggle()
    }
  }
  const handleEventClick = arg => {
    setLoading(true)
    setTimeout(() => {
      if (arg?.event?._def?.extendedProps) {
        setDetailsEvent(arg?.event._def.extendedProps)
        setLoading(false)
      } else {
        setDetailsEvent({})
        setLoading(false)
      }
      toggle()
    }, 100);
  }

  const color = "primary"




  return (
    <React.Fragment>
      <Col className="col-12">
        <Card>
          <CardBody>
            <CardTitle style={{ marginBottom: "2rem" }}>Scheduled</CardTitle>
            <Row>
              <Col lg={8} md={12}>
                {/* fullcalendar control */}
                <FullCalendar
                  plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                  slotDuration={"00:15:00"}
                  handleWindowResize={true}
                  themeSystem="bootstrap"
                  customButtons={{
                    prevMonth: {
                      text: <div className="d-flex  align-items-center" >
                        <i className="bx bx-chevron-left font-size-20"></i> Prev
                      </div>,
                      click: () => {

                        setNumber(number - 1)
                        setMonth(moment().subtract(number, 'months'))
                      },
                    },
                    nextMonth: {
                      text: <div className="d-flex  align-items-center">
                        Next<i className="bx bx-chevron-right font-size-20"></i>
                      </div>,
                      click: () => {
                        setNumber(number + 1)
                        setMonth(moment().add(number, 'months'))
                      }

                    },
                    myTitle: {
                      text: <>{moment(month?._d).format('MMMM YYYY')}</>,
                    },

                  }}

                  headerToolbar={{
                    left: "prevMonth,nextMonth today",
                    center: "myTitle",
                    right: "dayGridMonth,dayGridWeek,dayGridDay",
                  }}
                  events={events}
                  dateClick={handleDateClick}
                  eventClick={handleEventClick}
                />
              </Col>
              <Col lg={4}>
                {detailsEvent == null ? (
                  <></>
                ) : (
                  <>
                    <Card className={`border border-${color}`}>
                      <CardHeader className="bg-transparent">
                        <h5 className={`my-0 text-${color}`}>
                          <i className="mdi mdi-bullseye-arrow me-3" />
                          Schedule Details
                        </h5>
                      </CardHeader>
                      {loading == true ? (
                        <Spinner color="primary" type="grow" className="d-block m-auto my-4" />
                      ) : (
                        <CardBody>
                          <CardTitle className="mt-0">
                            {detailsEvent?.product}
                          </CardTitle>
                          <CardText>
                            <ul className={`ps-3 mb-0 text-${color}`}>
                              <li className="py-1">
                                Quantity : {detailsEvent?.quantity},
                              </li>
                              <li className="py-1">
                                id : {detailsEvent?.auto_id},
                              </li>
                            </ul>
                            <p className="pt-2">
                              This Schedule is created on{" "}
                              {detailsEvent?.start_date},{" "}
                            </p>
                          </CardText>
                        </CardBody>)}
                    </Card>
                  </>
                )}
                {/* <ActivityComp /> */}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

Calender.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  className: PropTypes.string,
  getEvents: PropTypes.func,
  addNewEvent: PropTypes.func,
  updateEvent: PropTypes.func,
  deleteEvent: PropTypes.func,
  getCategories: PropTypes.func,
}

export default Calender
