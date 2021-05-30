import React from 'react';
import {List} from '../components/List'; 
import {Form} from '../components/Form';
import { getJobs , postData, deleteData, getOrganizations } from '../APIs/fakeAPI';
import Swal from 'sweetalert2';


export class Jobs extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: [], 
      jobsfromAPI: [],
      organizations: [],
      withError: false
    };
  }

  postNewJob = (newJob) => {
    postData(newJob);
  }

  deleteJob = (idToDelete) => {
    Swal.fire({
      title: 'Do you want to delete this record?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', '', 'success')
        deleteData(idToDelete)
      } else if (result.isDenied) {
        Swal.fire('The record was not deleted!', '', 'info')
      }
    })
  }

  componentDidMount() {
    getJobs().then(jobsFromAPI => this.setState({
      jobsfromAPI: jobsFromAPI
    }))
    getOrganizations().then(companiesFromAPI => this.setState({
      organizations: companiesFromAPI
    }))
  }

  render() {
    return (
      <div className="container">
        { this.state.withError && <p>Error al conectarse con la API</p> }
        <h1>Puestos de Trabajo</h1>
        <Form onSubmitNewJob={this.postNewJob}></Form>
        <List jobs={this.state.jobsfromAPI} deleteJob={this.deleteJob}></List> 
      </div>
    );
  }

}