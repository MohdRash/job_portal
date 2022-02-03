import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { map } from "lodash"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { MetaTags } from "react-meta-tags"
import { Container } from "reactstrap"
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  CardTitle,
  FormGroup,
  Spinner,
} from "reactstrap"
import Select from "react-select"

//actions
import { createOrder, getDealers, getProducts } from "store/actions"

import Breadcrumbs from "../../../../components/Common/Breadcrumb"

const CreateOrder = ({ history }) => {
  const dispatch = useDispatch()
  //redux state
  const { products, loading, orderLoading, dealers } = useSelector(state => ({
    products: state.Products.products,
    loading: state.StoreItems.loading,
    orderLoading: state.Orders.loading,
    dealers: state.Dealers.dealers,
  }))

  const [selectedOrder, setselectedOrder] = useState("Search a product")
  const [selectedDealer, setselectedDealer] = useState("Search a Dealer")
  const [searchDealerText, setSearchDealerText] = useState("")
  const [searchText, setSearchText] = useState("")
  const [orderitem, setNewOrders] = useState([])
  const [rawData, setRawData] = useState({
    dealer: "",
    orderitem: [],
  })

  const Role = sessionStorage.getItem("role")


  useEffect(() => {
    dispatch(getProducts(searchText))
    if (Role !== "dealer") {
      dispatch(getDealers(searchDealerText, ""))
    }
  }, [searchText, dispatch, searchDealerText])

  const onAddFormRow = () => {
    const modifiedRows = [...orderitem]
    modifiedRows.push({
      id: modifiedRows.length + 1,
      ...rawData.orderitem,
    })
    setNewOrders(modifiedRows)
  }

  const onDeleteFormRow = id => {
    if (id !== 0) {
      var modifiedRows = [...orderitem]
      modifiedRows = modifiedRows.filter(x => x["id"] !== id)
      setNewOrders(modifiedRows)
    }
  }
  // orderitem
  const onSubmitOrder = () => {
    dispatch(createOrder({ dealer: rawData.dealer, orderitem }, history))
  }

  //setore item from and search
  function handlerFinalValue(event) {
    setselectedOrder(event.label)
    setRawData({
      ...rawData,
      orderitem: {
        ["product"]: event.value,
        ["productName"]: event.label,
      },
    })
  }
  const disabledBtn = () => {
    if (rawData.orderitem.product && rawData.orderitem.quantity) {
      return true
    } else {
      return false
    }
  }

  const optionGroup1 = [
    {
      options: products?.results?.map((result, index) => ({
        key: index,
        label: result.name,
        value: result.id,
      })),
    },
  ]

  const handleEnters = textEntered => {
    setSearchText(textEntered)
  }

  function handlerDealerFinalValue(event) {
    setselectedDealer(event.label)
    setRawData({
      ...rawData,
      ["dealer"]: event.value,
    })
  }
  const optionGroup2 = [
    {
      options: dealers?.results?.map((result, index) => ({
        key: index,
        label: result.account.username,
        value: result.id,
      })),
    },
  ]

  const handleDealerEnters = textEntered => {
    setSearchDealerText(textEntered)
  }


  return (
    <>
      <MetaTags>
        <title>Order | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Orders" breadcrumbItem="Create Order" />

        <Container fluid>
          <div className="container-fluid">
            {/* uploading */}
            <Row>
              <Col lg={orderitem.length > 0 ? "6" : "12"}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4 mb-4">Add Order</CardTitle>

                    <Form className="repeater" encType="multipart/form-data">
                      <div>
                        <Row>
                          {Role == "dealer" ? (
                            <></>
                          ) : (
                            <Col lg={12} className="mb-3">
                              <FormGroup className="mb-3">
                                <Label>Dealer</Label>

                                <div className="col-md-12"></div>
                                <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                  <Select
                                    onInputChange={handleDealerEnters}
                                    value={selectedDealer}
                                    placeholder={selectedDealer}
                                    onChange={handlerDealerFinalValue}
                                    options={optionGroup2}
                                    classNamePrefix="select2-selection"
                                    isLoading={true}
                                    required={"required"}
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                          )}

                          <Col lg={12} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>Products</Label>

                              <div className="col-md-12"></div>
                              <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                <Select
                                  onInputChange={handleEnters}
                                  value={selectedOrder}
                                  placeholder={selectedOrder}
                                  onChange={handlerFinalValue}
                                  options={optionGroup1}
                                  classNamePrefix="select2-selection"
                                  isLoading={true}
                                  required={"required"}

                                />
                              </div>
                            </FormGroup>
                          </Col>

                          <Col lg={8} className="mb-3">
                            <label htmlFor="resume">Quantity</label>
                            <input
                              type="number"
                              className="form-control"
                              id="resume"
                              min={1}
                              value={rawData.quantity}
                              required={"required"}
                              onChange={e =>
                                setRawData({
                                  ...rawData,
                                  orderitem: {
                                    ...rawData.orderitem,
                                    ["quantity"]: e.target.value,
                                  },
                                })
                              }
                            />
                          </Col>
                          <Col
                            lg={4}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <input
                              type="button"

                              className={`btn btn-dark mr-lg-0 ${disabledBtn() == false && "disabled"}`}
                              value="Add to Orders"
                              onClick={() => onAddFormRow()}
                              style={{
                                marginTop: "1rem",
                                pointerEvents:
                                  rawData.product == false && "none",
                              }}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              {orderitem.length > 0 && (
                <Col lg={6}>
                  <Card>
                    <CardBody>
                      <CardTitle className="h4 mb-4">All Orders </CardTitle>
                      {loading ? (
                        <Spinner type="grow" color="gray" />
                      ) : (
                        <Form
                          className="repeater"
                          encType="multipart/form-data"
                        >
                          <div>
                            {map(orderitem, (item, index) => (
                              <Row key={index}>
                                <Row className="text-muted mt-4">
                                  <Col lg={6} md={5}>
                                    <p>
                                      <i className="mdi mdi-chevron-right text-primary me-1" />
                                      Product : {item?.productName || ""}
                                    </p>
                                  </Col>
                                  <Col lg={4} md={5}>
                                    <p>Quantity : {item?.quantity || ""}</p>
                                  </Col>

                                  <Col
                                    lg={2}
                                    md={2}
                                    className="align-self-center m-auto"
                                  >
                                    <div
                                      className="d-grid "
                                      style={{ maxWidth: "200px" }}
                                    >
                                      <i
                                        className="fa fa-trash mt-1 mr-lg-0 mb-4 text-danger"
                                        onClick={() => onDeleteFormRow(item.id)}
                                      ></i>
                                    </div>
                                  </Col>
                                </Row>
                              </Row>
                            ))}
                          </div>
                          <div>
                            <Col sm="12">
                              <div className="text-sm-end mt-2">
                                <Link
                                  to="#"
                                  className="btn btn-success"
                                  onClick={onSubmitOrder}
                                >
                                  Confirm Order
                                  {orderLoading ? (
                                    <>
                                      <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                    </>
                                  ) : (
                                    <i className="mdi mdi-truck-fast mx-2" />
                                  )}
                                </Link>
                              </div>
                            </Col>
                          </div>
                        </Form>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              )}
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default CreateOrder

CreateOrder.propTypes = {
  history: PropTypes.object,
}
