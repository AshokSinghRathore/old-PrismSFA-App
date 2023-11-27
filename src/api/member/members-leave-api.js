import axios from "axios";
import { API_URL } from "../../constants/api-url";

export async function createLeave(token, payload) {

  const url = API_URL.backend_url + `leaves`;
  var header = {
    "Content-type": "application/json",
    Authorization: "Bearer " + token,
  };
  const response = await axios({
    headers: header,
    url: url,
    method: "POST",
    data: payload,
  });
  return response.data
}


export async function getLeaveTypes(token) {
  const url = API_URL.backend_url + `api/leaveType`
  var header = {
    "Content-type": 'application/json',
    Authorization: "Bearer " + token,
  }
  const response = await axios({
    headers: header,
    url: url,
    method: "GET"
  })
  return response.data._embedded.leaveType
}

export async function deleteLeave(token, id) {
  const url = API_URL.backend_url + `api/leaves/${id}`
  console.log(url)
  var header = {
    "Content-type": "application/json",
    Authorization: "Bearer " + token,
  };
  const response = await axios({
    headers: header,
    url: url,
    method: "DELETE",
  })
  return response.status;
}

export async function getAllLeaves(token,id,page){
  const url = API_URL.backend_url + `api/leaves?page=${page}&size=20&employeeId=${id}`
  var header = {
    "Content-type": "application/json",
    Authorization: "Bearer " + token,
  };
  const response = await axios({
    headers: header,
    url: url,
    method: "GET",
  })

  return {data:response.data._embedded.leaves,page:response.data.page};
}