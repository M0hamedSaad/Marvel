import axios from 'axios'

const hash = 'b8c888ff41499382814c2aaa62499e2e';
const apikey = '24432f2a00a2463c494eaf69f9b4d45e';
const ts = 'ts';
const baseUrl = 'https://gateway.marvel.com/v1/public';

let result = [];

export const useGet = async (path, id, params, endPoint) => {
    let url = '';
    if (id) url = baseUrl + path + '/' + id
    else if (endPoint) url = endPoint
    else url = baseUrl + path


    if (params == undefined) params = {}
    if (params?.offset == undefined || params?.offset == 0) result = []

    params.hash = hash;
    params.apikey = apikey;
    params.ts = ts;
    console.log({ url, params });
    try {
        let res = await axios.get(url, { params });
        // console.log(res);
        result = [...result, ...res.data.data.results];
        let total = res.data.data.total
        //console.log({ result });
        console.log({ result, total });
        return { result, total };

    } catch (error) {
        console.log('ERROR', error?.response ?
            error?.response : error);
        return null;
    }

}