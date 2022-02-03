import axios from "axios"
import { API_URL } from "helpers/api_methods"
import React, { useState } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap"

//actions
import {
  createProduct,
  createProductFail,
  createProductSuccess,
  getProductDetailSuccess,
} from "store/actions"

//components
import Breadcrumbs from "../../../../components/Common/Breadcrumb"
import OtherCost from "./OtherCost"
import RawmaterialForm from "./RawmaterialForm"

const CreateProduct = () => {
  const dispatch = useDispatch()
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [remove, setRemove] = useState(false)

  const { createProducterror, loading } = useSelector(state => ({
    createProducterror: state.Products.createProducterror,
    loading: state.Products.loading,
  }))

  const [state, setstate] = useState({
    name: "",
    no_of_cols: "",
    profit: "",
    description: "",
    image: null,
  })

  const handleChange = e => {
    setstate({
      ...state,
      [e.target.id]: e.target.value,
    })
  }

  const handleImageChange = e => {
    setstate({
      ...state,
      image: e.target.files[0],
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(createProduct())

    const form_data = new FormData()
    { state?.image?.name && form_data.append("image", state?.image, state?.image?.name) }
    form_data.append("name", state.name)
    form_data.append("no_of_cols", state.no_of_cols)
    form_data.append("description", state.description)
    form_data.append("profit", state.profit)

    let url = `${API_URL}/store/product/`
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "token " + sessionStorage.getItem("token"),
        },
      })
      .then(res => {
        setBtnDisabled(false)
        setRemove(true)
        dispatch(createProductSuccess(res.data))
        dispatch(getProductDetailSuccess(res.data))
        window.scrollTo(0, 400)
      })
      .catch(err => createProductFail(err))
  }

  return (
    <>
      <MetaTags>
        <title>Product | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Products" breadcrumbItem="Create Product" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="1"></Col>
              <Col lg={10}>{ProductForm()}</Col>
              <Col xl="1"></Col>
            </Row>
          </div>
          {btnDisabled == false && (
            <>
              <div className="container-fluid">
                <RawmaterialForm myDisabled={btnDisabled} />
              </div>
              <div className="container-fluid">
                <OtherCost myDisabled={btnDisabled} />
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  )

  function ProductForm() {
    return (
      <Card>
        <CardBody>
          <CardTitle className="h4 mb-4">Add New Product</CardTitle>

          <form className="form-horizontal" onSubmit={handleSubmit}>
            {createProducterror && (
              <Alert color="danger">{createProducterror}</Alert>
            )}

            <div className="row mb-4">
              <Label htmlFor="name" className="col-sm-3 col-form-label">
                Product Name
              </Label>
              <Col sm={9}>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </div>

            <div className="row mb-4">
              <Label htmlFor="no_of_cols" className="col-sm-3 col-form-label">
                Number of Columns
              </Label>
              <Col sm={9}>
                <input
                  name="no_of_cols"
                  className="form-control"
                  id="no_of_cols"
                  type="number"
                  minLength="0"
                  required
                  value={state.no_of_cols}
                  onChange={handleChange}
                />
              </Col>
            </div>

            <div className="row mb-4">
              <Label htmlFor="profit" className="col-sm-3 col-form-label">
                Profit
              </Label>
              <Col sm={9}>
                <input
                  min={0}
                  name="profit"
                  type="number"
                  className="form-control"
                  id="profit"
                  value={state.profit}
                  onChange={handleChange}
                />
              </Col>
            </div>

            <div className="row mb-4">
              <Label htmlFor="description" className="col-sm-3 col-form-label">
                Description
              </Label>
              <Col sm={9}>
                <textarea
                  name="description"
                  className="form-control"
                  id="description"
                  row="4"
                  value={""}
                  onChange={handleChange}
                >
                  {state.description}

                </textarea>
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

            {remove == false && <div className="row justify-content-end">
              <Col sm={2}>
                <div>
                  <Button type="submit" color="success" className="w-md">
                    {loading && (
                      <>
                        <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                      </>
                    )}
                    Create
                  </Button>
                </div>
              </Col>
            </div>}
          </form>
        </CardBody>
      </Card>
    )
  }
}

export default CreateProduct
