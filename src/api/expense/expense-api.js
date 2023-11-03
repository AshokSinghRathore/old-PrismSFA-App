import axios from 'axios';
import {API_URL} from '../../constants/api-url';
export async function getAllExpense(token,id,page){
    const url = API_URL.backend_url + `api/expense?page=${page}&size=20&createdBy=${id}`;
    console.log(url)
    var header = {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const resp = await axios(url, {
      method: 'get',
      headers: header,
      url: url
    });
  return resp.data._embedded.expense
  }
  export async function createExpense(token,payload){
    const url = API_URL.backend_url + 'expense';
    var header = {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const resp = await axios(url, {
      method: 'post',
      headers: header,
      url: url,
      data:payload
  
    });
  }