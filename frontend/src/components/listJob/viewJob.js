import React from 'react';

class ViewJob extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            job: ''
        };
        
    }

    componentDidMount(){
        fetch ('http://localhost:8000/api/job/' + this.props.match.params.id )
        .then( res => {
            return res.json();
          }).then( data => {
            this.setState({ 
              job: data
            });
          })
    }

    render(){
        return (
            <div>
                New page here {this.props.match.params.id}

                {this.state.job.id}
                {this.state.job.title}
                {this.state.job.job_description}
                {this.state.job.location}
            </div>
        )
    }
}

export default ViewJob