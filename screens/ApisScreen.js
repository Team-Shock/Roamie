import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Apis } from '../components/Apis';
import { View } from 'react-native';

export default function ApisScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return (
    <View>
      <Apis />
    </View>
  );
}

ApisScreen.navigationOptions = {
  title: 'My Trips',
};
