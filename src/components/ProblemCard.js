import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

class ProblemCard extends React.Component {
  render() {
    return(
      <TouchableOpacity activeOpacity={0.70} onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.problemCardTitle}>{this.props.title}</Text>
          <Text style={styles.problemCardLocation}>{this.props.city}</Text>
          <Image source={{uri: this.props.image}} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  }
}

// style sheet for the Problems Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: 200,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#D6D7DA'
  },
  problemCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#A9A9A9"
  },
  problemCardLocation: {
    fontSize: 12.5,
    fontWeight: "bold",
    color: "#A9A9A9"
  },
  image: {
    width: 200,
    height: 150
  }
});

export default ProblemCard;
