import apiDomain from '../constant/ApiDomain';
import {requestAsync, parseUrlParmas} from "../util/request";
import {IQueryList} from '../constant/baseInterface';

interface IApplyMainList extends IQueryList{
    startTime: string,
    endTime: string,
    userID: string
}

// @ts-ignore
const domain = apiDomain.domain[apiDomain.env];

export default {
    getApplyMainList: async (queryObj: IApplyMainList) => {
        const response = await requestAsync(`${domain}/applyMainlist?${parseUrlParmas(queryObj)}`);
        return response;
    }
};