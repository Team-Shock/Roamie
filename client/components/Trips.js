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
import { getTrips } from '../store/trips-reducer'
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
  
  async componentDidMount() {
    await this.props.getCurrentUser();
    if(this.props.user){
      this.props.getTrips(this.props.user.id);
    }
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
              <Text>No Trips in your account. Start your trip with Roamie today!</Text>
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
                    <Button title="Hide from TripLog" />
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
          <Button title="Back" onPress={() => this.onBackButton()} />
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
  trips: state.trips
})

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(me()),
  getTrips: (userId) => dispatch(getTrips(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips);


