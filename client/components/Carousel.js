import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import defaultCategories from '../../utils/defaultCategories';
import { getOptions } from '../store/optionsReducer';
import { connect } from 'react-redux';

const { width: screenWidth } = Dimensions.get('window');

class PlaceCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.findOption = this.findOption.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  findOption(params) {
    this.props.getOptions(params, this.props.location);
  }

  renderItem({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => this.findOption(item.name)}
        >
          <Image
            source={{ uri: item.image_url }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            // parallaxFactor={0.4}
            // {...parallaxProps}
          />

          <Text style={styles.title} numberOfLines={2}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {


    return this.props.options.businesses ? (
      <View>
        <Carousel
          layout={'default'}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={this.props.options.businesses}
          renderItem={this.renderItem}
          // hasParallaxImages={true}
        />
      </View>
    ) : (
      <View>
        <Carousel
          layout={'default'}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={defaultCategories}
          renderItem={this.renderItem}
          // hasParallaxImages={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 100,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

const mapStateToProps = state => ({
  options: state.options,
  user: state.user,
  currentTrip: state.currentTrip,
});

const mapDispatchToProps = dispatch => ({
  getOptions: (params, location) => dispatch(getOptions(params, location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceCarousel);
