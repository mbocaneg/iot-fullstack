export const lastNofArray = (arr, n) => {
    return arr.slice(Math.max(arr.length - n, 0));
}

export const epochToDateTime_mdYHs = (unixtimestamp) => {
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(unixtimestamp*1000);
    let year = date.getFullYear();
    let month = months_arr[date.getMonth()];
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();

    let dateString = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2);
    return dateString;
}

export const epochToDateTime_mdY = (unixtimestamp) => {
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(unixtimestamp*1000);
    let year = date.getFullYear();
    let month = months_arr[date.getMonth()];
    let day = date.getDate();

    let dateString = month+'-'+day+'-'+year;
    return dateString;
}

export const apiUri = "http://localhost:5000/";

export const EPOCH_MONTH = 2592000;
export const EPOCH_WEEK = 604800;
export const EPOCH_DAY = 86400;
export const EPOCH_HOUR = 3600;