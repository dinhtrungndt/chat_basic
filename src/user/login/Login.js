import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserContext} from '../userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin} = useContext(UserContext);

  const onLoginPress = async () => {
    const result = await onLogin(email, password);
    if (!result) {
      alert('Đăng nhập thất bại');
    } else {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.T}>
      <Text style={styles.text_login}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onLoginPress}>
        <Text style={styles.btnLogin}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = {
  T: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_login: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#22b6c0',
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },
  btnLogin: {
    color: 'white',
  },
};
