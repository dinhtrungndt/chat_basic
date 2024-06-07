/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessScreen from '../mess';
import LoginScreen from './login/Login';

const StacK = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <StacK.Navigator screenOptions={{headerShown: false}}>
      <StacK.Screen name="LoginScreen" component={LoginScreen} />
      <StacK.Screen name="MessScreen" component={MessScreen} />
    </StacK.Navigator>
  );
};

export default UserNavigation;
