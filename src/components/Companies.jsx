import React, { Fragment } from 'react';
import Message from './Message';
import Table from 'react-bootstrap/Table';
import {filterEqualData} from '../utils/localStorage';

const Companies = ({companies, deleteCompany}) =>{

    const handleDelete = (e) => {
        const id = Number(e.target.dataset.id);
        deleteCompany(id);
    }

    const filterCountry = (IdCountry) => {
        let name='---';
        let result = filterEqualData('countries',IdCountry)
        if(Object.keys(result[0]).length >0 ) name = result[0].name;
        return name;
    }

    const filterCity = (IdCity) => {
        let name='---';
        let result = filterEqualData('cities',IdCity)
        if(Object.keys(result[0]).length >0 ) name = result[0].name;
        return name;
    }

    return(
        <Fragment>
            {(companies.length === 0 ) 
                ? <Message type="info" message="No companies records" time={5}/>
                : 
                <Fragment>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>City</th>
                                <th>Country</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { companies.map((company) => {
                                return (
                                    <tr key={company.id}>
                                        <td>{company.name}</td>
                                        <td>{filterCity(company.city)}</td>
                                        
                                        <td>{filterCountry(company.country)}</td>
                                        <td>
                                            <button 
                                                data-id={company.id} 
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

export default Companies;