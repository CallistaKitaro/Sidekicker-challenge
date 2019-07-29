import React from 'react';
import './job.css'

class Job extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showDetail : false,
        };
        
        this.toggleDetails = this.toggleDetails.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    toggleDetails(){
        var detailToggle = !this.state.showDetail;
        this.setState({ showDetail: detailToggle});
    }

    handleClick(event){
        event.preventDefault();
        this.props.handleDelete(this.props.jobObject.id)
    }

    render(){
        return(
            <div className="job-card">

                <div className="job-card-content">
                    <h3 className="job-card-title">{this.props.jobObject.title}</h3>

                    

                    {this.state.showDetail && 
                        <JobDetail jobObject={this.props.jobObject} />
                    }
                </div>

                <div className="job-card-buttons-wrapper">
                    <div className="job-card-buttons">
                        <button onClick={this.toggleDetails} className="btn btn-primary">Details</button>
                        <button onClick={this.handleClick} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        )
    }

}


function JobDetail(props){
    return(
        <div className="job-card-details">
            <hr />
            <p className="job-card-detail-label">Location: </p>
            <p>{props.jobObject.location}</p>
            <br />
            <p className="job-card-detail-label">Job Description:</p>
            <p>{props.jobObject.job_description}</p>
        </div>
    )
}

export default Job