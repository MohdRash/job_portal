import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import { map, range } from "lodash"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//actions
import { getSupervisors } from "store/actions"

import "../../assets/scss/datatables.scss"
import MyPagination from "components/Common/MyPagination"

const Supervisors = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const { supervisors, loading } = useSelector(state => ({
    supervisors: state.Supervisors.supervisors,
    loading: state.Supervisors.loading,
  }))

  const totalPages = Math.ceil(supervisors?.count / 10)
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
    dispatch(getSupervisors(searchText, pageSend()))
  }, [dispatch, page, searchText])

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "cols_per_day",
      // text: 'Column per Day',
      text: "Frames per Day",
    },
    {
      dataField: "cost_per_col",
      // text: 'Cost per Col',
      text: "Cost per Frame",
    },
    {
      dataField: "action",
      text: "Action",
    },
  ]

  const supervisorsData = map(supervisors?.results, (item, index) => ({
    ...item,
    key: index,
    name: item.account.username,
    phone: item.account.phone,
    email: item.account.email,
    action: (
      <div>
        <Link to={`/supervisors/${item?.id}`} className="btn-light btn-sm">
          View
        </Link>
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
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={supervisorsData}
                search
              >
                {toolkitProps => (
                  <React.Fragment>
                    <Row className="mb-2">
                      <Col md="4">
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
                    </Row>
                    {loading ? (
                      <Spinner color="secondary" className="d-block m-auto" />
                    ) : (
                      <>
                        <Row>
                          <Col xl="12">
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
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Supervisors
