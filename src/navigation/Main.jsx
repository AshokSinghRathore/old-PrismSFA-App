import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/UIComponents/CustomDrawer';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {colors} from '../constants/colors';
import AllClients from '../screens/Main/Clients/AllClients';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Main = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="AllClients"
        component={AllClients}
        options={{
          drawerIcon: ({color}) => {
            return <Fontisto size={25} color={color} name="person" />;
          },

          title: 'Clients',
          headerStyle: {borderBottomWidth: 1, borderBottomColor: colors.prime2},
          headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
          },
        
        }}
      />
    
    </Drawer.Navigator>
  );
};

export default Main;
