import React, {Component} from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  ImageBackground,
  ScrollView
} from "react-native";
import { styles } from "../../Styles/styles";
import { connect } from 'react-redux';
import { getSelectedTrip } from '../store/tripsReducer'

export class SingleTrip extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: {},
      trip: {}
    }
    this.onHide = this.onHide.bind(this)
  }

  onHide(){

  }
  render(){

    let trip = this.props.tripInfo
    return (
      <View>
        {trip.imageUrl ? 
            <Image
            source={{uri: trip.imageUrl }}
            style={styles.listImage}
          /> :
          <View></View>
        }

        <View>
          <Text style={styles.eventTitle}>{trip.name}</Text>
          <Text>Start Date: {trip.startDate}</Text>
          <Text>End Date: {trip.endDate}</Text>
          <Text>From: {trip.startLocation}</Text>
          <Text>To: {trip.endLocation}</Text>
          <ScrollView>
              {trip.places && trip.places.map(place => (
                <View style={styles.tripLogRow} key={place.id}>
                  <Image
                    source={{ uri: place.imageUrl }}
                    style={styles.listImage}
                  />
                  <View>
                    <Text style={styles.eventTitle}>{place.name}</Text>
                    <Text style={styles.eventTitle}>Description: {place.description}</Text>
                    <Text style={styles.eventTitle}>Date: {place.date}</Text>
                    <Text style={styles.eventTitle}>Location: {place.locationAddress}</Text>
                    <View style={styles.buttonContainer}>
                      <Button style={styles.button} title="Hide" onPress={()=> this.onHide()} />
                    </View> 
                  </View>
                </View>
              ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title="Share this trip" />
          </View>  
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trip: state.trips.selectedTrip

})

const mapDispatchToProps = dispatch => ({
  getTrip : (userId, tripId) => dispatch(getSelectedTrip(userId, tripId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTrip);