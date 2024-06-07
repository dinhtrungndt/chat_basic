/* eslint-disable prettier/prettier */
import React from 'react';

// Screens

// Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessScreen from '.';
import ChatScreenIn from './chat';

const Stack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MessScreen" component={MessScreen} />
      <Stack.Screen name="ChatScreenIn" component={ChatScreenIn} />
    </Stack.Navigator>
  );
}
