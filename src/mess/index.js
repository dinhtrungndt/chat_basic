/* eslint-disable prettier/prettier */
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// Data
import {listOF} from './data/listOF';

// css

// library
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './style/home';
import {GetListUser} from '../user/userService';
import {UserContext} from '../user/userContext';

const MessScreen = props => {
  const {navigation} = props;
  const [user, setUser] = useState('');
  const {user: userContext} = useContext(UserContext);
  // console.log('userContext', userContext.user._id);

  const getListUser = async () => {
    try {
      const res = await GetListUser(userContext.user._id);
      setUser(res);
    } catch (error) {
      console.log('getListUser error', error);
    }
  };

  const twoData = [...user, ...listOF];

  useEffect(() => {
    getListUser();
  }, []);

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={26} color="#22b6c0" />
        </TouchableOpacity>
        <Text style={styles.chat}>Chat</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="message-plus-outline"
            size={26}
            color="#22b6c0"
          />
        </TouchableOpacity>
      </View>

      {/* sreach */}
      <View style={styles.sreach}>
        <Ionicons name="search" size={20} color="#22b6c0" />
        <TextInput style={styles.inputSearch} placeholder="Tìm kiếm" />
      </View>

      {/* list online and offline */}
      <View style={styles.listOF}>
        <FlatList
          data={listOF}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Image style={styles.image} source={{uri: item.image}} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.status}>
                  <Ionicons
                    name="ellipse"
                    size={10}
                    color={item.status === 'online' ? '#00FF00' : '#FF0000'}
                  />
                  <Text style={styles.status_text}>{item.status}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {/* line */}
      <Text style={styles.line} />

      {/* list chat */}
      <FlatList
        data={user}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.container_chat}
            onPress={() =>
              navigation.navigate('ChatScreenIn', {receiver: item})
            }>
            <Image
              style={styles.image}
              source={require('../assets/image.png')}
            />
            <View style={styles.info}>
              <Text style={styles.nameChat}>{item.name}</Text>
              <Text style={styles.TextlistChat}>{item?.chat}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MessScreen;
