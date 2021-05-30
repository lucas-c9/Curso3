import React from 'react';
import { deleteCountries, getCountries, postCountries } from '../APIs/fakeAPI';
import { Form , Button, Card, CardGroup } from 'react-bootstrap';
import Title from '../components/Title';
import { checkInput } from '../utils/validations';
import Swal from 'sweetalert2';


export class Countries extends React.Component {
  constructor(){
    super()
    this.state = {
        name: '',
        countries: [],
        countriesfromAPI: [],
        withError: false
      };
}
  handleCountry = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  postNewCountry = (evt) => {
    evt.preventDefault();
    if( 
      checkInput(this.state.name)
    ){
      postCountries(this.state.name);
    }
    else{
      return false;
    }
  }

  deleteCountry = (country) =>{
    Swal.fire({
      title: 'Do you want to delete this record?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', '', 'success')
        deleteCountries(country);
      } else if (result.isDenied) {
        Swal.fire('The record was not deleted!', '', 'info')
      }
    })
  }

  componentDidMount() {
    getCountries().then(response => this.setState({
      countriesfromAPI: response
    }))
  }

  render() {
    return (
      <div className="container">
        <Title message="Countries"/>
        <div className="container">

      <Form onSubmit={this.postNewCountry}>
        <Form.Label>Country name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Country name..." 
          required 
          value={this.state.name} 
          onChange={(e) => this.handleCountry(e)}
        />
          <div>
            <br></br>
          </div>
        <Button variant="primary" type="submit">Add country</Button>
      </Form>

      </div>

      <div>
        <br></br>
      </div>

      <div className="container">
        <ul>
          {
            this.state.countriesfromAPI.map((country, id) =>{
              return(
              <div>
                <br></br>
                <CardGroup>
                  <Card border="success" style={{ width: '18rem' }}>
                      <Card.Header>
                                <Card.Title>{country.name}</Card.Title>
                                <Button variant="danger" onClick={() => this.deleteCountry(country)}>
                                  Delete country
                                </Button>
                      </Card.Header>
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
