import PropTypes from "prop-types"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Col, Card, CardBody, Spinner } from "reactstrap"

const MiniWidget = () => {
  const { products, Productloading, finishedProduct } = useSelector(state => ({
    products: state.Products.products,
    Productloading: state.Products.loading,
    finishedProduct: state.Products.finishedProduct,
  }))

  const analatics = [
    {
      icon: "bx bx-archive-in",
      title: "Total Finished Products",
      value: finishedProduct?.count,
      badgeValue: "",
      color: "success",
      desc: "Finished Items",
      warningMsg: "",
      msgColor: "info",
      loading: Productloading,
      linkPath: "/products",
    },
  ]
  return (
    <React.Fragment>
      {analatics.map((report, index) => (
        <Col key={index}>
          <Card>
            <CardBody>
              <Link
                to={report.linkPath}
                className="d-flex align-items-center mb-3"
              >
                <div className="avatar-xs me-3">
                  <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                    <i className={report.icon} />
                  </span>
                </div>
                <h5 className="font-size-14 mb-0">{report.title}</h5>
              </Link>
              {report.loading ? (
                <Spinner type="grow" color="info" />
              ) : (
                <div className="text-muted mt-4">
                  <h4>
                    {report.value}
                    <i className="mdi mdi-chevron-up ms-1 text-success" />
                  </h4>
                  <div className="d-flex">
                    {report.badgeValue > 0 ? (
                      <span
                        className={
                          "badge badge-soft-" +
                          `${
                            report.badgeValue > 0
                              ? report.color
                              : report.msgColor
                          }` +
                          " font-size-12"
                        }
                      >
                        {report.badgeValue}
                      </span>
                    ) : (
                      <span className="text-info">{report.warningMsg}</span>
                    )}
                    {report.badgeValue > 0 && (
                      <span className="ms-2 text-truncate">{report.desc}</span>
                    )}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

MiniWidget.propTypes = {
  analatics: PropTypes.array,
}

export default MiniWidget
