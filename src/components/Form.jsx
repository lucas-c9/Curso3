import React from 'react';
import { getCountries, getPlaces, getOrganizations } from '../APIs/fakeAPI';
import { Form as Frm, Button } from 'react-bootstrap';
import Message from './Message';
import { checkInput } from '../utils/validations';


export class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      newJob: {
        position: '',
        description: '',
        company: 1,
        city: 1,
        country: 1
      },
      countriesfromAPI: [],
      citiesfromAPI: [],
      organizationsfromAPI: [],
      withError: false
    };
  }

  handleNewJobName = (evt) => {
    this.setState(prevState => ({
        newJob: {
          ...prevState.newJob,
          position: evt.target.value
        }
      })
    );
  }

  handleNewJobDescription = (evt) => {
    this.setState(prevState => ({
        newJob: {
          ...prevState.newJob,
          description: evt.target.value
        }
      })
    );
  }

  handleNewJobCompany = (evt) => {
    this.setState(prevState => ({
        newJob: {
          ...prevState.newJob,
          company: evt.target.value
        }
      })
    );
  }

  handleNewJobCity = (evt) => {
    this.setState(prevState => ({
        newJob: {
          ...prevState.newJob,
          city: evt.target.value
        }
      })
    );
  }

  handleNewJobCountry = (evt) => {
    this.setState(prevState => ({
        newJob: {
          ...prevState.newJob,
          country: evt.target.value
        }
      })
    );
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    if( 
      checkInput(this.state.newJob.position)
      && checkInput(this.state.newJob.description)
      && checkInput(this.state.newJob.city)
      && checkInput(this.state.newJob.company) 
      && checkInput(this.state.newJob.country) 
    ){
      this.props.onSubmitNewJob(this.state.newJob)
    }
    else{
      return false;
    }
  }

  componentDidMount() {
    getCountries().then(responseCountries => this.setState({
      countriesfromAPI: responseCountries
    }))
    getPlaces().then(responsePlaces => this.setState({
      citiesfromAPI: responsePlaces
    }))
    getOrganizations().then(responseCompanies => this.setState({
      organizationsfromAPI: responseCompanies
    }))
  }

  render() {
    return (
      <Frm onSubmit={this.handleSubmit}>
        <Frm.Label>Position Name</Frm.Label>
        <Frm.Control 
          type="text" 
          placeholder="Title for the position" 
          required 
          value={this.state.newJob.position} 
          onChange={(e) => this.handleNewJobName(e)}
        />

        <Frm.Label>Description</Frm.Label>
        <Frm.Control 
          type="text" 
          placeholder="Description..." 
          required 
          value={this.state.newJob.description} 
          onChange={(e) => this.handleNewJobDescription(e)}
        />

        <Frm.Label>Country</Frm.Label>
        <Frm.Control 
          as="select"
          onChange={(e) => this.handleNewJobCountry(e)}>
          <option value="">Select option</option>
          {
            this.state.countriesfromAPI.map((country, index) => {
                return <option key={index} value={country.id}>{country.name}</option>
            })
          }
        </Frm.Control>

        <Frm.Label>City</Frm.Label>
        <Frm.Control 
          as="select"
          onChange={(e) => this.handleNewJobCity(e)}>
          <option value="">Select option</option>
          {
            this.state.citiesfromAPI.map((city, index) => {
              if(city.countrieId == this.state.newJob.country){
                return <option key={index} value={city.id}>{city.name}</option>
              }
              else{
                return <Message type="danger" message="API error" time={5}/>
              }
            })
          }
        </Frm.Control>

        <Frm.Label>Company</Frm.Label>
        <Frm.Control 
          as="select"
          onChange={(e) => this.handleNewJobCompany(e)}>
          <option value="">Select option</option>
          {
            this.state.organizationsfromAPI.map((company, index) => {
              if(company.placeId == this.state.newJob.city){
                return <option key={index} value={company.id}>{company.name}</option>
              }
              else{
                return <Message type="danger" message="API error" time={5}/>
              }
            })
          }
        </Frm.Control>
          <div>
            <br></br>
          </div>
        <Button variant="info" type="submit">Add position</Button>

      </Frm>
    );
  }
}