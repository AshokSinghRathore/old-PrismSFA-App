import axios from 'axios';
import {API_URL} from '../../constants/api-url';
export async function markAttendance(token, data) {
  const url = API_URL.backend_url + `api/attendance`;
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
  return resp.status;
}

export async function getAttendance(id, token, from, To) {
  const url =
    API_URL.backend_url +
    `api/attendance?memberId=${id}&checkIn=${from}&checkIn=${To}`;
  console.log(url);
  var header = {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const resp = await axios(url, {
    method: 'get',
    headers: header,
    url: url,
  });

  if (resp.data._embedded.attendance.length > 0) {
    const data = await resp.data._embedded.attendance[0];

    let result = {
      isCheckIn: Boolean(data.checkIn),
      isCheckOut: Boolean(data.checkOut),
    };

    return result;
  } else {
    return false;
  }
}
