import React from 'react';
import Job from './Job';
import './listJobs.css';

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import Pagination from 'react-bootstrap/Pagination';


class ListJobs extends React.Component {
  constructor(){
    super();

    this.state = {
      jobs: [],
      currentPage: 1,
      jobsPerPage: 8,
      loading: false,
      fetchSuccess: Boolean,
      deleteDialog: false,
    };
    
    this.handlePagination = this.handlePagination.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.getListofJobs = this.getListofJobs.bind(this);
  }

  handlePagination(event){
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  // Alert box for deleting job
  confirmDelete(id){
    confirmAlert({
      title: 'Delete this job?',
      message: <p style={{fontSize:'15px'}}>Job post will be deleted permanently</p>,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteJob(id)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }

  // Delete request to backend
  deleteJob(id){
    fetch("http://localhost:8000/api/job/" + id, {
        method: 'DELETE',
    }).then( () =>{
      this.getListofJobs();
    })
  }

  // Get all jobs from backend
  getListofJobs(){
    this.setState({ loading: true})
    fetch('http://localhost:8000/api/jobs')
    .then( res => {
      return res.json();
    }).then( data => {
      this.setState({ 
        loading: false,
        jobs: data,
        fetchSuccess : true  
      });
    })
    .catch(() => {
      this.setState({ 
        loading: false,
        fetchSuccess : false 
      })
    })
  }
  
  // When Component is first loaded
  componentDidMount(){
    this.getListofJobs();
  }

  render(){

    // Displaying current page jobs
    const { jobs, currentPage, jobsPerPage } = this.state;
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentPageJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
    const renderJobs = currentPageJobs.map((job, index) => {
      return (<Job key={job.id} jobObject={job} handleDelete={this.confirmDelete} />)
    });
    
    // Display and handle pagination
    const pageNumbers = [];
    for (let number = 1; number <= Math.ceil(jobs.length / jobsPerPage); number++) {
      pageNumbers.push(
        <Pagination.Item key={number} active={number === currentPage} id={number} onClick={this.handlePagination}>
          {number}
        </Pagination.Item>
      );
    }

    // Display content
    if (!this.state.fetchSuccess && !this.state.loading){
      return ( <ErrorMessage message={'Jobs cannot be viewed at the moment. Please ensure backend server is running.'} /> )
    }
    else if (this.state.fetchSuccess && !this.state.loading){
      if(this.state.jobs.length > 0){
        return (
          <div className="all-jobs">
            {renderJobs}
            {/* Show pagination only when there are a lot of jobs */}
            {jobs.length > jobsPerPage && <Pagination> {pageNumbers} </Pagination>}
          </div>
        );
      }
      else{
        return( <ErrorMessage message={'No jobs to show. Please add new jobs.'} /> )
      }
    }
    return ( <ErrorMessage message={'Fetching data....'} /> )
  }
}

const ErrorMessage = (props) => {
  return(
    <div className="error-message">
      <p>{props.message}</p>
    </div>
  )
}


export default ListJobs;