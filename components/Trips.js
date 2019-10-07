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
  View
} from "react-native";
import { styles } from "../Styles/styles";
import { Trip } from "./Trip";
import { PostgresWrapper } from "../postgres/postgres";
import Axios from "axios";

export class Trips extends Component {
  constructor() {
    super();
    this.state = {
      trips: [{ id: 1, name: "hi" }]
    };
  }
  async componentDidMount() {
    const instance = await PostgresWrapper.getInstance();
    const { data } = await instance.get("/api/trips");
    this.setState({ trips: data });
  }
  render() {
    const trips = this.state.trips;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {trips && trips.map(trip => <Trip tripInfo={trip} key={trip.id} />)}
        </ScrollView>
      </View>
    );
  }
}
