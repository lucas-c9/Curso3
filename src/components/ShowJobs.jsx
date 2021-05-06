import React, { Fragment } from 'react';
import Message from './Message';
import Table from 'react-bootstrap/Table';
import {filterEqualData} from '../utils/localStorage';

const ShowJobs = ({jobs, deleteJob}) => {

    const handleDelete = (e) => {
        const id = Number(e.target.dataset.id);
        deleteJob(id);
    }

    const filterCompany = (idCompany) => {
        let name = '---';
        let result = filterEqualData('companies', idCompany);
        if(Object.keys(result[0]).length > 0) name = result[0].name;
        let resultCity = filterEqualData('cities', result[0].city);
        let resultCountry = filterEqualData('countries', result[0].country);
        return (
            <Fragment><td>{name}</td>
            <td>{resultCity[0].name || '--'}</td>
            <td>{resultCountry[0].name || '--'}</td>
            </Fragment>
        )
    }

    return (
        <Fragment>
            {(jobs.length === 0 ) 
                ? <Message type="info" message="No city records" time={5}/>
                : 
                <Fragment>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Job position</th>
                                <th>Company</th>
                                <th>City</th>
                                <th>Country</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => {
                                return (
                                    <tr key={job.id}>
                                        <td>{job.job}</td>
                                        {filterCompany(job.company)}
                                        <td>
                                            <button 
                                                data-id={job.id} 
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

export default ShowJobs;