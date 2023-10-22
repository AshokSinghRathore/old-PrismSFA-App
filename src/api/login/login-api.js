import axios from "axios";
import { API_URL} from "../../constants/api-url"


export default async function login(mobile,password){
        const url = API_URL.backend_url + "authenticate";
        var header = {
            "Content-type": "application/json",        }
      const response =  await axios(
        {
            headers:header,
            url:url,
            method:"POST",
            data:{
                mobile:mobile,
                password:password.toString()
            },

        }
      )
    return {token:response.data.token,statusCode:response.status}
   
}
