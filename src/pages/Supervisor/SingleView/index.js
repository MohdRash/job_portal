import React, { useEffect, useState } from "react"
import {
  Col,
  Container,
  Input,
  InputGroup,
  Label,
  Row,
  Card,
  CardBody,
  Media,
  Spinner,
  Badge,
} from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import PropTypes from "prop-types"
import { map } from "lodash"

//actions
import {
  balanceWithdraw,
  deleteSupervisor,
  getSupervisorDetail,
} from "store/actions"

//Import Images
import userProfile from "assets/images/logo/user.png"

//components
import Transaction from "./Transation"
import DeleteModal from "components/Common/DeleteModal"
import Table from "./Table"
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import Schedules from "./Schedule"
const SupervisorDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const { supervisorDetail, loading, withdrawMsg } = useSelector(state => ({
    supervisorDetail: state.Supervisors.supervisorDetail,
    loading: state.loading,
    withdrawMsg: state.Supervisors.withdrawMsg,
  }))
  const [toggleWithdraw, setToggleWithdraw] = useState(false)
  const [amount, setAmount] = useState({
    supervisor: params.id,
    transaction_amount: "",
  })

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    setIsOpen(true)
  }
  const handleDeleteEvent = () => {
    dispatch(deleteSupervisor(supervisorDetail.id, history))
    setIsOpen(false)
    history.push("/supervisors")
  }

  useEffect(() => {
    dispatch(getSupervisorDetail(params.id))
  }, [])

  const supervisorData = [
    {
      id: 100,
      title: " Frames per Day",
      value: `${supervisorDetail?.cols_per_day}`,
      icon: "mdi mdi-window-closed-variant",
    },
    {
      id: 200,
      title: "Cost per Frame",
      value: `${supervisorDetail?.cost_per_col}`,
      icon: "bx bx-rupee",
    },
    {
      id: 300,
      title: "Balance Amount",
      value: `${withdrawMsg?.balance}`,
      icon: "mdi mdi-wallet",
    },
  ]

  const handleWithdraw = () => {
    setToggleWithdraw(true)
    if (toggleWithdraw) {
      dispatch(balanceWithdraw(amount))
      setToggleWithdraw(false)
      dispatch(getSupervisorDetail(params.id, '', ''))
    }
  }

  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />
      <MetaTags>
        <title>Supervisor | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Supervisors" breadcrumbItem="Supervisor" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg="6" md="6" className="mb-4">
                        <Media>
                          <div className="me-3">
                            <img
                              src={userProfile}
                              alt=""
                              className="avatar-md rounded-circle img-thumbnail"
                            />
                          </div>
                          <Media className="align-self-center" body>
                            <div className="text-muted">
                              <h5 className="mb-1">
                                {supervisorDetail?.account?.username}
                              </h5>

                              <p className="mb-0 text-capitalize">
                                {supervisorDetail?.account?.role}
                              </p>
                            </div>
                          </Media>
                        </Media>
                      </Col>

                      <Col lg="4" md="6" className="d-lg-block">
                        <Media className="align-self-center" body>
                          <div className="text-muted">
                            {loading ? (
                              <Spinner />
                            ) : (
                              <>
                                <h5 className="mb-1">
                                  {supervisorDetail?.account?.email}
                                </h5>
                                <p className="mb-1">
                                  {supervisorDetail?.account?.phone}
                                </p>
                                <p className="mb-4">
                                  {supervisorDetail?.account?.first_name}
                                </p>
                                <Link
                                  className=""
                                  to={`/supervisors/${supervisorDetail?.id}?schedules`}
                                >Schedules
                                  <i className="mdi mdi-arrow-right ms-1" />
                                </Link>
                              </>
                            )}
                          </div>
                        </Media>
                      </Col>

                      <Col lg="2" className="d-lg-block">
                        <div className="mt-4">

                        </div>
                        <div className="mt-4">
                          <Link
                            to={`/supervisor/update/${supervisorDetail?.id}`}
                            className={`btn btn-secondary ${loading && "disabled"
                              } btn-sm`}
                          >
                            Update Profile{" "}
                            <i className="mdi mdi-arrow-right ms-1" />
                          </Link>
                        </div>
                        <div className="mt-4">
                          <Link
                            style={{ opacity: 0.8 }}
                            to="#"
                            className={`btn btn-danger ${loading && "disabled"
                              }  btn-sm`}
                            onClick={handleDelete}
                          >
                            Block Account
                            <i className="fas fa-trash ms-2"></i>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              {map(supervisorData, (item, index) => (
                <Col sm="4" key={index}>
                  <Card
                    className="mini-stats-wid"
                    style={{ minHeight: "130px" }}
                  >
                    <CardBody>
                      <Media>
                        <div className="me-3 align-self-center">
                          <i className={`${item?.icon} h2 text-warning mb-0`} />
                        </div>
                        <Media body>
                          <p className="text-muted mb-2">{item.title}</p>
                          <h5 className="mb-0">
                            <span className="font-size-14 text-muted">
                              {item.value}
                            </span>
                          </h5>
                        </Media>
                      </Media>
                      {item.title == "Balance Amount" && (
                        <>
                          {toggleWithdraw && (
                            <InputGroup className="mb-3 mt-4">
                              <Label className="input-group-text">Amount</Label>

                              <Input
                                type="text"
                                className="form-control"
                                placeholder="0 /-"
                                onChange={e =>
                                  setAmount({
                                    ...amount,
                                    ["transaction_amount"]: e.target.value,
                                  })
                                }
                                required
                              />
                            </InputGroup>
                          )}

                          <div
                            className="mt-3"
                            style={{
                              marginLeft: "auto",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Link
                              to={`/supervisors/${supervisorDetail?.id}?transactions`}
                            >
                              Transactions
                            </Link>
                            <Link
                              type="submit"
                              to="#"
                              className={`btn btn-${toggleWithdraw ? "success" : "info"
                                } btn-sm w-md`}
                              onClick={handleWithdraw}
                            >
                              {toggleWithdraw ? "Confirm" : "Withdraw"}
                            </Link>
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              ))}

              <Col xl="12">
                <Table />
              </Col>
              <Col xl="12">
                <Transaction />
              </Col>
              <Col xl="12">
                <Schedules />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default SupervisorDetails

SupervisorDetails.propTypes = {
  history: PropTypes.object,
}
