import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Badge, Spinner } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"

import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { map, range } from "lodash"

import "../../../assets/scss/datatables.scss"
import moment from "moment"
import { getBalancetransaction, getSchecduleEvents } from "store/actions"
import MyPagination from "components/Common/MyPagination"
import { MetaTags } from "react-meta-tags"
import Breadcrumb from "components/Common/Breadcrumb"

const Schedule = () => {
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)

  const { scheduleEvents, loading } = useSelector(state => ({
    scheduleEvents: state.Supervisors.scheduleEvents,
    loading: state.Supervisors.scheduleLoading,

  }))

  //page
  const totalPages = Math.ceil(scheduleEvents?.count / 10)
  const pages = range(1, totalPages + 1)

  const pageSend = () => {
    if (page >= pages.length) {
      return pages.length
    }
    if (page < 1) {
      return 1
    } else {
      return page
    }
  }

  useEffect(() => {
    dispatch(getSchecduleEvents(pageSend()))
  }, [dispatch, page])

  const columns = [
    {
      dataField: "auto_id",
      text: "Id",
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
    },
    {
      dataField: "product",
      text: "Product",
    },
    {
      dataField: "quantity",
      text: "Quantity",
    },
    {
      dataField: "order",
      text: "Order",
    },
    {
      dataField: "status",
      text: "Store Status",
    },
    {
      dataField: "work_status",
      text: "Work Status",
    },

  ]

  const Status = status => {
    if (status == "Provided") {
      return "success"
    }
    if (status == "Not Provided") {
      return "warning"
    }
  }
  const WorkStatus = status => {
    if (status == "Pending") {
      return "warning"
    }
    if (status == "Finished") {
      return "success"
    }
  }

  const scheduleEventsData = map(
    scheduleEvents?.results,
    (item, index) => ({
      ...item,
      key: index,
      date_added: moment(item.date_added).format("DD-MM-YYYY"),
      status: <Badge
        className={
          "font-size-12 badge-soft-" + `${Status(item.status)}`
        }
        pill
      >
        {item.status}
      </Badge>,
      work_status: <Badge
        className={
          "font-size-12 badge-soft-" + `${WorkStatus(item.work_status)}`
        }
        pill
      >
        {item.work_status}
      </Badge>
    })
  )

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ]

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Work Schedule | Loha </title>
      </MetaTags>
      <div className="page-content">

        <Col className="col-12">
          <Breadcrumb title="Dashboard" breadcrumbItem="All Product" />
          <Card>
            <CardBody>
              <div className="mb-4 h4 card-title">Work Schedule</div>
              {scheduleEventsData?.length > 0 ? (
                <ToolkitProvider
                  keyField="id"
                  columns={columns}
                  data={scheduleEventsData}
                  search
                >
                  {toolkitProps => (
                    <React.Fragment>
                      {loading ? (
                        <Spinner color="secondary" className="d-block m-auto" />
                      ) : (
                        <>
                          <Row>
                            <Col xl="12">
                              <div
                                className="table-responsive"
                                style={{ minHeight: "40vh" }}
                              >
                                <BootstrapTable
                                  keyField={"id"}
                                  responsive
                                  bordered={false}
                                  striped={false}
                                  defaultSorted={defaultSorted}
                                  selectRow={selectRow}
                                  classes={"table align-middle table-nowrap"}
                                  headerWrapperClasses={"thead-light"}
                                  {...toolkitProps.baseProps}
                                />
                              </div>
                            </Col>
                          </Row>
                          <MyPagination
                            pages={pages}
                            clcickedPage={page}
                            onNunClick={(item) => setPage(item)}
                            onNextClick={() => setPage(page + 1)}
                            onPrevClick={() => setPage(page - 1)}
                            onFastNextClick={() => setPage(pages.length)}
                            onFastPrevClick={() => setPage(1)}
                            apiPage={pageSend}
                          />
                        </>
                      )}
                    </React.Fragment>
                  )}
                </ToolkitProvider>
              ) : (
                <>
                  <p className="font-size-14 text-info">
                    There are No Work Schedule Yet!
                  </p>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  )
}

export default Schedule
