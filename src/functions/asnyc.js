import AsyncStorage from "@react-native-async-storage/async-storage";
const tokenName = "PRISM_SFA_JWT_TOKEN"
export async function setCredentialAsync(token){
   await AsyncStorage.setItem(tokenName,token)

}
export async function removeCredentialAsync(){
   await AsyncStorage.removeItem(tokenName)

}
export async function getCredentialAsync(){
   const token = await AsyncStorage.getItem(tokenName)
   return{token:token}
}