import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export function Trip(props) {
  return (
    <View style={styles.postContainer}>
      <View style={styles.container}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={{ uri: props.tripInfo.imageUrl}} />

        <View style={styles.dateUserContainer}>
            <Text style={styles.eventTitle}>{props.tripInfo.name}</Text>
        </View>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 10,
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
  }, 
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
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

