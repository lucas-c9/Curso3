import React, { Fragment, useState, useEffect } from 'react';
import Message from '../components/Message';
import Spinner from 'react-bootstrap/Spinner';
import Cities from '../components/Cities'
import {insertData, getData, filterData} from '../utils/localStorage';
import newId from '../utils/newId';

const CitiesScreen = () => {
    
    const getInitialObj = () => (
        {
            id: newId(),
            country:'',
            name:''
        }
    )

    const[objCity,saveCity] = useState(getInitialObj);
    const[error,saveError] = useState(false);
    const[loading,saveLoading] = useState(false);
    const[cities,saveCities]= useState(getData('cities'));
    
    let countries = getData('countries');
    
    useEffect(() => {
        const setCities = () =>{
            setTimeout(() => {
                insertData('cities', cities)
                saveLoading(false)
                saveCity(getInitialObj)
            }, 2000);
        }
        setCities();

    }, [cities])

    
    const updateState=(e) => {
        saveError(false);
        saveCity({...objCity, [e.target.name] :e.target.value})
    }

    const{country, name} = objCity;
    
    const addCity = (e) => {
        e.preventDefault();
        
        if(country.trim() === '' || name.trim() === ''){
            saveError(true);
            return;
        }
        saveLoading(true);
        saveCities([...cities, objCity]);
    }

    const deleteCity = (idCity) =>{
        saveLoading(true);
        const result = filterData('cities', idCity);
        saveCities(result);
    }

    return (
        <Fragment>
            <h3 className="text-center text-underline mt-5 mb-5">Cities</h3>
            <div className="container-fluid">
                <div className="row ml-0 ml-lg-5">
                    <div className="col-12 col-md-5  col-lg-6">
                        <form onSubmit = {addCity}>
                            <div className="row">
                                <div className="col-12">
                                    <label htmlFor="pais">Country</label>
                                    <select
                                        className="custom-select" 
                                        id="country"
                                        name="country"
                                        value={country}
                                        onChange={updateState}
                                    >
                                        <option value="">Select a country</option>
                                        {countries.map((country,index) => (
                                            <option key={index} value={Number(country.id)} >{country.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="descripcion" className="mt-4" >City name</label>
                                    <input
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        className="form-control" 
                                        placeholder="City name..."
                                        onChange={updateState}
                                        value={name}
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary mt-4"
                            >
                                Add city
                            </button>
                            {(error) 
                                    ? <Message type="danger" message="All fields are required" time={5}/>: null
                            }
                        </form>
                    </div>
                    <div className="col-12 mt-5 col-md-7 mt-md-0 col-lg-6 ">
                        {(loading) 
                            ?   <Spinner animation="border" variant="secondary" />
                            :  <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            { <Cities
                                                cities={cities}
                                                countries={countries}
                                                deleteCity={deleteCity}
                                            /> }
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

export default CitiesScreen;