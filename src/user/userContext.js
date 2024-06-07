import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from './userService';

export const UserContext = createContext();

export const UserProvider = props => {
  const {children} = props;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userPassword = await AsyncStorage.getItem('userPassword');
        if (userEmail && userPassword) {
          const result = await login(userEmail, userPassword);
          if (result && result.status === 1) {
            setUser(result);
          }
        }
      } catch (error) {
        console.log('Lỗi khi kiểm tra thông tin đăng nhập:', error);
      }
    };
    checkLogin();
  }, []);

  const onLogin = async (email, password) => {
    try {
      const result = await login(email, password);
      if (result.status === 1) {
        setUser(result);
        return true;
      }
    } catch (error) {
      console.log('Lỗi khi đăng nhập', error);
    }
    console.log('Lỗi khi đăng nhập', 'Thất bại');
    return false;
  };

  return (
    <UserContext.Provider value={{user, setUser, onLogin}}>
      {children}
    </UserContext.Provider>
  );
};
