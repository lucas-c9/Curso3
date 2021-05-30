import React from 'react';
import Cards from './Cards';

export class List extends React.Component {

  render() {
    return this.props.jobs.map(job => (
      <div class='container'>
        <br></br>
        <Cards
          job={job}
          deleteJob={this.props.deleteJob}
        />
      </div>
    ));
  }

}
