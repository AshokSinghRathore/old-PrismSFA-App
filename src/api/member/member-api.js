import axios from "axios";
import { API_URL } from "../../constants/api-url";
export async function getMemberDetail(id, token) {
    const url = API_URL.backend_url + `api/members/${id}`;
    var header = {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
    const response = await axios({
      headers: header,
      url: url,
      method: "GET",
    });
    return response.data
}

export async function getAllMembers(token) {

    const url = API_URL.backend_url + `api/members?page=0&size=20`;
    var header = {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
    const response = await axios({
      headers: header,
      url: url,
      method: "GET",
    });
    return { data: response.data._embedded.members, status: response.status };
}

export async function addMember(token, data) {

    const url = API_URL.backend_url + `api/members`;
    var header = {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
    const response = await axios({
      headers: header,
      url: url,
      method: "POST",
      data: data,
    });
    return response.status;

}

export async function getAllDesignation(token) {

    const url = API_URL.backend_url + `api/designations?page=0&size=30`;
    var header = {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
    const response = await axios({
      headers: header,
      url: url,
      method: "GET",
    });
    return {
      data: response.data._embedded.designations,
      status: response.status,
    };

}

export async function updateMember(data,token) {

    const url = API_URL.backend_url + `api/members`;
    var header = {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
    const resp =  await axios({
      headers: header,
      url: url,
      method: "PUT",
      data:data
    });

}
