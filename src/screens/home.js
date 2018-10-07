import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";

class Home extends React.Component {
  // stack navigator's page settings
  static navigationOptions = {
  	header: null,
    title: "Home"
  }
  render() {
    // stack navigator's navigation object
    var {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.reportButton}
          activeOpacity={0.70}
          onPress = {() => navigate("Report")}
        >
          <Text style={styles.reportButtonText}>
            <Icon name="flag" size={25}/>
            {" "}
            Report
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewButton}
          activeOpacity={0.70}
          onPress = {() => navigate("Problems")}
        >
          <Text style={styles.viewButtonText}>
            <Icon name="list" size={25}/>
            {" "}
            View
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// style sheet for the Home Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF"
  },
  reportButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2980CD"
  },
  viewButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F8"
  },
  reportButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#F0F0F0"
  },
  viewButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#A9A9A9"
  }
});

export default Home;
