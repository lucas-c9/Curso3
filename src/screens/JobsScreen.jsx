import React, { Fragment, useState, useEffect } from 'react';
import Message from '../components/Message';
import Spinner from 'react-bootstrap/Spinner';
import Jobs from '../components/ShowJobs'
import {insertData, getData, filterData} from '../utils/localStorage';
import newId from '../utils/newId';


const JobsScreen = () =>{

    const  getInitialObj = () => ({
        id: newId(),
        job:'',
        companies:'',
    })
    

    const [objJob, saveJob] = useState(getInitialObj);
    const [jobs, saveJobs] = useState(getData('jobs'));
    const [error,saveError] = useState(false);
    const [loading,saveLoading] = useState(false);
    
    let companies = getData('companies');

    useEffect(()=>{
        const setJob = () =>{
            setTimeout(() => {
                insertData('jobs',jobs)
                saveLoading(false)
                saveJob(getInitialObj)
            }, 2000);
        }
        setJob();
    }, [jobs])

    const updateState = (e) => {
        saveError(false);
        saveJob({...objJob, [e.target.name] :e.target.value})
    }

    const {job,company} = objJob;

    const addJob = (e) => {
        e.preventDefault();
        if(job.trim() === '' || company.trim() === ''){
            saveError(true);
            return;
        }
        saveLoading(true);
        saveJobs([...jobs,objJob]);
    }

    const deleteJob = (idJob) =>{
        saveLoading(true);
        const result = filterData('jobs', idJob);
        saveJobs(result);
    } 


    
    return(
        <Fragment>
        <h3 className="text-center text-underline mt-5 mb-5">Open Jobs</h3>
        <div className="container-fluid">
            <div className="row ml-0 ml-lg-5">
                <div className="col-12 col-md-4  col-lg-6">
                    <form onSubmit = {addJob}>    
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="job" className="mt-4" >Job positions</label>
                                <input 
                                    type="text" 
                                    id="job" 
                                    name="job"
                                    className="form-control" 
                                    placeholder="Job position..."
                                    onChange={updateState}
                                    value={job}
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="company" >Company</label>
                                <select 
                                    className="custom-select" 
                                    id="company"
                                    name="company"
                                    onChange={updateState}
                                    value={company}
                                >
                                    <option value="">Select a company</option>
                                        {companies.map((company, index) => (
                                            <option key={index} value={Number(company.id)} >
                                                {company.name}
                                            </option>
                                        ))} 
                                </select>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary mt-4"
                        >
                            Add job position
                        </button>
                        {(error) 
                            ? <Message type="danger" message="All fields are required" time={5}/>: null
                        }
                    </form>
                </div>
                <div className="col-12 mt-5 col-md-8 mt-md-0 col-lg-6 ">
                    {(loading) 
                        ?  <Spinner/>
                        :  <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <Jobs
                                        deleteJob={deleteJob}
                                        jobs={jobs}
                                        />
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    </Fragment>
    )
}

export default JobsScreen;
