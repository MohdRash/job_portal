import { map } from "lodash"
import React from "react"
import { useSelector } from "react-redux"
import { Card, CardBody, CardTitle } from "reactstrap"

const PersonalCv = () => {
  const { dashboardData } = useSelector(state => ({
    dashboardData: state.Dashboard.dashboardData,
  }))
  console.log(dashboardData);

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">CV uploaded </CardTitle>
          <div className="text-center">
            
            {dashboardData?.student_other_detail?.cv?.length > 0 ? (
              <object data={dashboardData?.student_other_detail?.cv} type="application/pdf" width="400" height="300">
                <embed src={dashboardData?.student_other_detail?.cv} width="400px" height="300px" />
                  <p>This browser does not support PDFs. Please download the PDF to view it: 
                  <a href={dashboardData?.student_other_detail?.cv}>Download PDF</a>.</p>
              </object>
            ) : (
              <div className="mb-4">
                <i className="bx bx-message-rounded-x text-warning display-1" />
                <p className="text-info">
                  There is no CV uploaded{" "}
                </p>
              </div>
              
            )}
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default PersonalCv
