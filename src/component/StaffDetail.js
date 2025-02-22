import React from "react";
import { CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { FadeTransform} from 'react-animation-components'


function RenderStaff({ staffs, depart }) {
  return (
    <div className="col-12">
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
      <div className="row">
        <div className="col-12 col-md-4 col-lg-3">
          <CardImg width="100%" src={staffs.image} alt={staffs.name} />
        </div>
        <div className="col-12 col-md-8 col-lg-9">
          <CardTitle>Họ và tên: {staffs.name}</CardTitle>
          <CardText>
            Ngày sinh: {dateFormat(staffs.doB, "dd/mm/yyyy")}
          </CardText>
          <CardText>
            Ngày vào công ty: {dateFormat(staffs.startDate, "dd/mm/yyyy")}
          </CardText>
          <CardText>Phòng ban: {depart.name} </CardText>
          <CardText>Số ngày nghỉ còn lại: {staffs.annualLeave}</CardText>
          <CardText>Số ngày đã làm thêm: {staffs.overTime}</CardText>
        </div>
      </div>
      </FadeTransform>
    </div>
  );
}

const StaffDetail = (props) => {
  if (props.staffs != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staffs.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.staffs.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row mb-3">
          <RenderStaff
            staffs={props.staffs}
            depart = {props.depart.filter((depart) => depart.id === props.staffs.departmentId)[0]}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;