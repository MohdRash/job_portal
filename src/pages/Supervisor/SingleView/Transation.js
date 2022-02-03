import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Badge, Spinner } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { map } from "lodash"
import moment from "moment"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

import "../../../assets/scss/datatables.scss"
import { getSupervisorDetail } from "store/actions"
import { range } from "lodash"
import { Link, useParams } from "react-router-dom"
import MyPagination from "components/Common/MyPagination"

const Transaction = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const { supervisorDetail, loading } = useSelector(state => ({
    supervisorDetail: state.Supervisors.supervisorDetail,
    loading: state.Supervisors.loading,
  }))
  const [page, setPage] = useState(1)
  const balanceTransaction = supervisorDetail?.balance_transaction

  const totalPages = Math.ceil(balanceTransaction?.count / 10)
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
    dispatch(getSupervisorDetail(params.id, pageSend()))
  }, [dispatch, page])

  const columns = [
    {
      dataField: "auto_id",
      text: "Trn Id",
    },
    {
      dataField: "date_added",
      text: "Date",
    },

    {
      dataField: "transaction_type",
      text: "Trn Type",
      sort: true,
    },
    {
      dataField: "transaction_amount",
      text: "Amount",
    },
    {
      dataField: "balance",
      text: "Balance",
    },
    {
      dataField: "title",
      text: "Trn Description",
    },
  ]

  const Status = status => {
    if (status == "credit") {
      return "success"
    }
    if (status == "debit") {
      return "warning"
    }
  }

  const balanceTransactionData = map(
    balanceTransaction?.results,
    (item, index) => ({
      ...item,
      key: index,
      date_added: moment(item.date_added).format("DD-MM-YYYY"),
      transaction_type: (
        <div
          className="d-flex"
          style={{
            maxWidth: "120px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Badge
            className={
              "font-size-12 badge-soft-" + `${Status(item.transaction_type)}`
            }
            pill
          >
            {item.transaction_type}
          </Badge>
        </div>
      ),
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
      {window.location.search == "?transactions" && (
        <Card>
          <Link
            to={`/supervisors/${supervisorDetail.id}`}
            style={{
              alignSelf: "flex-end",
              width: "fit-content",
              color: "red",
            }}
            className="fas fa-times mx-4 mt-3 font-size-20 "
          ></Link>
          <CardBody>
            <div className="mb-4 h4 card-title"> Transaction History</div>
            <ToolkitProvider
              keyField="id"
              columns={columns}
              data={balanceTransactionData}
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
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  )
}

export default Transaction
