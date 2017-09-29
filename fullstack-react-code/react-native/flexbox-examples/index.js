/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: '#e76e63',
    margin: 10,
  }
});

export default class FlexboxExamples extends Component {
  render() {
    return (
      <View styles={styles.container}>
        <View style={[styles.box, {flex: 1}]}></View>
        <View style={[styles.box, {flex: 2, alignSelf: 'flex-end'}]}></View>
        <View style={[styles.box, {flex: 1}]}></View>
      </View>
    );
  }
}

AppRegistry.registerComponent('FlexboxExamples', () => FlexboxExamples);
