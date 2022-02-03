import React from "react"
import { Card, CardBody, CardTitle, Media } from "reactstrap"
import moment from "moment"
import { useSelector } from "react-redux"
import { map } from "lodash"

const ActivityComp = () => {
  const { scheduleEvents } = useSelector(state => ({
    scheduleEvents: state.Supervisors.scheduleEvents,
  }))


  const YesterdaySchedule = scheduleEvents?.results?.filter(
    event => event.date == moment(Date.now() - 24 * 60 * 60 * 1000).format("YYYY-MM-DD")
  )

  const TodaySchedule = scheduleEvents?.results?.filter(
    event => event.date == moment(Date.now()).format("YYYY-MM-DD")
  )

  const TomorrowSchedule = scheduleEvents?.results?.filter(
    event =>
      event.date ==
      moment(Date.now() + 24 * 60 * 60 * 1000).format("YYYY-MM-DD")
  )

  const daybfTommorow = scheduleEvents?.results?.filter(
    event =>
      event.date ==
      moment(Date.now() + 24 * 60 * 60 * 1000 * 2).format("YYYY-MM-DD")
  )

  const dayafafTommorow = scheduleEvents?.results?.filter(
    event =>
      event.date ==
      moment(Date.now() + 24 * 60 * 60 * 1000 * 3).format("YYYY-MM-DD")
  )
  const dayafafafTommorow = scheduleEvents?.results?.filter(
    event =>
      event.date ==
      moment(Date.now() + 24 * 60 * 60 * 1000 * 4).format("YYYY-MM-DD")
  )

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-5">Activity</CardTitle>
          <ul className="verti-timeline list-unstyled">


            <li className="event-list">
              <div className="event-timeline-dot">
                <i className="bx bx-right-arrow-circle font-size-18" />
              </div>
              <Media>
                <div className="me-3">
                  <h5 className="font-size-14">
                    {moment(Date.now() - 24 * 60 * 60 * 1000).format("DD MMM")}

                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <Media body>
                  {YesterdaySchedule?.length > 0 ? (
                    <>
                      {map(YesterdaySchedule, (event, index) => (
                        <div key={index}>
                          <i className="mdi mdi-circle text-success font-size-10 me-2"></i>
                          {event.product}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <h5 className="font-size-14 text-warning">
                        No Schedule!
                      </h5>
                    </>
                  )}
                </Media>
              </Media>
            </li>
            <li className="event-list active">
              <div className="event-timeline-dot">
                <i className="bx bxs-right-arrow-circle font-size-18 bx-fade-right" />
              </div>
              <Media>
                <div className="me-3">
                  <h5 className="font-size-14">
                    {moment(Date.now()).format("DD MMM")}
                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <Media body>
                  {TodaySchedule?.length > 0 ? (
                    <>
                      {map(TodaySchedule, (event, index) => (
                        <div key={index}>
                          <i className="mdi mdi-circle text-success font-size-10 me-2"></i>
                          {event.product}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <h5 className="font-size-14 text-warning">
                        No Schedule!
                      </h5>
                    </>
                  )}
                </Media>
              </Media>
            </li>
            <li className="event-list">
              <div className="event-timeline-dot">
                <i className="bx bx-right-arrow-circle font-size-18" />
              </div>
              <Media>
                <div className="me-3">
                  <h5 className="font-size-14">
                    {moment(Date.now() + 24 * 60 * 60 * 1000).format("DD MMM")}

                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <Media body>
                  {TomorrowSchedule?.length > 0 ? (
                    <>
                      {map(TomorrowSchedule, (event, index) => (
                        <div key={index}>
                          <i className="mdi mdi-circle text-success font-size-10 mx-2"></i>
                          {event.product}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <h5 className="font-size-14 text-warning">
                        No Schedule!
                      </h5>
                    </>
                  )}
                </Media>
              </Media>
            </li>
            <li className="event-list">
              <div className="event-timeline-dot">
                <i className="bx bx-right-arrow-circle font-size-18" />
              </div>
              <Media>
                <div className="me-3">
                  <h5 className="font-size-14">
                    {moment(Date.now() + 24 * 60 * 60 * 1000 * 2).format(
                      "DD MMM"
                    )}
                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <Media body>
                  {daybfTommorow?.length > 0 ? (
                    <>
                      {map(daybfTommorow, (event, index) => (
                        <div key={index}>
                          <i className="mdi mdi-circle text-success font-size-10 me-2"></i>
                          {event.product}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <h5 className="font-size-14 text-warning">
                        No Schedule!
                      </h5>
                    </>
                  )}
                </Media>
              </Media>
            </li>
            <li className="event-list">
              <div className="event-timeline-dot">
                <i className="bx bx-right-arrow-circle font-size-18" />
              </div>
              <Media>
                <div className="me-3">
                  <h5 className="font-size-14">
                    {moment(Date.now() + 24 * 60 * 60 * 1000 * 3).format(
                      "DD MMM"
                    )}
                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <Media body>
                  {dayafafTommorow?.length > 0 ? (
                    <>
                      {map(dayafafTommorow, (event, index) => (
                        <div key={index}>
                          <i className="mdi mdi-circle text-success font-size-10 me-2"></i>
                          {event.product}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <h5 className="font-size-14 text-warning">
                        No Schedule!
                      </h5>
                    </>
                  )}
                </Media>
              </Media>
            </li>
            <li className="event-list">
              <div className="event-timeline-dot">
                <i className="bx bx-right-arrow-circle font-size-18" />
              </div>
              <Media>
                <div className="me-3">
                  <h5 className="font-size-14">
                    {moment(Date.now() + 24 * 60 * 60 * 1000 * 4).format(
                      "DD MMM"
                    )}
                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <Media body>
                  {dayafafafTommorow?.length > 0 ? (
                    <>
                      {map(dayafafafTommorow, (event, index) => (
                        <div key={index}>
                          <i className="mdi mdi-circle text-success font-size-10 me-2"></i>
                          {event.product}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <h5 className="font-size-14 text-warning">
                        No Schedule!
                      </h5>
                    </>
                  )}
                </Media>
              </Media>
            </li>
          </ul>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ActivityComp
