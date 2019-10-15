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
import { StyleSheet, Text, View, Image, FlatList, Button, Modal, TouchableOpacity, TouchableHighlight } from "react-native";
import { styles } from "../../Styles/styles";
import Geocoder from 'react-native-geocoding';
import Icon from "react-native-vector-icons/FontAwesome";


export class Map extends Component {
  constructor(props) {
    super(props);
    Geocoder.init("AIzaSyDFtJUTkoeUoQjChhPxkjNxAOnrDLxXBYo");
    this.state = {
        markers: [],
        routeCoordinates: [],
        modalVisible: false,
        mapView: false
    }
    this.addMarker = this.addMarker.bind(this);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async addMarker(location, title){
    console.log("Adding Marker")
    try{
      let json = await Geocoder.from(location)
      var location = json.results[0].geometry.location;
      console.log("Adding Marker")
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
  async componentDidMount(){
    console.log("Component did mount in Map")

      let places = this.props.places;
      for(let i = 0; i< places.length; i++){
          await this.addMarker(places[i].locationAddress, places[i].name)
      }
  }
  
  render() {
    console.log("Map Lat", this.props.startLat);
    console.log("Map Long", this.props.startLong);
    console.log("Markers", this.state.markers);
    console.log("Places", this.props.places.length);
    console.log("Route Coordinates", this.state.routeCoordinates);

    let startLatitude = this.props.startLat;
    let startLongitude = this.props.startLong;

    return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            {/* <View style={styles.modalContainer}> */}
                <View>
                {startLatitude ?
                    <View>
                        <View style={styles.mapcontainerModal}>
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
                                        description={marker.subtitle}
                                    />
                                )
                            })
                        }
                        <Polyline
                            coordinates={this.state.routeCoordinates}
                            strokeWidth={3}
                        />
                        </MapView>
                        </View>
                    </View> : null}
            </View>
            {/* </View> */}
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              style={styles.modalClose}
            >
              <Text>Close Map</Text>
            </TouchableHighlight>
          </Modal>
  
          <TouchableHighlight
                onPress={() => {
                    this.setModalVisible(true);
                }}
                >
                <Icon.Button
                    name="map"
                    backgroundColor="#ffffff"
                    color="#F277C6"
                    onPress={() => {
                    this.setModalVisible(true);
                    }}
                >
                    Map
                </Icon.Button>
            </TouchableHighlight>

        </View>
      );
  }
}
