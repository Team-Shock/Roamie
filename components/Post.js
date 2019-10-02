import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export function Post(props) {
  return (
    <View style={styles.postContainer}>
      <View style={styles.container}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={{ uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/prince-1561086744.jpg?resize=320:*" }} />

        <View style={styles.dateUserContainer}>
          <Text style={styles.username}>Username</Text>
          <Text> 12/11/18</Text>
        </View>
      </View>

      <Text style={styles.postText}>{props.postInfo.text} </Text>
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
  postText: {
    padding: 5,
    fontSize: 15
  }
})

