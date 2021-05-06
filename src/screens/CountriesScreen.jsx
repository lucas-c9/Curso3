import React, { Fragment, useState, useEffect } from 'react';
import Countries from '../components/Countries';
import Message from '../components/Message';
import Spinner from 'react-bootstrap/Spinner';
import {insertData, getData, filterData} from '../utils/localStorage';
import newId from '../utils/newId'


const CountriesScreen = () => {

    const  getInitialObj = () => ({
        id:newId(),
        code:'',
        name:''
    })
    
    const[objCountry,saveCountry] = useState(getInitialObj);
    const[countries,saveCountries]= useState(getData('countries'));
    const[error,saveError] = useState(false);
    const[loading,saveLoading] = useState(false);
    
    useEffect(()=>{
        const setCountries = () =>{
            setTimeout(() => {
                insertData('countries',countries)
                saveLoading(false)
                saveCountry(getInitialObj)
            }, 2000);
        }
        setCountries();
    }, [countries])
    
    const updateState = (e) => {
        saveError(false);
        saveCountry({...objCountry, [e.target.name] :e.target.value})
    }
    
    const{name}= objCountry;

    const addCountry = (e) => {
        e.preventDefault();
        
        if(name.trim() === ''){
            saveError(true);
            return;
        }
        saveLoading(true);
        saveCountries([...countries, objCountry]);
    }

    const deleteCountry = (idCountry) =>{
        saveLoading(true); 
        const result = filterData('countries', idCountry);
        saveCountries(result);
    }

    return (  
        <Fragment>
            <h3 className="text-center text-underline mt-5 mb-5">Countries</h3>
            <div className="container-fluid">
                <div className="row ml-0 ml-lg-5">
                    <div className="col-12 col-md-5  col-lg-6">
                        <form onSubmit = {addCountry}>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="descripcion" className="mt-4" >Country name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        className="form-control" 
                                        placeholder="Country name..."
                                        onChange={updateState}
                                        value={name}
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary mt-4"
                            >
                                Add country
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
                                            <Countries 
                                                countries ={countries}
                                                deleteCountry={deleteCountry}
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

export default CountriesScreen;
