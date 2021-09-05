import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export function UserRoundImage({item, size, style, thumbnail}) {
  const {navigate} = useNavigation();

  size = size || 30;

  return (
    <TouchableOpacity
      onPress={() => navigate('UserScreen')}
      activeOpacity={0.8}>
      <FastImage
        style={[styles.image, {width: size, height: size}, style]}
        source={{uri: thumbnail ? item?.thumbnail : item?.image}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    backgroundColor: '#ddd',
  },
});
