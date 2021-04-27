export const checkInput = (value) =>{
    if(value.trim() !== "" && value.trim() !== undefined && value.trim() !== null){
        return true;
    }
    else{
        return false;
    }
}