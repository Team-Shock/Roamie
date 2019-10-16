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
import { addToRoute } from '../store/currentTrip';
import { connect } from 'react-redux';

const { width: screenWidth } = Dimensions.get('window');

class PlaceCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderActivities = this.renderActivities.bind(this);
  }

  renderActivities({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            this.props.options.businesses
              ? this.props.addToRoute(item, this.props.currentTrip.id)
              : this.props.getOptions(item.name, this.props.location);
          }}
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
          renderItem={this.renderActivities}
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
          renderItem={this.renderActivities}
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
  options: state.options.options,
  user: state.user,
  currentTrip: state.currentTrip,
  nextPlace: state.options.nextPlace,
});

const mapDispatchToProps = dispatch => ({
  getOptions: (params, location) => dispatch(getOptions(params, location)),
  addToRoute: (item, tripId) => dispatch(addToRoute(item, tripId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceCarousel);
