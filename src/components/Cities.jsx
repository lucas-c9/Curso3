import React, { Fragment } from 'react';
import Message from './Message';
import Table from 'react-bootstrap/Table';

const Cities = ({cities, countries, deleteCity}) => {
    

    const handleDelete = (e) => {
        const id = Number(e.target.dataset.id);
        deleteCity(id);
    } 
    
    return (
        <Fragment>
            {(cities.length === 0 ) 
                ? <Message type="info" message="No city records" time={5}/>
                : 
                <Fragment>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th >City</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { cities.map((city) => {
                                let resultCountry = (countries.filter(country => Number(city.country) === country.id)[0]);
                                return (
                                    <tr key={city.id}>
                                        <td>{resultCountry.name}</td>
                                        <td>{city.name}</td>
                                        <td>
                                            <button 
                                                data-id={city.id} 
                                                className="btn btn-danger" 
                                                onClick={handleDelete}>
                                                    Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Fragment>
            }
        </Fragment>
    )
}

export default Cities;