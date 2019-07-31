import React from 'react';
import './postJob.css';

class PostJob extends React.Component {
  constructor(){
    super();
    this.state = {
      title : '', 
      job_description: '', 
      location: '' ,
      alert: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event){
    event.preventDefault();

    // Capitalize value for presentation purpose
    var inputValue = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)

    this.setState({[event.target.name]: inputValue})
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    
    var valid = true;

    // ['title', 'job_description', 'location'].forEach( field => {
    //   var value = this.state[field] 
    //   value = value.trim()
    //   if (!value || value === ''){
    //     valid = false;
    //   }
    // })
    
    // Check for null/empty input
    for (let val of data.values()){
      val = val.trim();
      
      if (!val || val === ''){
        valid = !valid;
        break; // Terminate if one of the fields is found empty
      }
    }
    
    // After input has been validated
    if(valid){

      // Post request to backend
      fetch('http://localhost:8000/api/job', {
        method: 'POST',
        body: data,
      }).then( () => {

        // Empty form after submission
        this.setState({ 
          title: '',
          job_description: '', 
          location: '' ,
        })

        this.setState({alert: 'success'}) // Add success alert when post request is completed
      }).catch( () => {
        this.setState({alert: 'request'})  // Unable to make post request to backend
      });
    }
    else{
      this.setState({alert: 'error'}) // Alert user that input form is invalid 
    }
  }

  render(){
    return (
      <div className="post-job">

        <h2 className="post-job-header">Create New Job</h2>

        <AlertHandler alert={this.state.alert}/>

        <form className="post-job-form" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Job Title</label>
            <div className="col-sm-9">
              <input data-testid="title" name="title" value={this.state.title} onChange={this.handleChange} type="text" className="form-control" />
            </div>
          </div>
  
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Job Description</label>
            <div className="col-sm-9 ">
              <textarea data-testid="job_description" name="job_description" value={this.state.job_description} onChange={this.handleChange} type="text" className="form-control" rows="5" />
            </div>
          </div>
  
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Location</label>
            <div className="col-sm-9">
              <input data-testid="location" name="location" value={this.state.location} onChange={this.handleChange} type="text" className="form-control" />
            </div>
          </div>

          <div className="post-job-button">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

/* Handle alerts to guide user in posting jobs */
function AlertHandler(props){
  if(props.alert === 'error'){
    return (
      <div className="alert alert-danger" role="alert">
        <span>Please fill in all the fields</span>
      </div>
    )
  }
  else if(props.alert === 'success'){
    return (
      <div className="alert alert-success" role="alert">
        <span>New job has been created</span>
      </div>
    )
  }
  else if(props.alert === 'request'){
    return (
      <div className="alert alert-warning" role="alert">
        <span>New job cannot be added at the moment</span>
      </div>
    )
  }
  else{
    return null
  }
}

export default PostJob;