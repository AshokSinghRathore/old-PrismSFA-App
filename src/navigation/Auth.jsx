import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../screens/Auth/SignIn'
const Stack = createStackNavigator()
const Auth = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='SignIn' component={SignIn} />
   </Stack.Navigator>
  )
}

export default Auth