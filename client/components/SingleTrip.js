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
import { restElement } from "@babel/types";
import {DateTime} from 'luxon'

const format = { month: "long", day: "numeric", year: "numeric" };

export class SingleTrip extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: {},
      trip: {}
    }
    this.getNoteOnPlace = this.getNoteOnPlace.bind(this)
    this.getFormattedDate = this.getFormattedDate.bind(this)
  }

  getNoteOnPlace(placeId){
    let result =  this.props.notes.filter(note => note.placeId === placeId);
    return result;
  }

  getFormattedDate(date){
    return DateTime.fromISO(date).setLocale("en-US").toLocaleString(format);
  }
  render(){
    let trip = this.props.tripInfo
    let notes = this.props.notes

    return (
      <View style={styles.tripLogRow}>
        {trip.imageUrl ? 
            <Image
            source={{uri: trip.imageUrl }}
            style={styles.listImage}
          /> :
          <View></View>
        }

        <View>
          <Text style={styles.eventTitle}>{trip.name}</Text>
          <Text>Start Date: {this.getFormattedDate(trip.startDate)}</Text>
          <Text>End Date: {this.getFormattedDate(trip.endDate)}</Text>
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
                    <Text style={styles.eventTitle}>Date: {this.getFormattedDate(place.date)}</Text>
                    <Text style={styles.eventTitle}>Location: {place.locationAddress}</Text>
                  </View>
                  {notes && this.getNoteOnPlace(place.id).map(placeNotes => (
                    <View key={place.id + Number(placeNotes)}>
                      <Text >{placeNotes.rating}</Text>
                      <Text >{placeNotes.notes}</Text>
                      {/* <Text >{placeNotes.date}</Text> */}
                    </View>
                    ))
                  }
                  {/* <View style={styles.buttonContainer}>
                    <Button style={styles.button} title="Hide" onPress={()=> this.onHide()} />
                  </View>  */}
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