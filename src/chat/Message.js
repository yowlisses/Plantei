import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MessageHour} from './MessageHour';
import {MessageStatus} from './MessageStatus';
import {ChatItemReference} from './ChatItemReference';

// development
const USER_ID = 100;

export function Message({item, moreMargin}) {
  const {text, time, status, reference} = item;
  const fromUser = item.userId === USER_ID;

  return (
    <View
      style={[
        styles.colorArea,
        fromUser ? styles.fromUser : styles.fromOther,
        moreMargin && styles.moreMargin,
      ]}>
      {reference && <ChatItemReference />}
      <View style={[styles.message]}>
        <Text style={[styles.text]}>
          {text}
          <View style={{paddingRight: fromUser ? 48 : 30, paddingTop: 6}} />
        </Text>
      </View>
      <View style={styles.miniInfo}>
        <MessageHour time={time} />
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
