import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Spinner,
  Container,
  Button,
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import { map, range } from "lodash"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import Breadcrumbs from "../../components/Common/Breadcrumb"

//actions
import {
  deleteDailyWork,
  getDailyWorks,
  updateDailyWork,
} from "store/actions"

import "../../assets/scss/datatables.scss"
import { MetaTags } from "react-meta-tags"
import DailyWorkCreate from "./DailyWorkCreate"
import MyPagination from "components/Common/MyPagination"

const DailyWorks = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [toggleCrud, setToggleCrud] = useState(false)

  const { loading, dailyWorks } = useSelector(state => ({
    loading: state.Supervisors.dailyWorksLoading,
    dailyWorks: state.Supervisors.dailyWorks,
  }))

  const totalPages = Math.ceil(dailyWorks?.count / 10)
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
    dispatch(getDailyWorks(pageSend()))
  }, [dispatch, page, searchText])

  const columns = [
    {
      dataField: "supervisor_name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "date",
      text: "Date",
    },
    {
      dataField: "cols",
      text: "Cols",
    },

    {
      dataField: "action",
      text: "Action",
    },
  ]
  const [toggleEdit, setToggleEdit] = useState("")
  const [data, setData] = useState({
    Cols: "",
  })

  const handleToggle = id => {
    setToggleEdit(id)
  }
  function handleSubmit(dailyWorks) {
    dispatch(updateDailyWork({ ...dailyWorks, cols: data?.Cols }))
    setToggleEdit("")
  }

  const handleDel = id => {
    dispatch(deleteDailyWork(id))
  }

  const dailyWorksData = map(dailyWorks?.results, (item, index) => ({
    ...item,
    key: index,
    action: (
      <div>
        <Button
          className="btn-danger btn-sm mx-2"
          onClick={() => handleDel(item.id)}
        >
          Remove
        </Button>
      </div>
    ),
  }))

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

  const handleSearch = e => {
    e.preventDefault()
    setSearchText(e.target.value)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>All Supervisors | Loha </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs title="Dashboard" breadcrumbItem="All Supervisors" />
        <Container fluid>
          <div className="container-fluid">
            <Card>
              <CardBody>
                <ToolkitProvider
                  keyField="id"
                  columns={columns}
                  data={dailyWorksData}
                  search
                >
                  {toolkitProps => (
                    <React.Fragment>
                      <Row className="mb-2">
                        <Col md="6">
                          <div className="search-box me-2 mb-2 d-inline-block">
                            <div className="position-relative">
                              <form
                                className="app-search d-lg-block"
                                onChange={e => handleSearch(e)}
                              >
                                <div className="position-relative">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    defaultValue={searchText}
                                  />
                                  <span className="bx bx-search-alt" />
                                </div>
                              </form>
                            </div>
                          </div>
                        </Col>
                        <Col
                          md="6 d-flex"
                          style={{
                            alignItems: "center",
                            justifyContent: "right",
                          }}
                        >
                          <div className="search-box me-2 mb-2 d-inline-block">
                            <div className="position-relative">
                              <div className="text-sm-end">
                                <a
                                  href="#dailywork"
                                  type="button"
                                  className="btn-success btn btn-rounded m-0"
                                  onClick={() => setToggleCrud(true)}
                                >
                                  <i className="mdi mdi-plus me-1" />
                                  Create Daily Work
                                </a>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {loading ? (
                        <Spinner color="secondary" className="d-block m-auto" />
                      ) : (
                        <>
                          <Row>
                            <Col xl="12" id="select-cell">
                              <div className="table-responsive">
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
              </CardBody>
            </Card>
            <Row id="dailywork">{toggleCrud && <DailyWorkCreate />}</Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DailyWorks
