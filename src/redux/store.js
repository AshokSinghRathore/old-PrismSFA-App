import { configureStore } from "@reduxjs/toolkit"
import {CredentialSlice} from "./reducers"
const store = configureStore({
    reducer:{
        Cred:CredentialSlice.reducer
    }
});
export default store