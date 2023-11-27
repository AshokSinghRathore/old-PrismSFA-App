import { createSlice } from "@reduxjs/toolkit";
export const CredentialSlice = createSlice(
    {
        name:"Cred",
        initialState:{},
        reducers:{
            setCredentials:(state,action)=>{
                return {...action.payload}
           },
           deleteCredentials:(state,action)=>{
               return {}
           }
        }
    }
)
export const {setCredentials,deleteCredentials} = CredentialSlice.actions;