import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Axios from 'axios';
import { styles } from '../Styles/styles'
import { Trip } from './Trip'

export class Trips extends Component {
    constructor(){
        super()
        this.state = {
            trips: [{name:'hi'}]
        }
    }
    async componentDidMount(){
        const {data} = await Axios.get('/api/trips')
        this.setState({trips: data})
    }
    render() {
        const trips = this.state.trips;
        return (
            <View style={styles.listcontainer}>
                <ScrollView style={styles.eventscontainer}
                style={styles.container}>
                {
                    trips && trips.map(trip => 
                        <Trip tripInfo={trip} key={trip.id} />
                    )
                }
                </ScrollView>
            </View>
        );
    }
}
