import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
  Button,
} from "reactstrap"
import Select from "react-select"
import { useParams } from "react-router"

//actions
import {
  createOtherCost,
  createRawmaterial,
  getProductDetail,
  getStoreItems,
} from "store/actions"

import AvForm from "availity-reactstrap-validation/lib/AvForm"
import AvField from "availity-reactstrap-validation/lib/AvField"

function PreviewCard() {
  const dispatch = useDispatch()
  const params = useParams()

  //redux state
  const { storeItems, loading, productLoading } = useSelector(state => ({
    storeItems: state.StoreItems.storeItems,
    loading: state.StoreItems.loading,
    productLoading: state.Products.productDetail.loading,
  }))

  const [selectedStore, setselectedStore] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [rawData, setRawData] = useState({
    product: params.id || "",
    store_item: "",
    quantity: "",
  })
  useEffect(() => {
    dispatch(getStoreItems(1))
    dispatch(getProductDetail(params.id))
  }, [dispatch])

  const onAddRawMaterial = () => {
    dispatch(createRawmaterial(rawData))
  }

  useEffect(() => {
    dispatch(getStoreItems(searchText, ""))
  }, [])

  //setore item from and search
  function handlerFinalValue(event) {
    setselectedStore(event.label)
    setRawData({
      ...rawData,
      ["store_item"]: event.value,
    })
  }

  const optionGroup1 = [
    {
      options: storeItems?.results?.map((result, index) => ({
        label: result.name,
        value: result.id,
        key: index,
      })),
    },
  ]

  const handleEnters = textEntered => {
    setSearchText(textEntered)
  }

  //   other cost
  const [cost, setCost] = useState({
    product: params.id || "",
    note: "",
    amount: "",
  })

  const onAddCost = () => {
    dispatch(createOtherCost(cost))
  }

  return (
    <>
      {/* uploading */}
      {/* rawmaterial */}
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4 mb-4">Add Raw Materials</CardTitle>
              {loading ? (
                <Spinner type="grow" color="gray" />
              ) : (
                <AvForm className="repeater" encType="multipart/form-data">
                  <div>
                    <Row>
                      <Col lg={6} className="mb-3">
                        <FormGroup className="mb-3">
                          <Label>Store item</Label>

                          <div className="col-md-12"></div>
                          <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                            <Select
                              onInputChange={handleEnters}
                              value={selectedStore}
                              placeholder={selectedStore}
                              onChange={handlerFinalValue}
                              options={optionGroup1}
                              classNamePrefix="select2-selection"
                              isLoading={true}
                            />
                          </div>
                        </FormGroup>
                      </Col>

                      <Col lg={3} className="mb-3">
                        <label htmlFor="resume">Quantity</label>
                        <AvField
                          name="quantity"
                          type="number" min={0}
                          className="form-control"
                          id="resume"
                          value={rawData.quantity}
                          onChange={e =>
                            setRawData({
                              ...rawData,
                              ["quantity"]: e.target.value,
                            })
                          }
                          required
                        />
                      </Col>
                      <Col lg={3}>
                        <input
                          type="button"
                          className="btn btn-dark mt-4 mr-lg-0 "
                          value="Add"
                          onClick={() => onAddRawMaterial()}
                        />
                      </Col>
                    </Row>
                  </div>
                </AvForm>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* other cost */}
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4 mb-4">Other Costs</CardTitle>
              {loading ? (
                <Spinner type="grow" color="gray" />
              ) : (
                <Form className="repeater" encType="multipart/form-data">
                  <div>
                    <Row>
                      <Col lg={6} className="mb-3">
                        <label>Description</label>
                        <textarea
                          rows="1"
                          type="text"
                          className="form-control"
                          id="resume"
                          onChange={e =>
                            setCost({
                              ...cost,
                              ["note"]: e.target.value,
                            })
                          }
                        />
                      </Col>

                      <Col lg={3} className="mb-3">
                        <label>Price</label>
                        <input
                          type="number" min={0}
                          className="form-control"
                          id="resume"
                          onChange={e =>
                            setCost({
                              ...cost,
                              ["amount"]: e.target.value,
                            })
                          }
                          required
                        />
                      </Col>
                      <Col lg={3}>
                        <Button
                          type="button"
                          className="btn btn-dark mt-4 mr-lg-0"
                          onClick={() => onAddCost()}
                        >
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PreviewCard
