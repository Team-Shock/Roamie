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
import { googleKey } from '../../secrets'

export class TripLogMap extends Component {
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

  async getDirections(startLoc, destinationLoc) {
    console.log("Get Directions from : ",startLoc);
    console.log("Get Directions to : ",destinationLoc);
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?key=${googleKey}&origin=${ startLoc.replace(" ", "+") }&destination=${ destinationLoc.replace(" ", "+")  }`)
        let respJson = await resp.json();
        // console.log("res", respJson)
        if(respJson.routes[0]){
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            console.log("Adding coords:", coords)
            this.setState({routeCoordinates: coords})
        }
        else{
            console.log("Unable to find directions from: ", startLoc)
            console.log("Unable to find directions to: ", destinationLoc)
        }
    } catch(error) {
        alert(error)
        return error
    }
  }   

  async addMarker(location, title){
      console.log("Add Marker for ", location)
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
      this.setState({ markers: pins })
    }
    catch(error){
       console.warn(error);
    };
  }
  async componentDidMount(){
      let places = this.props.places;
      for(let i = 0; i< places.length; i++){
          await this.addMarker(places[i].locationAddress, places[i].name)
          if((i+1) < places.length){
              console.log("Inside If loop")
            await this.getDirections(places[i].locationAddress, places[i+1].locationAddress )
          }
      }
  }
  
  render() {
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