import AvField from "availity-reactstrap-validation/lib/AvField"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Card, CardBody, CardTitle, Col, Label } from "reactstrap"
import { createDailyWork, getDailyWorks, getSupervisors } from "store/actions"
import Select from "react-select"
import { useParams } from "react-router-dom"

function DailyWorkCreate() {
  const dispatch = useDispatch()

  const { supervisors, loading } = useSelector(state => ({
    supervisors: state.Supervisors.supervisors,
    loading: state.Supervisors.loading,
  }))

  const [selected, setSelected] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [rawData, setRawData] = useState({
    supervisor: "",
  })

  const handleEnters = textEntered => {
    setSearchText(textEntered)
  }
  function handlerFinalValue(event) {
    setSelected(event.label)
    setRawData({
      ...rawData,
      ["supervisor"]: event.value,
    })
  }

  const optionGroup1 = [
    {
      options: supervisors?.results?.map((result, index) => ({
        label: result.account.username,
        value: result.id,
        key: index,
      })),
    },
  ]

  const handleValidSubmit = (onSubmitProps, values) => {
    dispatch(createDailyWork({ ...values, supervisor: rawData.supervisor }))
  }

  useEffect(() => {
    dispatch(getSupervisors(searchText, ""))
  }, [dispatch, searchText])

  return (
    <>
      <Col lg="3"></Col>
      <Col lg="6">
        <Card>
          <CardBody>
            <CardTitle className="h4 mb-4">Create Daily works</CardTitle>

            {/* {error?.response && (
                <Alert color="danger">{error?.response}</Alert>
              )} */}
            <AvForm
              className="form-horizontal "
              onValidSubmit={(onSubmitProps, v) => {
                handleValidSubmit(onSubmitProps, v)
              }}
            >
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-username-Input"
                  className="col-sm-3 col-form-label"
                >
                  Supervisor Name
                </Label>
                <Col sm={9}>
                  <Select
                    onInputChange={handleEnters}
                    value={selected}
                    placeholder={selected}
                    onChange={handlerFinalValue}
                    options={optionGroup1}
                    classNamePrefix="select2-selection"
                    isLoading={true}
                  />
                </Col>
              </div>

              <div className="row mb-4">
                <Label htmlFor="tel-input" className="col-sm-3 col-form-label">
                  Date
                </Label>
                <Col sm={9}>
                  <AvField
                    name="date"
                    className="form-control"
                    id="tel-input"
                    type="date"
                    min={Date.now()}
                    required
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-email-Input"
                  className="col-sm-3 col-form-label"
                >
                  Column
                </Label>
                <Col sm={9}>
                  <AvField
                    id="horizontal-email-Input"
                    name="cols"
                    className="form-control"
                    type="number" min={0}
                    required
                  />
                </Col>
              </div>

              <div className="row justify-content-end">
                <Col sm={9}>
                  <div>
                    <Button type="submit" color="success" className="w-md">
                      {loading && (
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
      </Col>
      <Col lg="3"></Col>
    </>
  )
}

export default DailyWorkCreate
