import React, {useContext} from 'react';
import {createContext, useState} from 'react';
import {api} from 'api';
import OneSignal from 'react-native-onesignal';

const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  async function authenticate(idToken) {
    try {
      const res = await api.post('/googlesignin', {idToken});
      const {token, user, email, emailAuthToken, id, idAuthToken} = res.data;
      setToken(token);
      setUser(user);

      OneSignal.setEmail(email, emailAuthToken, err => {
        console.error(err);
      });

      OneSignal.setExternalUserId(id, idAuthToken, err => {
        console.error(err);
      });

      api.defaults.headers.common.auth = `Bearer ${token}`;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <UserContext.Provider value={{authenticate, token, user}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
