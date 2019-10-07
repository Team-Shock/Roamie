import React, { Component } from 'react';
import axios from 'axios';
import yelp from '../server/api/yelp';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { styles } from '../Styles/styles';

export default class StartTrip extends Component {
  constructor() {
    super();
    this.state = {
      businesses: [],
    };
  }
  async componentDidMount() {
    const request = await yelp
      .get('/search', {
        params: {
          term: 'tacos',
          location: 'san francisco, ca',
        },
      })
      .then(response => {
        // console.log(response.data.businesses);
        this.setState(response.data.businesses);
        return response;
      })
      .catch(error => console.log(error));
    this.setState({ businesses: request.data.businesses });
    // console.log(request.data.businesses);
    console.log(this.state.businesses[0]);
  }

  render() {
    let placeholderMap = {
      uri:
        'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg',
    };
    return (
      <View>
        <Image source={placeholderMap} style={styles.mapcontainer} />
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Start a Trip" />
        </View>
        {this.state.businesses.length ? (
          <View>
            <FlatList
              data={this.state.businesses}
              renderItem={({ item }) => (
                <Text style={styles.eventTitle}>{item.name}</Text>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        ) : (
          <View>
            <Text>Nothing To See Here</Text>
          </View>
        )}
      </View>
    );
  }
}
