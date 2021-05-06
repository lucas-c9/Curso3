import React, { Fragment, useState, useEffect } from 'react';
import Message from '../components/Message';
import Spinner from 'react-bootstrap/Spinner';
import Companies from '../components/Companies'
import {insertData, getData, filterData} from '../utils/localStorage';
import newId from '../utils/newId'

const CompaniesScreen = () =>{

    const  getInitialObj = () => ({
        id: newId(),
        country:'',
        city:'',
        name:''
    })
    
    let listCountries = getData('countries');
    let listCities = getData('cities');

    const [objCompanies, saveCompanies] = useState(getInitialObj);
    const [companies, saveCompaniesArr] = useState(getData('companies'));
    const [cities, updateCities] = useState([]);
    const [error,saveError] = useState(false);
    const [loading,saveLoading] = useState(false);
    const{country, city, name} = objCompanies;
    
    useEffect(()=>{
        if(objCompanies.country==='') return;
        const filterCities = () => {
            const citiesFilter = listCities.filter(city => Number(city.country) === Number(country));
            updateCities(citiesFilter);
            saveCompanies({...objCompanies, [city] :''})
        }
        filterCities();
    }, [city, country, listCities, objCompanies, objCompanies.country])
    
    useEffect(()=>{
        const setCompanies = () =>{
            setTimeout(() => {
                insertData('companies', companies)
                saveLoading(false)
                saveCompanies(getInitialObj)
            }, 2000);
        }
        setCompanies();
    }, [companies])


    const updateState = (e) => {
        saveError(false);
        saveCompanies({...objCompanies, [e.target.name] :e.target.value})
    }

    const addCompanies = (e) => {
        e.preventDefault();
        if(country.trim() === '' || name.trim() === '' || city.trim() === ''){
            saveError(true);
            return;
        }
        saveLoading(true);
        saveCompaniesArr([...companies, objCompanies]);
    }

    const deleteCompanies = (idCompanies) =>{
        saveLoading(true);
        const result = filterData('companies', idCompanies);
        saveCompaniesArr(result);
    }


    return (
        <Fragment>
            <h3 className="text-center text-underline mt-5 mb-5">Companies</h3>
            <div className="container-fluid">
                <div className="row ml-0 ml-lg-5">
                    <div className="col-12 col-md-5  col-lg-6">
                        <form onSubmit = {addCompanies}>    
                            <div className="row">
                                <div className="col-12">
                                    <label htmlFor="name" className="mt-4">Company name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        className="form-control" 
                                        placeholder="Company name..."
                                        onChange={updateState}
                                        value={name}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="country">Country</label>
                                    <select 
                                        className="custom-select" 
                                        id="country"
                                        name="country"
                                        onChange={updateState}
                                        value={country}
                                    >
                                        <option value="">Select a country</option>
                                        {listCountries.map((country, index) => (
                                        <option key={index} value={Number(country.id)}>
                                            {country.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="city">Citie</label>
                                    <select 
                                        className="custom-select" 
                                        id="city"
                                        name="city"
                                        value={city}
                                        onChange={updateState}
                                    >
                                        <option value="">Select a city</option>
                                        { cities.map((city,index) => (
                                        <option key={index} value={Number(city.id)}>
                                            {city.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary mt-4"
                            >
                                Add company
                            </button>
                            {(error) 
                                ? <Message type="danger" message="All fields are required" time={5}/>: null
                            }
                        </form>
                    </div>
                    <div className="col-12 mt-5 col-md-7 mt-md-0 col-lg-6 ">
                        {(loading) 
                            ?  <Spinner/>
                            :  <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <Companies
                                                companies = {companies}
                                                deleteCompaniesParent={deleteCompanies}
                                            />
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
    
export default CompaniesScreen;
