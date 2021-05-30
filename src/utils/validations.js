import Swal from 'sweetalert2'

export const checkInput = (value) =>{
    if(value.trim() !== "" && value.trim() !== undefined && value.trim() !== null){
        return true;
    }
    else{
        Swal.fire({
            title: 'Error!',
            text: 'Please, complete all fields!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    }
}