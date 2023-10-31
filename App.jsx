import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navigation from './src/navigation/Navigation'
import Loading from './src/components/UIComponents/Loading';
import { getCredentialAsync, removeCredentialAsync } from './src/functions/asnyc';
import { useDispatch } from 'react-redux';
import { setCredentials } from './src/redux/reducers';
import { getMemberDetail } from './src/api/member/member-api';
import jwtDecode from 'jwt-decode';
import { checkLocationPermission ,requestLocationPermission} from './src/functions/permission';
import {openSettings} from "react-native-permissions"
import Toast from "react-native-simple-toast"
const App = () => {
  const [loading,setloading]=useState(false);
  const Dispatch = useDispatch()
  async function get(){
    setloading(true)
    try {
      const creds = await getCredentialAsync()
      if (creds){
        const decode = await jwtDecode(creds.token);
        try {
          const UserDetails = await getMemberDetail(decode.sub,creds.token);
          Dispatch(setCredentials({
            token:creds.token,
            ...UserDetails,
            ...decode
          }))
        } catch (error) {
          console.log(error)
          await removeCredentialAsync()
        }
        
      }
    } catch (error) {
      console.log(error)
      await removeCredentialAsync()
    }
    setloading(false)
  }
  async function getPermission(){
    try {
     const  resp = await checkLocationPermission()
    if (!resp){
      const resp = await requestLocationPermission()
      if (!resp){
        Alert.alert("Permission Dined","This App Requires Certain Permission Like Location. Please Allow Those Permission",[
          {
            text:"Allow",
            onPress:()=>{
              openSettings()
            },
            style:"default"
          },{
            text:"Dis-Allow",
            style:"cancel"

          }
        ])
      }
    }
    } catch (error) {
      Toast.show('Can"t Fetch Necessary Permission', Toast.SHORT);
    }
  }
useEffect(()=>{
  getPermission()
  get()
},[])
  return (
    <>
   {loading?<Loading/>:<Navigation/>}
    </>
  )
}

export default App