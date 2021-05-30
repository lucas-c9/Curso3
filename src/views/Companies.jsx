import React from 'react';
import { getPlaces, getCountries, getOrganizations, postOrganizations, deleteOrganizations } from '../APIs/fakeAPI';
import { Form , Button, Card, CardGroup } from 'react-bootstrap';
import Title from '../components/Title';
import { checkInput } from '../utils/validations';
import Swal from 'sweetalert2';


export class Companies extends React.Component {
  constructor() {
    super();
    this.state = {
        newCompany: {
            name: '',
            city: 1,
            country: 1
        },
        organizations: [],
        countriesfromAPI: [],
        citiesfromAPI: [],
        withError: false
    };
  }
  handleCity = (e) => {
    this.setState(prevState => ({
      newCompany: {
        ...prevState.newCompany,
        city: e.target.value
      }
    })
  );
  }
  handleCompany = (e) => {
    this.setState(prevState => ({
      newCompany: {
        ...prevState.newCompany,
        name: e.target.value
      }
    })
  );
  }
  handleCountry = (e) => {
    this.setState(prevState => ({
      newCompany: {
        ...prevState.newCompany,
        country: e.target.value
      }
    })
  );
  }
  postNewCompany = (evt) => {
    evt.preventDefault();
    if( 
      checkInput(this.state.newCompany.name)
      && checkInput(this.state.newCompany.city)
      && checkInput(this.state.newCompany.country)
    ){
      postOrganizations(this.state.newCompany);
    }
    else{
      return false;
    }
  }

  deleteCompany= (data) =>{
    Swal.fire({
      title: 'Do you want to delete this record?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', '', 'success')
        deleteOrganizations(data);
      } else if (result.isDenied) {
        Swal.fire('The record was not deleted!', '', 'info')
      }
    })
  }

  componentDidMount() {
    getCountries().then(res => this.setState({
      countriesfromAPI: res
    }));
    getPlaces().then(res2 => this.setState({
      citiesfromAPI: res2
    }));
    getOrganizations().then(res3 => this.setState({
      organizations: res3
    }));
  }


  render() {
    return (
      
      <div className="container">
        <Title message="Companies"/>
        <div className="container">

      <Form onSubmit={this.postNewCompany}>
        <Form.Label>Company name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Company name..." 
          required 
          value={this.state.newCompany.name}
          onChange={(e) => this.handleCompany(e)}
        />

        <Form.Label>Country</Form.Label>
        <Form.Control 
          as="select"
          onChange={(e) => this.handleCountry(e)}>
          <option value="">Select option</option>
          {
            this.state.countriesfromAPI.map((country, index) => {
                return <option key={index} value={country.id}>{country.name}</option>
            })
          }
        </Form.Control>

        <Form.Label>City</Form.Label>
        <Form.Control 
          as="select"
          onChange={(e) => this.handleCity(e)}>
          <option value="">Select option</option>
          {
            this.state.citiesfromAPI.map((city, index) => {
              if(city.countrieId == this.state.newCompany.country){
                return <option key={index} value={city.id}>{city.name}</option>
              }
            })
          }
        </Form.Control>
          <div>
            <br></br>
          </div>
        <Button variant="secondary" type="submit">Add company</Button>
      </Form>

      </div>

      <div>
        <br></br>
      </div>

      <div className="container">
        <ul>
          {
            this.state.organizations.map((company, id) =>{
              return(
              <div>
                <br></br>
                <CardGroup>
                  <Card border="success" style={{ width: '18rem' }}>
                      <Card.Header>
                        {company.name}
                      </Card.Header>
                      <Card.Body>
                        {
                          this.state.citiesfromAPI.map((city)=>{
                            if(city.id == company.placeId){
                              return <Card.Title>{city.name}</Card.Title>
                            }
                          })
                        }
                      </Card.Body>
                      <Button variant="danger" onClick={() => this.deleteCompany(company)}>
                          Delete company
                      </Button>
                  </Card>
                </CardGroup>
              </div>
              )
            })
          }
        </ul>
      </div>
      </div>
    );
  }

}

