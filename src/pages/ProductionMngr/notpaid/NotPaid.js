import { AvField, AvForm } from "availity-reactstrap-validation"
import React, { useEffect, useState } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { map, range } from "lodash"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Label,
  Row,
  Spinner,
} from "reactstrap"
import PropTypes from "prop-types"
import "../../../assets/scss/datatables.scss"


//actions
import { getProductionmngrs } from "store/actions"

import Breadcrumbs from "../../../components/Common/Breadcrumb"
import MyPagination from "components/Common/MyPagination"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { Link } from "react-router-dom"

const CreateProductionManager = ({ history }) => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState("")
  const [page, setPage] = useState(1)

  const { productionmngrs, loading } = useSelector(state => ({
    productionmngrs: state.Productionmngrs.productionmngrs,
    loading: state.Productionmngrs.loading,
  }))
  console.log(productionmngrs);


  //page
  const totalPages = Math.ceil(productionmngrs?.count / 10)
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
    dispatch(getProductionmngrs(searchText, pageSend(), "not_paid"))
  }, [dispatch, page, searchText, "not_paid"])

  const columns = [
    {
      dataField: "student_name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "application_submitted",
      text: "Application",
    },
    {
      dataField: "fees_paid",
      text: "Fee Paid",
    },
    {
      dataField: "action",
      text: "Action",
    },
  ]

  const productionmngrsData = map(productionmngrs?.results, (item, index) => ({
    ...item,
    key: index,

    application_submitted: (
      item.application_submitted=== true? 'Submitted' : 'not submitted'
    ),

    fees_paid: (
      item.fees_paid !== true ? <b className="text-danger">not paid</b> :  <b className="text-success">Paid</b>
    ),

    action: (
      <div>
        <Link
          to={`/studentsdata/${item?.id}`}
          className="btn-light btn-sm"
        >
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


    <>
      <MetaTags>
        <title>Not Paided Students | Career </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs
          title="Dashboard"
          breadcrumbItem="Not Paided Students"
        />
        <Container fluid>
          <div className="container-fluid">
            {productionmngrsData?.productionmngrs?.results?.fees_paid !== true? (
              <React.Fragment>
              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody>
                      <ToolkitProvider
                        keyField="id"
                        columns={columns}
                        data={productionmngrsData}
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
                                          placeholder="Search a name..."
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
            ): (
              <h1 className="text-danger">sorry No Students Left To Pay The Fee</h1>
            )}
          </div>
        </Container>
      </div>
    </>

  )
}

export default CreateProductionManager

CreateProductionManager.propTypes = {
  history: PropTypes.object,
}
