/* eslint-disable prettier/prettier */
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserContext} from '../../../../contexts/user/userContext';

const HeaderScreens = props => {
  const {navigation} = props;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleOnDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.textHeader}>𝓢𝔀𝓮𝓮𝓽𝓼</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerIconContainer}
            onPress={handleOnDropdown}>
            <Text style={{fontSize: 32, color: 'black', top: -5}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchScreens')}
            style={[styles.headerIconContainer, {marginLeft: 5}]}>
            <Ionicons name="search" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerIconContainer, {marginLeft: 5}]}>
            <Ionicons
              name="notifications-circle-sharp"
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default HeaderScreens;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 38,
    color: '#000000',
    fontFamily: 'Roboto',
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#e4e6eb',
    backgroundColor: '#e4e6eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
    flexDirection: 'row',
  },
  headerIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
    resizeMode: 'cover',
  },
});
