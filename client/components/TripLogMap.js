import React, { Component } from "react";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polyline
} from "react-native-maps";
import { StyleSheet, Text, View, Image, FlatList, Button, Modal, TouchableOpacity, TouchableHighlight } from "react-native";
import { styles } from "../../Styles/styles";
import Geocoder from 'react-native-geocoding';
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from 'react-redux'


export class TripLogMap extends Component {
  constructor(props) {
    super(props);
    Geocoder.init("AIzaSyDFtJUTkoeUoQjChhPxkjNxAOnrDLxXBYo");
    this.state = {
        markers: [],
        routeCoordinates: [],
   
    }
    this.addMarker = this.addMarker.bind(this);
  }
  async addMarker(location, title){
    try{
      let json = await Geocoder.from(location)
      var location = json.results[0].geometry.location;
      const newCoordinate = {
        latitude: location.lat,
        longitude : location.lng
      };
      const pin =
      {
        latitude: newCoordinate.latitude,
        longitude: newCoordinate.longitude,
        title: title
      }
      let pins = this.state.markers;
      pins.push(pin);
      this.setState({ markers: pins, 
                    routeCoordinates: this.state.routeCoordinates.concat([newCoordinate])})
    }
    catch(error){
       console.warn(error);
    };
  }

  // async addMarkerLatLong(latitude, longitude, title){
   
  //   try{
  //     const newCoordinate = {
  //       latitude: latitude,
  //       longitude : longitude
  //     };
  //     const pin =
  //     {
  //       latitude: newCoordinate.latitude,
  //       longitude: newCoordinate.longitude,
  //       title: title
  //     }
  //     let pins = this.state.markers;
  //     pins.push(pin);
  //     this.setState({ markers: pins, 
  //                   routeCoordinates: [...this.state.routeCoordinates,newCoordinate ]})
  //                   console.log("STATE AFTER SET STATE:",this.state)
  //   }
  //   catch(error){
  //      console.warn(error);
  //   };
  // }
  
  async componentDidMount(){
    console.log("Trip Log Map - component did mount")
    if(this.props.places && this.props.places.length > 0){
      let places = this.props.places;
      for(let i = 0; i< places.length; i++){
          // await this.addMarkerLatLong(places[i].locationLat, places[i].locationLong, places[i].name)
          await this.addMarker(places[i].locationAddress, places[i].name)
      }
    // }
    // else if (this.props.businesses && this.props.businesses.length > 0){
    //   let business = this.props.businesses;
    //   for(let i = 0; i< business.length; i++){
    //       await this.addMarkerLatLong(business[i].coordinates.latitude, business[i].coordinates.longitude, business[i].name)
    //   }
    }
  }
  
  render() {
    console.log('TRIPLOGMAP PLACES', this.props.places)
    let startLatitude = this.props.startLat;
    let startLongitude = this.props.startLong;
    // if(this.props.currentTrip.places) {
    //   let currentPlaces = this.props.currentTrip.places
    //   console.log("Trip Log Map - currentPlaces", currentPlaces)
    // }

    return (
        <View>
        {startLatitude ?
                <View style={styles.mapcontainer}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={{
                    latitude: startLatitude,
                    longitude: startLongitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                    }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                >
                {
                    this.state.markers.map((marker, idx) => {
                        return (
                            <Marker
                                key={idx}
                                coordinate={{latitude: marker.latitude,
                                longitude: marker.longitude}}
                                title={marker.title}
                                // description={marker.subtitle}
                            />
                        )
                    })
                }

                {this.props.places ? this.props.places.map(place => { return (
                  <Marker
                                key={place.uniqueId}
                                coordinate={{latitude: place.locationLat,
                                longitude: place.locationLong}}
                                title={place.name}
                                // description={marker.subtitle}
                            />

                )
                  
                 

                }) : null }
                <Polyline
                    coordinates={this.state.routeCoordinates}
                    strokeWidth={3}
                />
                </MapView>
                </View>
            : null}
         </View>      
      );
    }
}

const mapStateToProps = state => ({
  options: state.options.options,
  user: state.user,
  currentTrip: state.currentTrip,
});

// const mapDispatchToProps = dispatch => ({
//   getCurrentTrip: userId => dispatch(getCurrentTrip(userId)),
//   startTrip: (userId, location) => dispatch(startTrip(userId, location)),
// });

export default connect(
  mapStateToProps
  //   mapDispatchToProps
)(Map);