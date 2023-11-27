import axios from 'axios';
import {API_URL} from '../../constants/api-url';
import { Platform } from 'react-native';

export async function getAllClients(token,page) {
  const url = API_URL.backend_url + `api/clients?page=${page}&size=20`;
  var header = {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const resp = await axios(url, {
    method: 'get',
    headers: header,
    url: url,
  });
  const ClientsDataArray=[]
  const data = resp.data._embedded.clients  
  for (var i =0;i<data.length;i++){
    var temp={
      clientLastName:data[i].clientLastName,
      email:data[i].email,
      mobile:data[i].mobile,
      category:data[i].category,
      clientCode:data[i].clientCode,
      gender:data[i].gender,
      id:data[i].id,
      region:data[i].region,
    }
    ClientsDataArray.push(temp)

  }
  return (ClientsDataArray);
}

export async function addClient(payload,token){
  const url = API_URL.backend_url + 'api/clients';
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

export async function updateClient(data,token){

  const url = API_URL.backend_url + `api/clients/${data.id}`;
  var header = {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const resp = await axios(url, {
    method: 'patch',
    headers: header,
    url: url,
    data:data,
  });
 return resp.status
}


export async function deleteClient(token,id){
  const url = API_URL.backend_url + `api/clients/${id}`;
  var header = {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const resp = await axios(url, {
    method: 'delete',
    headers: header,
    url: url,
  });
 return resp.status
}