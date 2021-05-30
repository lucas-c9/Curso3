import React from 'react';
import { getCountries, getPlaces, postPlaces, deletePlaces } from '../APIs/fakeAPI';
import { Form , Button, Card, CardGroup } from 'react-bootstrap';
import Title from '../components/Title';
import { checkInput } from '../utils/validations';
import Swal from 'sweetalert2'


export class Cities extends React.Component {
  constructor() {
    super();
    this.state = {
        newCity: {
            name: '',
            country: 1
        },
        countriesfromAPI: [],
        citiesfromAPI: [],
        withError: false
    };
  }

  handleCity = (e) => {
    this.setState(prevState => ({
      newCity: {
        ...prevState.newCity,
        name: e.target.value
      }
    })
  );
  }

  handleCountry = (e) => {
    this.setState(prevState => ({
      newCity: {
        ...prevState.newCity,
        country: e.target.value
      }
    })
  );
  }

  postNewCity = (evt) => {
    evt.preventDefault();
    if( 
      checkInput(this.state.newCity.name)
      && checkInput(this.state.newCity.country)
    ){
      postPlaces(this.state.newCity);
    }
    else{
      return false;
    }
  }

  deleteCity= (city) =>{
    Swal.fire({
      title: 'Do you want to delete this record?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', '', 'success')
        deletePlaces(city);
      } else if (result.isDenied) {
        Swal.fire('The record was not deleted!', '', 'info')
      }
    })
  }

  componentDidMount() {
    getCountries().then(responseCountries => this.setState({
      countriesfromAPI: responseCountries
    }));
    getPlaces().then(responsePlaces => this.setState({
      citiesfromAPI: responsePlaces
    }));
  }

  render() {
    return (
      
      <div className="container">
        <Title message="Cities"/>
        <div className="container">

      <Form onSubmit={this.postNewCity}>
        <Form.Label>City name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="City name..." 
          required 
          value={this.state.newCity.name} 
          onChange={(e) => this.handleCity(e)}
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
          <div>
            <br></br>
          </div>
        <Button variant="success" type="submit">Add city</Button>
      </Form>

      </div>

      <div>
        <br></br>
      </div>

      <div className="container">
        <ul>
          {
            this.state.citiesfromAPI.map((city, id) =>{
              return(
              <div>
                <br></br>
                <CardGroup>
                  <Card border="success" style={{ width: '18rem' }}>
                      <Card.Header>
                        {
                          this.state.countriesfromAPI.map((country)=>{
                            if(country.id == city.countrieId){
                              return <Card.Title>{country.name}</Card.Title>
                            }
                          })
                        }
                      </Card.Header>
                      <Card.Body>
                        {city.name}
                      </Card.Body>
                      <Button variant="danger" onClick={() => this.deleteCity(city)}>
                          Delete city
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

