import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {useQuery} from 'react-query';
import {observe} from 'mobx';
import {useObserver} from 'mobx-react-lite';

import {useUser} from './useUser';
import {UserInfo} from './UserInfo';
import {ConfigButton} from './ConfigButton';

import {api} from 'api';
import {auth} from 'auth/auth';
import {Card} from 'home/Card';
import {send} from 'send/sendings';
import {SendingList} from 'send/SendingList';
import {BackButton} from 'publish/BackButton';
import {CustomHeader} from 'publish/CustomHeader';
import {FooterNavigation} from 'navigation/FooterNavigation';

const numberOfCollums = 3;

export function UserScreen({route}) {
  const {userId: userIdParam} = route.params || {};
  const userId = userIdParam || auth.userId;
  const {data: user} = useUser(userId);

  async function getPlants(userId) {
    const res = await api.get('user-plants/' + userId);
    return res.data;
  }

  const {data} = useQuery(['user', 'plants', userId], () => getPlants(userId));

  function renderItem({item}) {
    return <Card item={item} fraction={3} />;
  }

  function keyExtractor(item) {
    return item?._id;
  }

  useEffect(() => {
    observe(send, getPlants);
    getPlants();
  }, []);

  return useObserver(() => (
    <>
      <View style={{flex: 1}}>
        <CustomHeader
          left={<BackButton />}
          title={user?.name}
          right={userId === auth.userId && <ConfigButton />}
        />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={numberOfCollums}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <UserInfo user={user} />
              {userId === auth.userId && <SendingList />}
            </>
          }
        />
      </View>
      <FooterNavigation />
    </>
  ));
}
