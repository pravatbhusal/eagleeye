import React from "react";
import {serverURL} from "../../App";
import {StyleSheet, Alert, ScrollView, Text, TextInput, View, TouchableOpacity} from "react-native";
import ProblemCard from "../components/ProblemCard";

class Problems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      problemCardList: <Text style={{color: "#2980CD"}}>Connecting to server...</Text>
    }
  }
  // stack navigator"s page settings
  static navigationOptions = {
  	header: null,
    title: "Problems"
  }
  componentDidMount() {
    this.getProblemsList(this.state.city);
  }
  // get list of problems based on parameters
  async getProblemsList(city = undefined) {
    if(city) {
      // create the form data
      let formData = new FormData();
      formData.append("city", city);

      // send an HTTP Request to the server to handle the form data
      await fetch(serverURL + "/mobile/getProblems.php", {
        method: "POST",
        body: formData,
        header: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }).then((resolved) => {
        resolved.json().then((data) => {
          // map the resultData to the problems list data received from the server
          let resultData = data.map((item, i) => {
            var {navigate} = this.props.navigation;
            return (
              <ProblemCard
                key={i}
                id={item.id}
                title={item.title}
                city={item.city}
                image={item.image}
                onPress={() => navigate("Problem", {id: item.id})}
              />);
          });
          this.setState({problemCardList: resultData})
        });
      }).catch((error) => {
        Alert.alert("Oh no!", error.message);
        return;
      });
    } else {
      // send an HTTP Request to the server to get the most recent problems
      await fetch(serverURL + "/mobile/getProblems.php").then((resolved) => {
        resolved.json().then((data) => {
          // map the resultData to the problems list data received from the server
          let resultData = data.map((item, i) => {
            var {navigate} = this.props.navigation;
            return (
              <ProblemCard
                key={i}
                id={item.id}
                title={item.title}
                city={item.city}
                image={item.image}
                onPress={() => navigate("Problem", {id: item.id})}
              />);
          });
          this.setState({problemCardList: resultData})
        });
      }).catch((error) => {
        Alert.alert("Oh no!", error.message);
        return;
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.problemsInputContainer}>
          <TextInput
            placeholder="City"
            style={styles.problemsTextInput}
            onChangeText={(text) => this.setState({city: text})}
          >
          </TextInput>
          <TouchableOpacity
            style={styles.searchButton}
            activeOpacity={0.70}
            onPress = {() => this.getProblemsList(this.state.city)}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.problemsScrollView}>
          {this.state.problemCardList}
        </ScrollView>
      </View>
    );
  }
}

// style sheet for the Problems Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  problemsInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  problemsTextInput: {
    height: 62.5,
    width: "32.5%"
  },
  searchButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12.5,
    marginTop: 7.5,
    backgroundColor: "#F6F6F8"
  },
  searchButtonText: {
    fontSize: 12.5,
    fontWeight: "bold",
    color: "#A9A9A9"
  },
  problemsScrollView: {
    width: "80%"
  }
});

export default Problems;
