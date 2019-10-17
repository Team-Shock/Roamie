import React from 'react';
import { Text, TextInput, View, TouchableHighlight, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../Styles/styles';
import { connect } from 'react-redux';
import { submitFeedback } from '../store/currentTrip';

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: { feedbackText: '', liked: true },
      modalVisible: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onSubmit() {
    console.log('LOCAL STATE FEEDBACK IN ONSUBMIT', this.state.feedback);
    this.setModalVisible({ modalVisible: false });
    this.props.submitFeedback(
      this.props.currentPlaceId,
      this.props.currentTripId,
      this.state.feedback
    );
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          style={{ marginTop: 50 }}
        >
          <View style={styles.loginContainer}>
            <Text style={styles.loginHeader}>
              How was {this.props.item.name}?
            </Text>
            <TextInput
              multiline={true}
              style={{ height: 250, width: 250, margin: 15 }}
              placeholder="Tell Roamie what you thought, or make a note about anything memorable about this spot"
              onChangeText={text =>
                this.setState({
                  feedback: { ...this.state.feedback, feedbackText: text },
                })
              }
              value={this.state.feedback.feedbackText}
            />

            {this.state.feedback.liked ? (
              <Text style={styles.loginText}>I like this place</Text>
            ) : (
              <Text style={styles.loginText}>I dislike this place</Text>
            )}
            <View style={styles.loginButtonContainer}>
              <Icon.Button
                name="thumbs-up"
                backgroundColor="#ffffff"
                color="#F277C6"
                onPress={() =>
                  this.setState({
                    feedback: { ...this.state.feedback, liked: true },
                  })
                }
              >
                I liked this place
              </Icon.Button>
            </View>
            <View style={styles.loginButtonContainer}>
              <Icon.Button
                name="thumbs-down"
                backgroundColor="#ffffff"
                color="#F277C6"
                onPress={() => {
                  this.setState({
                    feedback: { ...this.state.feedback, liked: false },
                  });
                }}
              >
                I disliked this place
              </Icon.Button>
            </View>

            <View style={styles.loginButtonContainer}>
              <Icon.Button
                name="pencil"
                backgroundColor="#ffffff"
                color="#F277C6"
                onPress={() => {
                  this.onSubmit();
                }}
              >
                Submit Feedback
              </Icon.Button>
            </View>
          </View>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            style={styles.modalClose}
          >
            <Text>Return to Trip</Text>
          </TouchableHighlight>
        </Modal>
        <View style={{ textAlign: 'center' }}>
          <Icon.Button
            name="pencil"
            backgroundColor="rgba(255, 255, 255, 1)"
            color="#F277C6"
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            Submit Feedback and Continue
          </Icon.Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentTripId: state.currentTrip.trip.id,
  currentPlaceId: state.currentTrip.lastPlaceId,
});

const mapDispatchToProps = dispatch => ({
  submitFeedback: (placeId, tripId, feedback) =>
    dispatch(submitFeedback(placeId, tripId, feedback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackForm);
