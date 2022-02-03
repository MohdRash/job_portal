import React from "react"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import {
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"

import ToolkitProvider from "react-bootstrap-table2-toolkit"

import "../../../assets/scss/datatables.scss"
import { useSelector } from "react-redux"
import moment from "moment"
import { map } from "lodash"

function Table() {
  const { finishedProduct, supervisorDetail } = useSelector(state => ({
    finishedProduct: state.Products.finishedProduct,
    supervisorDetail: state.Supervisors.supervisorDetail,
  }))

  const MyFinishedProd = finishedProduct?.results?.filter(
    prod => prod.supervisor == supervisorDetail?.account?.username
  )

  const columns = [
    {
      dataField: "supervisor_schedule_item_auto_id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "product_name",
      text: "Product",
      sort: true,
    },
    {
      dataField: "note",
      text: "Note",
    },
    {
      dataField: "date_added",
      text: "Date",
    },
    {
      dataField: "qc_username",
      text: "QC",
    },
    {
      dataField: "qc_status",
      text: "QC Status",
    },
  ]

  const MyFinishedProdData = map(MyFinishedProd, (item, index) => ({
    ...item,
    key: index,
    date_added: moment(item.date_added).format("DD-MM-YYYY"),
  }))

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ]

  const pageOptions = {
    sizePerPage: 10,
    totalSize: MyFinishedProdData?.length,
    custom: true,
  }

  return (
    <>
      {MyFinishedProd?.length > 0 && (
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Completed Orders</CardTitle>

            <ToolkitProvider
              keyField="id"
              columns={columns}
              data={MyFinishedProdData}
              // search
            >
              {toolkitProps => (
                <React.Fragment>
                  <Row>
                    <Col xl="12">
                      <div className="table-responsive">
                        <BootstrapTable
                          keyField={"id"}
                          responsive
                          bordered={false}
                          striped={false}
                          defaultSorted={defaultSorted}
                          classes={
                            "table align-middle table-nowrap table-hover"
                          }
                          {...toolkitProps.baseProps}
                        />
                      </div>
                    </Col>
                  </Row>
                  {pageOptions?.totalSize > 10 && (
                    <Row className="align-items-md-center mt-30">
                      <Col className="inner-custom-pagination d-flex">
                        <div className="d-inline">
                          <SizePerPageDropdownStandalone {...paginationProps} />
                        </div>
                        <div className="text-md-right ms-auto overflowScroll">
                          <PaginationListStandalone {...paginationProps} />
                        </div>
                      </Col>
                    </Row>
                  )}
                </React.Fragment>
              )}
            </ToolkitProvider>
          </CardBody>
        </Card>
      )}
    </>
  )
}

export default Table
