import React from "react"
import { Card, CardBody, Table, CardHeader, Spinner } from "reactstrap"
import { useSelector } from "react-redux"
import { map } from "lodash"
import { Link } from "react-router-dom"
import SimpleBar from "simplebar-react"

const FinishedProduct = props => {
  const { finishedProduct, finishProdLoading } = useSelector(state => ({
    finishedProduct: state.Products.finishedProduct,
    finishProdLoading: state.Products.finishProdLoading,
  }))

  return (
    <React.Fragment>
      {finishedProduct?.count > 0 && (
        <Card>
          <CardHeader className="bg-white ">
            <div className="clearfix">
              <h4 className="card-title mb-0">Products</h4>
            </div>
          </CardHeader>
          <CardBody className="mt-4">
            <div className="text-muted text-center">
              <p className="mb-2">Total Finished Products </p>
              <h4>
                {finishedProduct?.count == 0 ? (
                  <>
                    <p className="text-info font-size-14 mt-3">
                      No Finished Product yet!
                    </p>
                    <div className="float-end">
                      <Link
                        to="/product/finished"
                        className="mb-0 mx-4 d-flex align-items-center text-info font-size-14"
                      >
                        Add New
                        <i className="bx bx-cookie bx-fade-right bx-sm" />
                      </Link>
                    </div>
                  </>
                ) : (
                  finishedProduct?.count
                )}
              </h4>
            </div>
            <SimpleBar style={{ maxHeight: "360px" }}>
              <div className="table-responsive mt-4 ">
                {finishProdLoading ? (
                  <>
                    <Spinner type="grow" color="secondary" />
                  </>
                ) : (
                  <Table className="table align-middle mb-0">
                    <tbody>
                      {map(finishedProduct?.results, (item, index) => (
                        <tr key={index}>
                          <td>
                            <h5
                              className="font-size-14 mb-1 "
                              style={{ width: "max-content" }}
                            >
                              {item.product_name}
                            </h5>
                            <p className="text-muted mb-0">
                              id - {item.supervisor_schedule_item_auto_id}
                            </p>
                          </td>
                          <td>
                            <h5 className="font-size-14 mb-1">
                              {item.qc_username}
                            </h5>
                          </td>
                          <td>
                            <p
                              className={`mb-1 text-${
                                item.qc_status == "Approved"
                                  ? "success"
                                  : "info"
                              }`}
                            >
                              {item.qc_status}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </SimpleBar>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  )
}

export default FinishedProduct
