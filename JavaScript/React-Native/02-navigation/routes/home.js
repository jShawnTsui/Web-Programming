import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };
    
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text className="TextClass">Home Screen</Text>
          <Button
            title="Go to Details"
            onPress={() => {
                this.props.navigation.navigate('Details', {
                    itemId: 86,
                    otherParam: 'My String!'
                });
            }}
          />
        </View>
      );
    }
  }

export default HomeScreen;