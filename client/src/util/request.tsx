// @ts-ignore
import {fetch} from 'whatwg-fetch';
import {IResponse} from '../constant/baseInterface';

function parseJSON(response:any) {
    return response.json();
}

function checkStatus(response:any) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }else{
        const error = new Error(response.statusText);
        // @ts-ignore
        error.response = response;
        throw error;
    }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url:string, options:any) {
    let nOptions = options || {}, headers = nOptions.headers || {};
    nOptions.headers = {
        ...headers,
        "userID": localStorage.getItem('userID'),
        "token" : localStorage.getItem('token')
    };
    return fetch(url, nOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then((data:IResponse) => ({ body: data }))
        .catch((err: Error) => {throw err});
}

export interface IrequestAsyncResult {
    success: boolean,
    status: string,
    msg: '',
    body: any,
    headers: any,
    error: Error | undefined
}

export async function requestAsync(url:string, options?:any){
    let nOptions = options || {}, headers = nOptions.headers || {};
    nOptions.headers = {
        ...headers,
        "userID": localStorage.getItem('userID'),
        "token" : localStorage.getItem('token')
    };

    let result: IrequestAsyncResult = {success: false, status: '500', msg: '', body: undefined, headers: undefined, error: undefined};

    try{
        const response = await fetch(url, nOptions);
        let r = checkStatus(response);
        if(r && r.status === 200){
            const body = await r.json();
            const headers = r.headers;
            result.status = r.status;
            result.success = true;
            result.body = body;
            result.headers = headers;

        }
        return result;

    }catch (e){
        console.error('requestAsync error');
        console.error(e);
        result.msg = e.message;
        result.error = e;
    }
    return result;
}

/**
 * 格式化json对象为a=1&b=2的格式
 * @param urlParams json对象
 * @returns {string}
 */
export const parseUrlParmas = (urlParams: any) => {
    if(!urlParams || (typeof urlParams !== 'object')) {
        return '';
    }
    const keys = Object.keys(urlParams);
    if(keys.length === 0){
        return '';
    }

    let result = '';
    keys.forEach(key => {
        result += `&${key}=${encodeURIComponent(urlParams[key])}`;
    });
    result = result.replace('&', '');
    return result;
};