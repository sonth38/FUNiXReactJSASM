import React, {Component} from "react";
import {Card, CardTitle, CardBody, CardText } from 'reactstrap';

// Presentational Component
function RenderDept({dept}) {
    return(
            //Render Department dung props cua Department Component
            <Card>
                <CardTitle className="m-2">{dept.name}</CardTitle>
                    <CardBody>
                        <CardText>Số lượng nhân viên: {dept.numberOfStaff}</CardText>
                    </CardBody>
            </Card>        
        );
}


//Container components
class Department extends Component {    
    render(){
        console.log(this.props.depart.depart)
        //Dung map() de fetch toan bo data tu props cua MainComponent
        const departments = this.props.depart.depart.map((department) => {
            return(
                <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={department.id}>
                    <RenderDept dept={department} />
                </div>
            )
        })
        return(
            <div className="container">
                <div className="row m-3">
                    {departments}
                </div>
            </div>
        );
    }
}

export default Department;