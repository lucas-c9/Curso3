import React, { Component } from 'react';
import Job from './Job';
import PropTypes from 'prop-types';

class Jobs extends Component {
    render(){
        return this.props.jobs.map(job => (
            <Job
                job={job}
                key={job.id}
                deleteJob={this.props.deleteJob}
            />
        ));
    }
}

Jobs.propTypes = {
    jobs: PropTypes.array.isRequired
}

export default Jobs;