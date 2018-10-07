import React from 'react';
import {serverURL} from "../../App";
import {StyleSheet, Alert, ScrollView, Dimensions, Text, View, Image} from 'react-native';
import {MapView} from 'expo';
import Carousel from 'simple-carousel-react-native';

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        longitude: -97.73675,
        latitude: 30.28265
      },
      problemTitle: "Connecting to server...",
      briefExplanation: "Connecting to server...",
      otherInformation: "Connecting to server...",
      city: "Loading...",
      pictures: <View><Text>Connecting to server...</Text></View>,
      replies: <Text style={styles.replyText}>Connecting to Server...</Text>
    }
  }
  // stack navigator"s page settings
  static navigationOptions = {
  	header: null,
    title: "Problem"
  }
  componentWillMount() {
    this.getProblemData();
  }
  async getProblemData() {
    // grab the problem id passed from the navigation
    var {params} = this.props.navigation.state;
    const id = params.id;

    // create a form to grab information on the problem based on its id
    let formData = new FormData();
    formData.append("id", id);

    // send an HTTP Request to the server to handle the form data
    await fetch(serverURL + "/mobile/getProblem.php", {
      method: "POST",
      body: formData,
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }).then((resolved) => {
      resolved.json().then((data) => {
          this.setState({problemTitle: data.problemTitle});
          this.setState({briefExplanation: data.briefExplanation});
          this.setState({otherInformation: data.otherInformation});
          this.setState({city: data.city});
          this.setState({pictures: data.pictures})
          let locationData = {...this.state.location};
          let location = JSON.parse(data.location);
          locationData.longitude = location.longitude;
          locationData.latitude = location.latitude;
          this.setState({location: locationData});

          // map the replies data received from the server
          let replyData = data.replies.map((item, i) => {
            let index = i+1;
            return (
              <Text
                key={i}
                style={styles.replyText}>Reply #{index}: {item}
              </Text>
            );
          });
          this.setState({replies: replyData});
      });
    }).catch((error) => {
      Alert.alert("Oh no!", error.message);
      return;
    });
  }
  render() {
    return(
      <View style={styles.container}>
        <MapView
          style={styles.mapContainer}
          region={{
            longitude: this.state.location.longitude,
            latitude: this.state.location.latitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Marker
            coordinate={{longitude: this.state.location.longitude, latitude: this.state.location.latitude}}
            title={this.state.problemTitle}
            description={this.state.briefExplanation}
          />
        </MapView>
      <Carousel style={styles.pictureCarousel} color="#2980CD" height="25%">
        <View>
          <Image
            style={styles.picture}
              source={{uri: serverURL + this.state.pictures + "/image1.jpg"}}
          />
        </View>
        <View>
          <Image
            style={styles.picture}
              source={{uri: serverURL + this.state.pictures + "/image2.jpg"}}
          />
        </View>
        <View>
          <Image
            style={styles.picture}
            source={{uri: serverURL + this.state.pictures + "/image3.jpg"}}
          />
        </View>
      </Carousel>
      <View style={styles.informationContainer}>
        <Text style={styles.titleText}>{this.state.problemTitle}</Text>
        <Text style={styles.briefExplanationText}>{this.state.briefExplanation}</Text>
        <Text style={styles.othersText}>{this.state.otherInformation}</Text>
      </View>
      <ScrollView style={styles.repliesScrollView}>
        <Text style={styles.replyTitleText}>
          Replies from the city of {this.state.city}
        </Text>
        {this.state.replies}
      </ScrollView>
      </View>
    );
  }
}

// style sheet for the Problem Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  mapContainer: {
    flex: 1,
    height: Dimensions.get('window').height / 4, // about 25%
    width: Dimensions.get('window').width // full width available
  },
  informationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  pictureCarousel: {
    flex: 1
  },
  picture: {
    height: Dimensions.get('window').height / 4, // about 25% (the size of carousel)
    width: Dimensions.get('window').width
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#A9A9A9"
  },
  briefExplanationText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#A9A9A9"
  },
  othersText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#A9A9A9"
  },
  repliesScrollView: {
    flex: 1
  },
  replyTitleText: {
    alignSelf: "center",
    fontSize: 13.5,
    fontWeight: "bold",
    color: "#A9A9A9"
  },
  replyText: {
    alignSelf: "center",
    fontSize: 10,
    fontWeight: "bold",
    color: "#A9A9A9"
  }
});

export default Problem;
