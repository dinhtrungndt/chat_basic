/* eslint-disable prettier/prettier */
import AxiosInstance from '../helper/Axiosinstance';

export const login = async (email, password) => {
  try {
    const body = {
      email: email,
      password: password,
    };
    const response = await AxiosInstance().post('/users/login', body);
    return response;
  } catch (error) {
    console.log('register: ', error);
    return error;
  }
};

export const GetListUser = async id => {
  try {
    const res = await AxiosInstance().get(`/users/get-users-except-id/${id}`);
    return res;
  } catch (error) {
    console.log('getListUser error', error);
    return error;
  }
};

export const GetMessageSR = async (idSender, idReceiver) => {
  try {
    const res = await AxiosInstance().get(
      `message/get-message/list/${idSender}/${idReceiver}`,
    );
    return res;
  } catch (error) {
    console.log('getListUser error', error);
    return error;
  }
};
