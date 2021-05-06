export const  getData = (item) => {
    const result = localStorage.getItem(item);

    if(result === null){
        return [];
    } 
    else{
        return JSON.parse(result);
    }
}

export const insertData = (item, data) => {
    localStorage.setItem(item, JSON.stringify(data));
}

export const filterData = (item, filter)  => {
    const dataArr = getData(item);
    if(dataArr.length === 0){
        return [];
    } 
    else{
        const result = dataArr.filter(data => Number(data.id) !== Number(filter))
        return result;
    }
}

export const filterEqualData = (item, filter)  => {
    const dataArr = getData(item);
    if(dataArr.length === 0){
        return [];
    }
    else{
        const result = dataArr.filter(data => Number(data.id) === Number(filter))
        return result;
    }
}
