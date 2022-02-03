import React from "react"
import { useSelector } from "react-redux"
import { Media } from "reactstrap"

function OrderDetail() {
  const { orderDetail } = useSelector(state => ({
    orderDetail: state.Orders.orderDetail,
  }))

  return (
    <>
      <Media>
        {/* <img src={img1} alt="" className="avatar-sm me-4" /> */}

        <Media className="overflow-hidden" body>
          <p className="text-muted">{orderDetail?.dealer_name}</p>
          <h5 className="text-truncate font-size-15">{orderDetail?.auto_id}</h5>
        </Media>
      </Media>

      <div className="text-muted mt-4">
        <p>
          <i className="mdi mdi-chevron-right text-primary me-1" />
          Start Date : {orderDetail.start_date}
        </p>
        <p>
          <i className="mdi mdi-chevron-right text-primary me-1" />
          Finish Date : {orderDetail.end_date}
        </p>
        <p>
          <i className="mdi mdi-chevron-right text-primary me-1" />
          Total Amount :{" "}
          <span className="text-info mx-2 font-size-17">
            <i className="bx bx-rupee" />
            {orderDetail.bill_amount}
          </span>
        </p>
      </div>
    </>
  )
}

export default OrderDetail
