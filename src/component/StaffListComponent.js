import React, { Component } from 'react';
import { Card, CardTitle } from 'reactstrap';

class StaffList extends Component {

    constructor(props) {
        super(props);

        
    }

    render() {
        const staff = this.props.staffs.map((staff) => {
            return (
                <div className='col-12 col-md-5 mt-5'>
                    <Card key={staff.id} >
                        <CardTitle>{staff.name}</CardTitle>
                    </Card>
                </div>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    {staff}
                </div>
            </div>
        );
    };


};

export default StaffList;