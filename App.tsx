import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UserProvider} from './src/user/userContext';
import {HomeProvider} from './src/mess/homeContext';
import AppNavigations from './src/AppNavigations';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserProvider>
        <HomeProvider>
          <AppNavigations />
        </HomeProvider>
      </UserProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
