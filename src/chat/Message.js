import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MessageHour} from './MessageHour';
import {MessageStatus} from './MessageStatus';
import {ChatReference} from './ChatReference';

export function Message({message, moreMargin, fromUser}) {
  const {text, time, status, reference} = message;

  // status === 'sending' ? 12 :
  const paddingRight = fromUser ? (status === 'sending' ? 10 : 46) : 30;

  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    setRefresh(-refresh);
  }, [paddingRight]);

  return (
    <View
      style={[
        styles.colorArea,
        fromUser ? styles.fromUser : styles.fromOther,
        moreMargin && styles.moreMargin,
      ]}>
      {reference && <ChatReference reference={reference} />}
      <View style={[styles.message]}>
        <Text style={[styles.text]}>
          {text}
          <Text style={{fontSize: 0}}>{refresh}</Text>
          <View style={{paddingRight, paddingTop: 6}} />
        </Text>
      </View>
      <View style={styles.miniInfo}>
        {status !== 'sending' && <MessageHour time={time} />}
        {fromUser && <MessageStatus status={status} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorArea: {
    elevation: 1,
    padding: 2,
    borderRadius: 10,
    marginBottom: 3,
  },
  text: {
    fontSize: 16,
    padding: 8,
  },
  fromUser: {
    backgroundColor: '#ccf8b6',
    alignSelf: 'flex-end',
    marginRight: 0,
    marginLeft: 30,
  },
  fromOther: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    marginRight: 30,
    marginLeft: 0,
  },
  moreMargin: {
    marginTop: 10,
  },
  miniInfo: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
