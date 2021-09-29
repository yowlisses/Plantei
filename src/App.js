import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler'; // prevent modal error
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {Routes} from './Routes';

import {UserContextProvider} from 'auth/userContext';
import {AlertContextProvider} from 'alert/AlertContext';
import {ModalContextProvider} from 'modal/ModalContext';
import {PermissionsContextProvider} from 'permission/PermissionsContext';
import {CameraPreferencesProvider} from 'camera/contexts/CameraPreferencesContext';

import {ShallowDataContextProvider} from 'publish/ShallowDataContext';
import {SendingContextProvider} from 'send/SendingContext';

import {GOOGLE_WEB_CLIENT_ID} from '@env';
import {MessagesContextProvider} from 'chat/MessagesContext';
import {ChatsContextProvider} from 'chat/ChatsContext';
import {UsersByIdContextProvider} from 'common/UsersByIdContext';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

const App = () => {
  return (
    <ShallowDataContextProvider>
      <UserContextProvider>
        <PermissionsContextProvider>
          <AlertContextProvider>
            <ModalContextProvider>
              <ChatsContextProvider>
                <UsersByIdContextProvider>
                  <MessagesContextProvider>
                    <CameraPreferencesProvider>
                      <SendingContextProvider>
                        <StatusBar barStyle={'default'} hidden={true} />
                        <Routes />
                      </SendingContextProvider>
                    </CameraPreferencesProvider>
                  </MessagesContextProvider>
                </UsersByIdContextProvider>
              </ChatsContextProvider>
            </ModalContextProvider>
          </AlertContextProvider>
        </PermissionsContextProvider>
      </UserContextProvider>
    </ShallowDataContextProvider>
  );
};

export default App;
