import AsyncStorage from "@react-native-async-storage/async-storage";
const tokenName = "PRISM_SFA_JWT_TOKEN"
export async function setCredentialAsync(token){
   await AsyncStorage.setItem(tokenName,token)
   const token1 = await getCredentialAsync()

}
export async function removeCredentialAsync(){
   await AsyncStorage.removeItem(tokenName)

}
export async function getCredentialAsync(){
   const token = await AsyncStorage.getItem(tokenName)
   return{token:token}
}