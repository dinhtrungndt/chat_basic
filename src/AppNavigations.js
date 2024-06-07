/* eslint-disable prettier/prettier */
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeStackScreen} from './mess/homeStack';
import UserNavigation from './user/userNavigations';
import {UserContext} from './user/userContext';

const AppNavigations = () => {
  const {user} = useContext(UserContext);

  return (
    <NavigationContainer>
      {user ? <HomeStackScreen /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigations;
