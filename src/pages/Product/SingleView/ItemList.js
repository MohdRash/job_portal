import React, { useEffect } from "react"
import { Card, CardBody, CardTitle, Spinner, Table } from "reactstrap"
import { Link } from "react-router-dom"
import { map } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//actions
import { getRawmaterials } from "store/actions"

//action

function ItemList() {
  const dispatch = useDispatch()

  const { loading, rawmaterial, othercost } = useSelector(state => ({
    rawmaterial: state.Products.productDetail.rawmaterial,
    othercost: state.Products.productDetail.othercost,
    loading: state.Products.loading,
  }))

  useEffect(() => {
    dispatch(getRawmaterials())
  }, [dispatch])

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Raw Material</CardTitle>
          <div className="table-responsive">
            {rawmaterial?.length > 0 ? (
              <Table className="table align-middle table-nowrap">
                <tbody>
                  <tr>
                    <td style={{ width: "50px" }}>
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-white text-dark font-size-16">
                          Qty
                        </span>
                      </div>
                    </td>
                    <td>
                      <h5 className="font-size-14 m-0">
                        <Link to="" className="text-dark">
                          Raw Material
                        </Link>
                      </h5>
                    </td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <h5 className="font-size-14">
                <Link to="#" className="text-info">
                  No Raw materials added
                </Link>
              </h5>
            )}
          </div>
          {loading ? (
            <Spinner type="grow" color="gray" />
          ) : (
            <div className="table-responsive">
              <Table className="table align-middle table-nowrap">
                <tbody>
                  {map(rawmaterial, (item, index) => (
                    <tr key={index}>
                      <td style={{ width: "50px" }}>
                        <div className="avatar-xs">
                          <span className="avatar-title rounded-circle bg-secondary text-white font-size-16">
                            {item.quantity}
                          </span>
                        </div>
                      </td>
                      <td>
                        <h5 className="font-size-14 m-0">
                          <span className="text-dark">
                            {item.name}
                          </span>
                        </h5>
                      </td>
                      <td>
                        <div>
                          <span className="badge bg-light bg-soft text-info font-size-11 me-1">
                            {item.price}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle className="mb-4">Other Costs</CardTitle>
          {loading ? (
            <Spinner type="grow" color="gray" />
          ) : (
            <div className="table-responsive">
              {othercost?.length > 0 ? (
                <Table className="table align-middle table-nowrap">
                  <tbody>
                    {map(othercost, (item, index) => (
                      <tr key={index}>
                        <td>
                          <h5 className="font-size-14 m-0">
                            <span className="text-dark">
                              {item.note}
                            </span>
                          </h5>
                        </td>
                        <td>
                          <div>
                            <span className="badge bg-light bg-soft text-info font-size-11 me-1">
                              {item.amount}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <h5 className="font-size-14">
                  <Link to="#" className="text-info">
                    No Other Costs
                  </Link>
                </h5>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </>
  )
}

export default ItemList
