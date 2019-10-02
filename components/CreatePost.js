import React, { Component } from 'react';
import { Modal, TextInput, View, TouchableHighlight, Image, StyleSheet, Button } from 'react-native';
import { FirebaseWrapper } from '../firebase/firebase';

export class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  async createPost() {
    try {
      // console.log('ayoooo', this.state.text)
      // make call to Firebase
      await FirebaseWrapper.GetInstance().CreateNewDocument('posts', { text: this.state.text })
      this.props.closeModal()
    } catch (error) {
      console.log('something went wrong creating post: ', error)
    }
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.isModalVisible}
      >
        <View style={{ marginTop: 25 }}>
          <TouchableHighlight
            onPress={() => {
              this.props.closeModal()
            }}>
            <Image 
              source={{ uri: 'https://cdn4.iconfinder.com/data/icons/media-controls-4/100/close-512.png' }} 
              style={styles.close}
            />
          </TouchableHighlight>
          
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({ text })}
            placeholder="Tell your friends something here..."
            value={this.state.text} 
            style={styles.input}
          />

        </View>

        <Button title="Create Post" onPress={() => this.createPost()}/>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 80
  },
  close: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10
  }
})