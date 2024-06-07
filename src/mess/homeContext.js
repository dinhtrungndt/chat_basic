/* eslint-disable prettier/prettier */
import React, {createContext, useState} from 'react';

export const HomeContext = createContext();

export const HomeProvider = props => {
  const {children} = props;

  const [chats, setChats] = useState([]);
  return (
    <HomeContext.Provider value={{chats, setChats}}>
      {children}
    </HomeContext.Provider>
  );
};
