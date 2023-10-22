import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navigation from './src/navigation/Navigation'
import Loading from './src/components/UIComponents/Loading';
import { getCredentialAsync, removeCredentialAsync } from './src/functions/asnyc';
import { useDispatch } from 'react-redux';
import { setCredentials } from './src/redux/reducers';
import { getMemberDetail } from './src/api/member/member-api';
import jwtDecode from 'jwt-decode';

const App = () => {
  const [loading,setloading]=useState(false);
  const Dispatch = useDispatch()
  async function get(){
    setloading(true)
    try {
      const creds = await getCredentialAsync()
      if (creds.token){
        const decode = await jwtDecode(creds.token);
        const UserDetails = await getMemberDetail(decode.sub,creds.token);
        Dispatch(setCredentials({
          token:creds.token,
          ...UserDetails,
          ...decode
        }))
      }
    } catch (error) {
      await removeCredentialAsync()
    }
    setloading(false)
  }
useEffect(()=>{
  get()
},[])
  return (
    <>
   {loading?<Loading/>:<Navigation/>}
    </>
  )
}

export default App