import React, { Component } from "react";
import axios from "axios";
import yelp from "../../server/api/yelp";
import { googleKey } from "../../secrets";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polyline
} from "react-native-maps";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import { styles } from "../../Styles/styles";
import haversine from "haversine";
import PlaceCarousel from "./Carousel";
import FeedbackForm from "./FeedbackForm";

export default class StartTrip extends Component {
  constructor() {
    super();
    this.state = {
      yelp: [],
      google: [],
      latitude: 40.704385,
      longitude: -74.009806,
      routeCoordinates: [
        {
          latitude: 40.704385,
          longitude: -74.009806
        }
      ],
      distanceTravelled: 0,
      prevLatLng: {}
    };
    this.getName = this.getName.bind(this);
  }
  async componentDidMount() {
    let businessList = [];
    //watch the position of the user
    await navigator.geolocation.watchPosition(position => {
      const { coordinate, routeCoordinates, distanceTravelled } = this.state;
      const { latitude, longitude } = position.coords;

      const newCoordinate = {
        latitude,
        longitude
      };
      // coordinate.timing(newCoordinate).start();
      this.setState({
        latitude: latitude,
        longitude: longitude,
        routeCoordinates: this.state.routeCoordinates.concat([newCoordinate]),
        distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
        prevLatLng: newCoordinate
      });
    });
    //pull POI based on user's current location
    const { data } = await yelp.get("/search", {
      params: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
    });

    this.setState({ yelp: data.businesses });

    // const google = await axios.get(
    //   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=1500&key=${googleKey}`
    // );
    // this.setState({ google: google.data.results });

    // console.log('businessList:', businessList);
  }

  getName = async id => {
    const name = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,rating,formatted_phone_number&key=${googleKey}`
    );
    // this.setState({ selected: name.data.result.name });
    return name.data.result.name;
  };

  //distance calculator for a trip
  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <View>
        <View style={styles.mapcontainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
          >
            {this.state.yelp.length > 0
              ? this.state.yelp.map(business => (
                  <Marker
                    coordinate={business.coordinates}
                    title={business.name}
                    key={business.id}
                  />
                ))
              : null}

            <Polyline
              coordinates={this.state.routeCoordinates}
              strokeWidth={3}
            />
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Start a Trip" />
        </View>
        <FeedbackForm />

        <PlaceCarousel data={this.state.yelp} />
      </View>
    );
  }
}
