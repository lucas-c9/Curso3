import React, { Fragment } from 'react';
import Message from './Message';
import Table from 'react-bootstrap/Table';

const Countries = ({countries, deleteCountry}) =>{
    
    /*-- Funcion que se llama cuando se presiona el btn eliminar --*/
    const handleDelete = (e) => {
        const id = Number(e.target.dataset.id);
        deleteCountry(id);
    }
    
    return (
        <Fragment>
            {(countries.length === 0 ) 
                ? <Message type="info" message="No country records" time={5}/>
                : 
                <Fragment>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { countries.map((country) => {
                                return (
                                    <tr key={country.id}>
                                        <td>{country.name}</td>
                                        <td>
                                            <button 
                                                data-id={country.id} 
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

export default Countries;