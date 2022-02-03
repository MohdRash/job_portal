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
} from "reactstrap"
import Select from "react-select"
import { map } from "lodash"

//action
import {
  createRawmaterial,
  deleteRawmaterial,
  getRawmaterials,
  getStoreItems,
} from "store/actions"

import AvField from "availity-reactstrap-validation/lib/AvField"
import AvForm from "availity-reactstrap-validation/lib/AvForm"

function RawmaterialForm(myDisabled) {
  const dispatch = useDispatch()

  //redux state
  const { storeItems, loading, productDetail, createdRawMaterial } =
    useSelector(state => ({
      storeItems: state.StoreItems.storeItems,
      loading: state.StoreItems.loading,
      productDetail: state.Products.productDetail,
      createdRawMaterial: state.Products.createdRawMaterial,
    }))

  const [selectedStore, setselectedStore] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [newRawMaterials, setNewRawMaterials] = useState([])
  const [rawData, setRawData] = useState({
    product: productDetail?.id,
    store_item: "",
    quantity: "",
  })
  useEffect(() => {
    dispatch(getStoreItems("", ""))
    dispatch(getRawmaterials())
  }, [dispatch])

  useEffect(() => {
    dispatch(getStoreItems(searchText))
  }, [searchText, dispatch])

  useEffect(() => {
    setRawData({ ...rawData, product: productDetail?.id })
  }, [productDetail])

  useEffect(() => {
    if (createdRawMaterial.id) {
      setNewRawMaterials([...newRawMaterials, createdRawMaterial])
    }
  }, [createdRawMaterial])

  const onAddFormRow = async () => {
    await dispatch(createRawmaterial(rawData))
    setRawData({
      ...rawData,
      ["quantity"]: '',
    })
  }

  const onDeleteFormRow = id => {
    dispatch(deleteRawmaterial(id))
    var modifiedRows = [...newRawMaterials]
    modifiedRows = modifiedRows.filter(x => x["id"] !== id)
    setNewRawMaterials(modifiedRows)
  }

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

  return (
    <>
      {/* succesfully uploaded */}

      {newRawMaterials.length > 0 && (
        <Row>
          <Col xl="1"></Col>
          <Col lg={10}>
            <Card>
              <CardBody>
                <CardTitle className="h4 mb-4">
                  Seleted Raw Materials{" "}
                </CardTitle>
                {loading ? (
                  <Spinner type="grow" color="gray" />
                ) : (
                  <Form className="repeater" encType="multipart/form-data">
                    <div>
                      {map(newRawMaterials, (item, index) => (
                        <Row key={index}>
                          <Row className="text-muted mt-4">
                            <Col lg={4} md={4}>
                              <p>
                                <i className="mdi mdi-chevron-right text-primary me-1" />
                                Store Item :{item?.name}
                              </p>
                            </Col>
                            <Col lg={3} md={4}>
                              <p>Quantity : {item?.quantity || ""}</p>
                            </Col>

                            <Col lg={2} className="align-self-center m-auto">
                              <div
                                className="d-grid "
                                style={{ maxWidth: "200px" }}
                              >
                                <input
                                  type="button"
                                  className="btn btn-danger mt-0 mr-lg-0 mb-4"
                                  value="Remove"
                                  style={{ maxWidth: "120px" }}
                                  onClick={() => onDeleteFormRow(item.id)}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Row>
                      ))}
                    </div>
                  </Form>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xl="1"></Col>
        </Row>
      )}

      {/* uploading */}
      <Row>
        <Col xl="1"></Col>
        <Col lg={10}>
          <Card>
            <CardBody>
              <CardTitle className="h4 mb-4">Add Raw Materials</CardTitle>

              <AvForm className="repeater" encType="multipart/form-data">
                <div>
                  <Row>
                    <Col lg={3} className="mb-3">
                      <label htmlFor="name">Raw Material:</label>
                    </Col>

                    <Col lg={3} className="mb-3">
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
                        type="number"
                        className="form-control"
                        id="resume"
                        value={rawData.quantity}
                        min={0}
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
                        value="Add New"
                        style={{
                          pointerEvents:
                            myDisabled.myDisabled === true && "none",
                        }}
                        onClick={() => onAddFormRow()}
                      />
                    </Col>
                  </Row>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
        <Col xl="1"></Col>
      </Row>
    </>
  )
}

export default RawmaterialForm
