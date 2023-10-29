import axios from 'axios';
import {API_URL} from '../../constants/api-url';
export async function markAttendanceCheckIn(token, data) {
  const url = API_URL.backend_url + `attendance`;
  var header = {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const resp = await axios(url, {
    method: 'post',
    headers: header,
    url: url,
    data: data,
  });
  return resp.data;
}
export async function markAttendanceCheckOut(token, data,id) {
  const url = API_URL.backend_url + `api/attendance/${id}`;
  var header = {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const resp = await axios(url, {
    method: 'patch',
    headers: header,
    url: url,
    data: data,
  });
  return resp.data;
}

export async function getAttendance(id, token, from, to) {
  // https://member.prism-sfa-dev-service.net/api/attendance?checkIn=2023-10-26T00:00:00.000&checkIn=2023-10-26T23:59:00.00&memberId=900
 const url = API_URL.backend_url + `api/attendance?checkIn=${from}&checkIn=${to}&memberId=${id}`;
 var header = {
   'Content-type': 'application/json',
   Authorization: 'Bearer ' + token,
 };
 const resp = await axios(url, {
   method: 'get',
   headers: header,
   url: url,
 });
  const respData = (resp.data._embedded.attendance[0])

  return respData
}
