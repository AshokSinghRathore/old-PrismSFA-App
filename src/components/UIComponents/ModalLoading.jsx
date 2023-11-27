import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Modal  from 'react-native-modal'
const ModalLoading = ({isVisible,message}) => {
  return (
    <Modal
    isVisible={isVisible}
    style={{
      flex:1,
      alignItems:"center",
      justifyContent:"center"
    }}
    >
      <View style={{flexDirection:"row",height:70,width:"90%",backgroundColor:"white",padding:10,borderRadius:5}}>
    <ActivityIndicator size={"large"} color={"green"} style={{marginLeft:15}} />
    <Text style={{alignSelf:"center",fontSize:20,color:"black",fontFamily:"Poppins-SemiBold",marginLeft:30}}>{message?message:"Please Wait..."}</Text>
      </View>
    </Modal>
  )
}

export default ModalLoading