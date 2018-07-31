import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>My First React Native APP</Text>
        <Text style={styles.baseText}>It Works</Text>
        <TextInput
          style={{height: 80, width: 300}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
    fontWeight: '400',
    color: 'gray',
  },
  titleText: {
    fontFamily: 'monospace',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
