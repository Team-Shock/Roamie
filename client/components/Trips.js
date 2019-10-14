import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Button
} from "react-native";
import { styles } from "../../Styles/styles";
import { SingleTrip } from "./SingleTrip";
import { me } from '../store/user-reducer';
import { getTrips } from '../store/tripsReducer'
import { connect } from 'react-redux';

class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleTripSelected : false,
      selectedTrip : {}
    }
    this.onBackButton = this.onBackButton.bind(this)
    this.onTripPress = this.onTripPress.bind(this)
  }

  onTripPress(tripInfo){
    this.setState({singleTripSelected: true,
                  selectedTrip : tripInfo});
    
  }

  onBackButton(){
    this.setState({singleTripSelected:false})
  }
  render() {
    const trips = this.props.trips;
    return (
      <View>
      {!this.state.singleTripSelected ? (
        <View style={{ flex: 1 }}>
          <ScrollView>
          {!trips || trips.length <=0 ? (
            <View>
              <Text>No Trips in your account. Start your trip with Roamie today!</Text>
              <View style={styles.buttonContainer}>
              <Button style={styles.button} title="Start a Trip" />
              </View>
            </View>
            ) : (
              <View>
              {trips && trips.map(trip => 
                (
                  <View style={styles.tripLogRow} key={trip.id}>
                  <Image
                    source={{ uri: trip.imageUrl }}
                    style={styles.listImage}
                  />
                  <View>
                    <Text style={styles.eventTitle}>{trip.name}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button title="View" onPress={() => this.onTripPress(trip)} />
                  </View>
                </View>
                ))}
              </View>
            )
          }
          </ScrollView>
        </View>
       ) : (
         <View>
           <View style={styles.buttonContainer}>
          <Button title="Back" onPress={() => this.onBackButton()} />
          </View> 
          <SingleTrip tripInfo={this.state.selectedTrip} />
        </View>
       )
      }
      </View>
    );
  }
  
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.user.trips
})

export default connect(
  mapStateToProps,
  null
)(Trips);


