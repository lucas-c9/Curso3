import React from 'react';
//Import Components
import Jobs from '../components/Jobs';
import JobForm from '../components/JobForm'

//Import initial data
import initialJobs from '../data/initialJobs';

//Import utils
import newId from '../utils/newId';

class Home extends React.Component{
state = {
    jobs : initialJobs
}

deleteJob = id => {
    const newJobs = this.state.jobs.filter(job => job.id !== id);
    this.setState({ jobs: newJobs })
}

addJob = (puesto, empresa, ciudad, pais) => {
    const newJob = {
    id: newId(),
    puesto,
    empresa,
    ciudad,
    pais
    }
    this.setState({ jobs: [...this.state.jobs, newJob]});
}

render(){
    return(
    <div className = "container">
    <JobForm addJob={this.addJob} />
    <Jobs
        jobs={this.state.jobs}
        deleteJob={this.deleteJob}
    />
    </div>
    );
}
}

export default Home;