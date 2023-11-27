import axios from "axios";
import { API_URL } from "../../constants/api-url";

export async function getAllHolidays(token,page){
    const url = API_URL.backend_url + `api/holidays?page=${page}&size=20`;
    var header = {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await axios({
        headers: header,
        url: url,
        method: "GET",
      });
      return {data:response.data._embedded.holidays,paginationData:response.data.page};
}

export async function createHoliday(token, payload,page){
  const url = API_URL.backend_url + `api/holiday`;
  var header={
    "Content-type": "application/json",
     Authorization:"Bearer" + token,
  };
  const response = await axios({
    headers:header,
    url:url,
    method:"POST",
    data:payload
  })
  return response.status;
}


export async function deleteHoliday(token, id){
  const url= API_URL.backend_url + `api/holidays/${id}`
  var header={
    "Content-type":"application/json",
    Authorization:"Bearer" + token,
  };
  const response = await axios({
    headers:header,
    url:url,
    method:"DELETE",
  })
  return response.status;
}

export async function updateHoliday(token, id, payload){
  const url = API_URL.backend_url + `api/holidays/${id}`
  var header={
    "Content-type":"application/json",
    Authorization:"Bearer" + token,
  };
  const response = await axios({
    headers:header,
    url:url,
    method:"PUT",
    data:payload
  })
  response.status;
}