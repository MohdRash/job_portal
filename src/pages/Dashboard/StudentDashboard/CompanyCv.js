import { map } from "lodash"
import React from "react"
import { useSelector } from "react-redux"
import { Card, CardBody, CardTitle } from "reactstrap"

const CompanyCv = () => {
  const { dashboardData } = useSelector(state => ({
    dashboardData: state.Dashboard.dashboardData,
  }))

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle>CV Modified</CardTitle>
          <div className="text-center">
            
            {dashboardData?.student_other_detail?.company_cv?.length > 0 ? (
	
            <object data={dashboardData?.student_other_detail?.company_cv} type="application/pdf" width="400" height="300">
              <embed src={dashboardData?.student_other_detail?.company_cv} width="400px" height="300px" />
              <p>This browser does not support PDFs. Please download the PDF to view it: 
              <a href={dashboardData?.student_other_detail?.company_cv}>Download PDF</a>.</p>
            </object>
            ) : (
              <div>
                <i className="bx bx-message-rounded-x text-warning display-3" />
                <p className="text-info">
                  There is no CV updated at this time{" "}
                </p>
              </div>
            )}
          </div>
          <div className="text-center">
              <button className="btn btn-secondary" style={{fontSize: '10px'}}><a href={dashboardData?.student_other_detail?.cv}>Download Previous CV</a></button>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default CompanyCv
