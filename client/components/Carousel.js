import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { styles } from '../../Styles/styles';
import Carousel from 'react-native-anchor-carousel';

export default class PlaceCarousel extends Component {
  renderItem = ({ item, index }) => {
    const { image_url, name } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}
      >
        <ImageBackground
          source={{ uri: image_url }}
          style={styles.imageBackground}
        ></ImageBackground>
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText}>{name}</Text>
          {/* <Text style={styles.contentText}>{content}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        <Carousel
          style={styles.carousel}
          data={this.props.data}
          renderItem={this.renderItem}
          itemWidth={250}
          inActiveOpacity={0.3}
          containerWidth={350}
          ref={c => {
            this.numberCarousel = c;
          }}
        />
      </View>
    );
  }
}
