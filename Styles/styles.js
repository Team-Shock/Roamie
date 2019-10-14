import { StyleSheet, Platform } from 'react-native';
import { blue } from 'ansi-colors';

export const styles = StyleSheet.create({
  about: {
    textAlign: "center",
    fontSize: 18,
    margin: 20
  },
  appname: {
    alignItems: 'center',
    color: 'blue',
    textAlign: 'center',
    fontSize: 20,
  },
  backgroundcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  backgroundButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  backgroundButtonTouchable: {
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 8,
  },
  backgroundButtonDeselected: {
    flexDirection: 'row',
    borderRadius: 23,
    borderColor: '#dadada',
    borderWidth: 2,
    backgroundColor: '#dadada',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  backgroundButtonSelected: {
    flexDirection: 'row',
    borderRadius: 23,
    borderColor: 'pink',
    borderWidth: 2,
    backgroundColor: 'pink',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  buttonContainer: {
    borderColor: '#F277C6',
    borderWidth: 1,
    margin: 10,
    borderRadius: 15,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  datacontainer: {
    flex: 5,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  eventTitle: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  headercontainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
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
  homeScreenFilename: {
    marginVertical: 7,
  },

  languagepickercontainer: {
    flex: 2,
  },
  leftButtonContainer: {
    paddingLeft: 5,
  },
  listImage: {
    height: 75,
    width: 300,
    zIndex: -1,
  },
  listContainer: {
    marginHorizontal: 15,
  },
  loginButton: {
    margin: 20,
  },
  loginButtonContainer: {
    borderColor: '#F277C6',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    height: 60,
    width: 220,
    alignItems: 'center',
    borderRadius: 15,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loginIcon: {
    height: 20,
    width: 20,
  },
  loginHeader: {
    fontSize: 30,
    textAlign: "center",
    margin: 25
  },
  loginText: {
    fontSize: 20,
    textAlign: "center",
    margin: 30
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 15,
  },

  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 20,
    margin: 10,
    padding: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapcontainer: {
    // ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginTop: 60,
  },
  modalButtonText: {
    textAlign: "center",
    color: "#F277C6",
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600"
  },
  modalClose: {
    flexDirection: "column-reverse",
    borderRadius: 23,
    borderColor: "#dadada",
    borderWidth: 2,
    backgroundColor: "#dadada",
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 30,
    marginHorizontal: 16
  },
  modalContainer: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 30,
    textAlign: "center",
    justifyContent: "center"
  },
  navigationFilename: {
    marginTop: 5,
  },
  neweventcontainer: {
    margin: 40,
    justifyContent: 'flex-start',
  },
  preferencesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  rightButtonContainer: {
    paddingRight: 5,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll',
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
  textInput: {
    height: 40,
    width: 250
  },
  titletext: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  tripLogRow: {
    flex: 1,
    width: 300,
    textAlign: 'center',
    borderColor: '#F277C6',
    borderWidth: 1,
    marginTop: 15,
    color: '#000000',
    borderRadius: 20,
    overflow: 'hidden',
  },
  welcomebuttonscontainer: {
    marginTop: 575,
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
  //jackie added for carousel view
  carousel: {
    flex: 1,
    // backgroundColor: '#141518',
  },
  item: {
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3,
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white',
    height: 200,
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: { color: 'white' },
  lowerContainer: {
    flex: 1,
    margin: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  contentText: {
    fontSize: 12,
  },
});
