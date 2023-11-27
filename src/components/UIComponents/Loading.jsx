import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import { backgroundStyles } from '../../assets/styling/backgroundstyles'
import { SignInStyles } from '../../assets/styling/sign-styles'
import { colors } from '../../constants/colors'

const Loading = ({text, color}) => {
  return (
   <SafeAreaView style={[backgroundStyles.whiteBackground,{justifyContent:"center"},color&&{backgroundColor:color}]}>
    <ActivityIndicator color={colors.prime1} size={40} />
    <Text style={[SignInStyles.textHead,{color:"black",textAlign:"center"}]}>{text?text:"Please wait.."}</Text>
   </SafeAreaView>
  )
}

export default Loading