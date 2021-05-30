import axios from "axios";
import Swal from 'sweetalert2'

/*---------     JOBS DATA       --------- */

export const getJobs = async () => {
        try{
            const response = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/jobs/')
            return response.data
        }catch(error){
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong get the records: ' + error,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
};

export const postData = (job) => {
    axios.post('https://api-fake-pilar-tecno.herokuapp.com/jobs/', {
        position: job.position,
        description: job.description,
        organizationId: job.company
    })
    .then(function (response) {
        Swal.fire({
            title: 'Success!',
            text: 'Records has been created successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            };
        })
    })
    .catch(function (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong creating the record: ' + error,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
};

export const deleteData = (job) => {
    var url = 'https://api-fake-pilar-tecno.herokuapp.com/jobs/' + job.id;
    axios.delete(url, {data: job})
};

/*---------     COUNTRIES       --------- */

export const getCountries = async () => {
    try{
        const response = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/countries/')
        return response.data
    }catch(error){
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong get the records: ' + error,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
};

export const postCountries = (country) => {
    axios.post('https://api-fake-pilar-tecno.herokuapp.com/countries/', {
        name: country,
    })
    .then(function (response) {
        Swal.fire({
            title: 'Success!',
            text: 'Records has been created successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            };
        })
    })
    .catch(function (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong creating the record: ' + error,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });    
};

export const deleteCountries = (country) => {
    var url = 'https://api-fake-pilar-tecno.herokuapp.com/countries/' + country.id;
    axios.delete(url, {data: country})
};

/*---------     PLACES       --------- */

export const getPlaces = async () => {
    try{
        const response = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/places/')
        return response.data
    }catch(error){
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong get the records: ' + error,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
};

export const postPlaces = (place) => {
    axios.post('https://api-fake-pilar-tecno.herokuapp.com/places/', {
        name: place.name,
        countrieId: place.country
    })
    .then(function (response) {
        Swal.fire({
            title: 'Success!',
            text: 'Records has been created successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            };
        })
    })
    .catch(function (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong creating the record: ' + error,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });    
};

export const deletePlaces = (place) => {
    var url = 'https://api-fake-pilar-tecno.herokuapp.com/places/' + place.id;
    axios.delete(url, {data: place})
};

/*---------     ORGANIZATIONS       --------- */
export const getOrganizations = async () => {
    try{
        const response = await axios.get('https://api-fake-pilar-tecno.herokuapp.com/organizations/')
        return response.data
    }catch(error){
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong get the records: ' + error,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
};

export const postOrganizations  = (company) => {
    axios.post('https://api-fake-pilar-tecno.herokuapp.com/organizations/', {
        name: company.name,
        placeId: company.city
    })
    .then(function (response) {
        Swal.fire({
            title: 'Success!',
            text: 'Records has been created successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            };
        })
    })
    .catch(function (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong creating the record: ' + error,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });    
};

export const deleteOrganizations = (company) => {
    var url = 'https://api-fake-pilar-tecno.herokuapp.com/organizations/' + company.id;
    axios.delete(url, {data: company})
};