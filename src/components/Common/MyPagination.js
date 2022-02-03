import { map, range } from "lodash";
import PropTypes from "prop-types"
import React from "react"
import { Col, Row } from "reactstrap"

const MyPagination = ({ pages, clcickedPage, onNunClick, onNextClick, onPrevClick, apiPage, onFastPrevClick, onFastNextClick }) => {


    const allPages = () => {
        if (pages.length < 3) {
            return pages
        } else if (clcickedPage > pages.length) {
            return range(clcickedPage - 4, clcickedPage)
        } else if (clcickedPage < 2) {
            return range(clcickedPage, clcickedPage + 4)
        } else {
            return range(clcickedPage - 2, clcickedPage + 2)
        }
    }

    return (
        <Row
            className="align-items-md-center mt-30 "
            style={{ marginTop: "2rem" }}
        >
            <Col
                className="inner-custom-pagination d-flex
                  pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination
                  "
            >
                <div className="text-md-right ms-auto overflowScroll">



                    {clcickedPage <= 1 ? (
                        <></>
                    ) : (<>
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Third group"
                        >
                            <span
                                className="btn btn-outline-light text-info font-size-17"
                                style={{
                                    borderRadius: "50%",
                                    border: "none",
                                }}
                                onClick={onFastPrevClick}
                            >
                                <i className="bx bx-chevrons-left"></i>
                            </span>
                        </div>
                        <div
                            className="btn-group me-0 "
                            role="group"
                            aria-label="First group"
                        >
                            <span
                                style={{
                                    borderRadius: "50%",
                                    border: "none",
                                }}
                                className="btn btn-outline-light text-info "
                                onClick={onPrevClick}
                            >
                                <i className="fas fa-angle-left"></i>
                            </span>
                        </div>
                    </>
                    )}
                    <div
                        className="btn-group me-2 "
                        role="group"
                        aria-label="Second group"
                    >
                        {map(allPages(), (item, index) => (
                            <span
                                key={index}
                                className="btn btn-outline-info"
                                onClick={() => onNunClick(item)}
                                style={{
                                    borderRadius: "50%",
                                    marginLeft: "5px",
                                    marginRight: "5px",
                                    border: "none",
                                    backgroundColor:
                                        apiPage() == item && "#66c2ff",
                                    color: apiPage() == item && "#fff",
                                }}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                    {clcickedPage >= pages?.length ? (
                        <></>
                    ) : (<>
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Third group"
                        >
                            <span
                                className="btn btn-outline-light text-info"
                                style={{
                                    borderRadius: "50%",
                                    border: "none",
                                }}
                                onClick={onNextClick}
                            >
                                <i className="fas fa-angle-right"></i>
                            </span>
                        </div>
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Third group"
                        >
                            <span
                                className="btn btn-outline-light text-info font-size-17"
                                style={{
                                    borderRadius: "50%",
                                    border: "none",
                                }}
                                onClick={onFastNextClick}
                            >
                                <i className="bx bx-chevrons-right"></i>
                            </span>
                        </div>
                    </>
                    )}

                </div>
            </Col>
        </Row>
    )
}

MyPagination.propTypes = {
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onNunClick: PropTypes.func,
    pages: PropTypes.array,
    clcickedPage: PropTypes.number,
    apiPage: PropTypes.func,
    onFastPrevClick: PropTypes.func,
    onFastNextClick: PropTypes.func
}

export default MyPagination
