import {StyleSheet, Platform} from 'react-native'
import { blue } from 'ansi-colors';

export const styles = StyleSheet.create({
    backgroundcontainer:{
      flex: 1,
      backgroundColor: '#fff',
      padding: 0
    },
    maincontainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      marginTop: 20,
      margin: 10,
      padding: 0
    },
    headercontainer: {
      flex: 1,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 30,
      borderBottomWidth: 1,
      borderBottomColor: '#dadada'
    },
    languagepickercontainer : {
      flex: 2
    },
    datacontainer : {
      flex: 5
    },
    mapcontainer: {
      ...StyleSheet.absoluteFillObject,
      height: 650,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 60
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    listcontainer: {
      ...StyleSheet.absoluteFill,
      height: 500,
      width: 400,
    },
    neweventcontainer : {
      margin: 40,
      justifyContent: 'flex-start',
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
    welcomebuttonscontainer:{
      marginTop: 575
    },
    titletext: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1
    },
    button: {
      width: 30,
      height: 30,
      resizeMode: 'contain'
    },
    rightButtonContainer: {
      paddingRight: 5
    },
    leftButtonContainer: {
      paddingLeft: 5
    },
    appname :{
      alignItems: 'center',
      color: 'blue',
      textAlign: 'center',
      fontSize: 20
    }
  });
  
  
  