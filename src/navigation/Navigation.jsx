import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import Main from './Main';
import {useSelector} from 'react-redux';

const Navigation = () => {
  const Cred = useSelector(state => state.Cred);
  return (
    <NavigationContainer>
      {Cred.token ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};

export default Navigation;
