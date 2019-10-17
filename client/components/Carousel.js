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
import { addToRoute, getOptions } from '../store/currentTrip';
import { connect } from 'react-redux';
import FeedbackForm from './FeedbackForm';
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
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return this.props.options.businesses ? (
      <View>
        <Text style={styles.title}>Pick a business to visit:</Text>
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
        <Text style={styles.title}>Pick a category:</Text>
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
    height: 200,
    borderRadius: 15,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  imageContainer: {
    flex: 1,
    width: screenWidth - 60,
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
  },

  title: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  textContainer: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});

const mapStateToProps = state => ({
  options: state.currentTrip.options,
  user: state.user,
  currentTrip: state.currentTrip.trip,
});

const mapDispatchToProps = dispatch => ({
  getOptions: (params, location) => dispatch(getOptions(params, location)),
  addToRoute: (item, tripId) => dispatch(addToRoute(item, tripId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceCarousel);
