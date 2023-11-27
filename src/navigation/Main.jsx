import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/UIComponents/CustomDrawer';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/colors';
import AllClients from '../screens/Main/Clients/AllClients';
import Attendance from '../screens/Main/Members/Attendance';
import AllExpenses from '../screens/Main/Expenses/AllExpenses';
import MemberProfile from '../screens/Main/Members/MemberProfile';
import HolidayList from '../screens/Main/Holidays/HolidaysList';
import AllLeaves from '../screens/Main/Leaves/AllLeaves';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackNavigatorFunction = () => {
  return (
    <Stack.Navigator initialRouteName='DrawerComponent' screenOptions={{headerShown:false}}>
      <Stack.Screen name='DrawerComponent' component={DrawerNavigator}/>
      <Stack.Screen name='profile' component={MemberProfile}/>
    </Stack.Navigator>
  )
}

const DrawerNavigator = ()=>{
  return(
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      {/* <Drawer.Screen
        name="AllClients"
        component={AllClients}
        options={{
          drawerIcon: ({color}) => {
            return <MaterialCommunityIcons
            size={25} color={color} name="account-multiple" />;
          },

          title: 'Clients',
          headerStyle: {borderBottomWidth: 1, borderBottomColor: colors.prime2},
          headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
          },
        
        }}
      /> */}
      {/* <Drawer.Screen
        name="Attendance"
        component={Attendance}
        options={{
          drawerIcon: ({color}) => {
            return <AntDesign size={25} color={color} name="book" />;
          },

          title: 'Attendance',
          headerStyle: {borderBottomWidth: 1, borderBottomColor: colors.prime2},
          headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
          },
        
        }}
      /> */}
    
      {/* <Drawer.Screen
        name="Expenses"
        component={AllExpenses}
        options={{
          drawerIcon: ({color}) => {
            return <Entypo size={25} color={color} name="wallet" />;
          },

          title: 'Expense',
          headerStyle: {borderBottomWidth: 1, borderBottomColor: colors.prime2},
          headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
          },
        
        }}
      /> */}
    
      <Drawer.Screen
        name="HolidayList"
        component={HolidayList}
        options={{
          drawerIcon: ({color}) => {
            return <Fontisto
            size={24} color={color} marginRight={-11} name="holiday-village" />;
          },

          title: 'Holidays List',
          headerStyle: {borderBottomWidth: 1, borderBottomColor: colors.prime2},
          headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            
          },
        
        }}
      />
      <Drawer.Screen
        name="Leaves"
        component={AllLeaves}
        options={{
          drawerIcon: ({color}) => {
            return <MaterialCommunityIcons
            size={26} color={color}  name="notebook" />;
          },

          title: 'Leaves',
          headerStyle: {borderBottomWidth: 1, borderBottomColor: colors.prime2},
          headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            
          },
        
        }}
      />
    
    </Drawer.Navigator>
  )
}
const Main = () => {
  return (
    <StackNavigatorFunction/>
  );
};

export default Main;
