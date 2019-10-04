// import * as WebBrowser from 'expo-web-browser';
// import React, { Component } from 'react';
// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { styles } from '../Styles/styles';
// import { Trip } from './Trip';
// import { PostgresWrapper } from '../postgres/postgres';
// import axios from 'axios';
// // import yelp from '../server/api/yelp';
// // import { yelpKey } from '../secrets';
// import yelp from '../server/api/yelp';

// export class Apis extends Component {
//   constructor() {
//     super();
//     this.state = {
//       //   headers: { Authorization: yelpKey },
//       params: {
//         term: 'coffee',
//         latitude: '37.786882',
//         longitude: '-122.399972',
//       },
//       results: [],
//     };
//   }
//   async componentDidMount() {
//     // await axios
//     //   .get('https://api.yelp.com/v3/businesses/search', this.state)
//     //   .then(res => (this.state.results = res.data))
//     //   .catch(e => console.log(e));

//     const { data } = await yelp.get('/search', this.state.params);
//     this.state.results = data.businesses;
//   }
//   render() {
//     const trips = this.state.trips;
//     return (
//       <View style={styles.listcontainer}>
//         <Text>Did my auth request go through?</Text>
//       </View>
//     );
//   }
// }

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
// import { yelpKey } from '../secrets';

const config = {
  headers: {
    Authorization:
      'wqK7j8NkZ3YCzw85lbV9ZgWS5OMEqxSdI12nVPUjFFGiTKBy_QQYYmw_xgDXGaKvP4dA7mCk0QEEaQrJlaTBlCLLscrkDtX2iFjwb0eAxuw59S9PEUqL4J_E_c2UXXYx',
  },
  params: {
    term: 'tacos',
    location: 'san francisco, ca',
  },
};

export class Apis extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    const request = await axios
      .get('https://api.yelp.com/v3/businesses/search', {
        headers: {
          Authorization:
            'Bearer wqK7j8NkZ3YCzw85lbV9ZgWS5OMEqxSdI12nVPUjFFGiTKBy_QQYYmw_xgDXGaKvP4dA7mCk0QEEaQrJlaTBlCLLscrkDtX2iFjwb0eAxuw59S9PEUqL4J_E_c2UXXYx',
        },
        params: {
          term: 'tacos',
          location: 'san francisco, ca',
        },
      })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View>
        <Text> My first yelp authentication request </Text>
      </View>
    );
  }
}
