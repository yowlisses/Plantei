import {api} from 'api';
import React, {createContext, useContext, useEffect, useState} from 'react';

const ChatsContext = createContext();

export function ChatsContextProvider({children}) {
  const [chats, setChats] = useState([]);

  async function getChats() {
    try {
      const res = await api.get('/chats');
      setChats(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getChats();
    return getChats;
  }, []);

  return (
    <ChatsContext.Provider value={{chats}}>{children}</ChatsContext.Provider>
  );
}

export function useChats() {
  return useContext(ChatsContext);
}