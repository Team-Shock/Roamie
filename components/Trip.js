import React from 'react';
import { Text, View, Image, StyleSheet, Button, ImageBackground} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { tsMethodSignature } from '@babel/types';

export function Trip(props) {
  return (
    <View style={styles.postContainer}>
      <ImageBackground source={{uri: props.tripInfo.imageUrl}} style={{width: '100%', height: '100%'}}>
          <View >
            <Text style={styles.eventTitle}>{props.tripInfo.name}</Text>
          </View>	              
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 10,
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
    height: 400
  }, 
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateUserContainer: {
    marginLeft: 3
  },
  eventTitle: {
    fontSize: 20
  },
  eventDetails: {
    padding: 5,
    fontSize: 10
  }
})

