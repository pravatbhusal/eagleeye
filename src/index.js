import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Home from "./screens/home";
import Report from "./screens/report";
import Problems from "./screens/problems";
import Problem from "./screens/problem";

// create the stackNavigator that holds all the pages (Intents)
const Navigation = createStackNavigator({
  Home: {screen: Home},
  Report: {screen: Report},
  Problems: {screen: Problems},
  Problem: {screen: Problem}
},
{
  // create a padding to avoid overlapping the navbar of the device
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});

// export the Index class as a Component
export default class Index extends React.Component {
  render() {
    return (
      <Navigation />
    );
  }
}
