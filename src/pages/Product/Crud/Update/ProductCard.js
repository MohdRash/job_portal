import { AvField, AvForm } from "availity-reactstrap-validation"
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Alert, Button, Card, CardBody, Col, Label, Row } from "reactstrap"
import { Link } from "react-router-dom"
//actions
import {
  getProductDetail,
  updateProduct,
  updateProductFail,
  updateProductSuccess,
} from "store/actions"
import { API_URL } from "helpers/api_methods"
import axios from "axios"
import { Notification } from "components/Common/Notification"

function ProductCard() {
  const dispatch = useDispatch()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [state, setstate] = useState({
    image: null,
  })

  const { productDetail, createProducterror } = useSelector(state => ({
    createProducterror: state.Products.createProducterror,
    productDetail: state.Products.productDetail,
  }))
  function handleValidSubmit(e, values) {
    setLoading(true)
    e.preventDefault()


    // dispatch(updateProduct())

    const form_data = new FormData()
    { state?.image?.name && form_data.append("image", state?.image, state?.image?.name) }
    form_data.append("name", values.name)
    form_data.append("no_of_cols", values.no_of_cols)
    form_data.append("description", values.description)
    form_data.append("profit", values.profit)

    let url = `${API_URL}/store/product/${productDetail.id}/`
    axios
      .put(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "token " + sessionStorage.getItem("token"),
        },
      })
      .then(res => {
        dispatch(updateProductSuccess(res.data))
        setLoading(false)
        Notification({
          type: "success",
          message: "Updated Successfully",
          title: "",
        })

      })
      .catch(err => {

        updateProductFail(err)
        setLoading(false)

        Notification({
          type: "error",
          message: "Update Faild",
          title: "",
        })
      }

      )

  }

  const handleImageChange = e => {
    setstate({
      ...state,
      image: e.target.files[0],
    })
  }

  useEffect(() => {
    dispatch(getProductDetail(params.id))
  }, [])

  return (
    <>
      <Card>
        <CardBody>
          <AvForm
            className="form-horizontal "
            onValidSubmit={(e, v) => {
              handleValidSubmit(e, v)
            }}
          >
            {createProducterror && (
              <Alert color="danger">{createProducterror}</Alert>
            )}

            <div className="row mb-4">
              <Label
                htmlFor="horizontal-username-Input"
                className="col-sm-3 col-form-label"
              >
                Product Name
              </Label>
              <Col sm={9}>
                <AvField
                  id="horizontal-username-Input"
                  name="name"
                  type="text"
                  value={productDetail?.name}
                />
              </Col>
            </div>

            <div className="row mb-4">
              <Label htmlFor="tel-input" className="col-sm-3 col-form-label">
                Number of Columns
              </Label>
              <Col sm={9}>
                <AvField
                  name="no_of_cols"
                  className="form-control"
                  id="tel-input"
                  type="text"
                  value={productDetail?.no_of_cols}
                />
              </Col>
            </div>

            <div className="row mb-4">
              <Label
                htmlFor="horizontal-location-Input"
                className="col-sm-3 col-form-label"
              >
                Profit
              </Label>
              <Col sm={9}>
                <AvField
                  name="profit"
                  type="number" min={0}
                  className="form-control"
                  id="horizontal-location-Input"
                  value={productDetail?.profit}
                />
              </Col>
            </div>
            <div className="row mb-4">
              <Label htmlFor="description" className="col-sm-3 col-form-label">
                Description
              </Label>
              <Col sm={9}>
                <AvField
                  name="description"
                  className="form-control"
                  id="description"
                  row="4"
                  type="textarea"
                  value={productDetail?.description}

                />
              </Col>
            </div>
            <div className="row mb-4">
              <Label htmlFor="image" className="col-sm-3 col-form-label">
                Product Images
              </Label>
              <Col sm={9}>
                <input
                  name="image"
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </Col>
            </div>

            {/* {map(state, (item, i) => (
              <Card
                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                key={i + "-file"}
              >
                <div className="p-2">
                  <Row className="align-items-center">
                    <Col className="col-auto">
                      <img
                        data-dz-thumbnail=""
                        height="80"
                        className="avatar-sm rounded bg-light"
                        alt={item?.name}
                        src={productDetail?.image}
                      />
                    </Col>
                    <Col>
                      <Link to="#" className="text-muted font-weight-bold">
                        {item.name}
                      </Link>
                      <p className="mb-0">
                        <strong>{item.size}kb</strong>
                      </p>
                    </Col>
                  </Row>
                </div>
              </Card>
            ))} */}

            <div className="row justify-content-end">
              <Col sm={9}>
                <div>
                  <Button type="submit" color="success" className="w-md">
                    {loading == true && (
                      <>
                        <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                      </>
                    )}
                    Submit
                  </Button>
                </div>
              </Col>
            </div>
          </AvForm>
        </CardBody>
      </Card>
    </>
  )
}

export default ProductCard

ProductCard.propTypes = {
  history: PropTypes.object,
}
