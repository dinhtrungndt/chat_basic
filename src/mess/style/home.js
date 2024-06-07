/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image_menu: {
    width: 30,
    height: 30,
  },
  chat: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  sreach: {
    width: '100%',
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingLeft: 10,
  },
  image_search: {
    width: 20,
    height: 20,
  },
  inputSearch: {
    width: '90%',
    marginLeft: 10,
  },
  listOF: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status_text: {
    marginLeft: 5,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#dedede',
    marginBottom: 20,
  },
  container_chat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameChat: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
