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

class SingleTrip extends Component{
  constructor(props){
    super(props)
    this.onHide = this.onHide.bind(this)
  }

  onHide(){

  }

  ShowPlace (props){
    let place = props.place;
    return (
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
    )
  }

  render(){
    let trip = props.tripInfo

    return (
      <View>
        <Image
          source={{ uri: trip.imageUrl }}
          style={styles.listImage}
        />
        <View>
          <Text style={styles.eventTitle}>{trip.name}</Text>
          <Text>Start Date: {trip.startDate}</Text>
          <Text>End Date: {trip.endDate}</Text>
          <Text>From: {trip.startLocation}</Text>
          <Text>To: {trip.endLocation}</Text>
          <ScrollView>
              {trip.places && trip.places.filter((place)=> place.visibility).map(place => (
              <ShowPlace place={place}></ShowPlace>))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title="Share this trip" />
          </View>  
        </View>
      </View>
    );
  }
}

 
export default connect (null, null)(SingleTrip)