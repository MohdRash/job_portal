import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Spinner } from "reactstrap"
import { Link } from "react-router-dom"

// import images
import { useDispatch, useSelector } from "react-redux"
import { map } from "lodash"
import { getProducts } from "store/actions"

const NewProducts = () => {
  const dispatch = useDispatch()

  const { products, Productloading } = useSelector(state => ({
    products: state.Products.products,
    Productloading: state.Products.loading,
  }))
  const newProd = products?.results?.slice(0, 8)

  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    dispatch(getProducts(searchText))
  }, [dispatch, searchText])

  const handleSearch = e => {
    e.preventDefault()
    setSearchText(e.target.value)
  }

  return (
    <React.Fragment>
      <Col>
        <Card>
          <CardBody className="p-4">
            <div className="search-box">
              <p className="text-muted">Search</p>
              <div className="position-relative">
                <form onChange={e => handleSearch(e)}>
                  <input
                    type="text"
                    className="form-control rounded bg-light border-light"
                    placeholder="Search..."
                    defaultValue={searchText}
                  />
                  <i className="mdi mdi-magnify search-icon"></i>
                </form>
              </div>
            </div>

            <hr className="my-4" />

            {Productloading ? (
              <>
                {" "}
                <Spinner type="grow" color="gray" />
              </>
            ) : (
              <div>
                <p className="text-muted mb-2">New Products in the store</p>

                <div className="list-group list-group-flush">
                  {map(newProd, (item, index) => (
                    <Link
                      key={index}
                      to={`products/${item?.id}`}
                      className="list-group-item text-muted py-3 px-2"
                    >
                      <div className="media align-items-center">
                        <div className="me-3">
                          <img
                            src={item.image}
                            alt=""
                            className="avatar-md h-auto d-block rounded"
                          />
                        </div>
                        <div className="media-body overflow-hidden">
                          <h5 className="font-size-13 text-truncate">
                            {item.name}
                          </h5>
                          <p className="mb-0 text-truncate">
                            cost -
                            <span className="text-info font-size-14">
                              <i className="fas fa-rupee-sign mx-2"></i>
                              {item.cost}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <hr className="my-4" />

            <div>
              <ul className="list-inline widget-tag">
                <li className="list-inline-item">
                  <Link
                    to="/order/create"
                    className="badge bg-success font-size-12 mt-2 p-2"
                  >
                    Order Now
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    to="/orders"
                    className="badge bg-light font-size-12 mt-2 p-2"
                  >
                    View All Orders
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    to="/products"
                    className="badge bg-light font-size-12 mt-2 p-2"
                  >
                    All Products
                  </Link>
                </li>
                {/* <li className="list-inline-item">
                  <Link
                    to="/notifications"
                    className="badge bg-light font-size-12 mt-2 p-2"
                  >
                    Activities
                  </Link>
                </li> */}
              </ul>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default NewProducts
