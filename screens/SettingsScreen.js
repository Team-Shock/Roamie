import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Trips } from '../components/Trips'

export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return( 
    <View>
      <Trips />
    </View>
    )
  
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
