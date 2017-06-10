/*
  #!Custom Today's Widget
  To display groups with quick text
  todo:
    1. Bridge groups data from Main App.
    2. Build groups list.
    3. Create Group Message Compose Action
*/
import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';

class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onLayout(event) {
    const height = event.nativeEvent.layout.height;
    // this.getGroups();
    if (height == 110) {

      // widget is in compact mode
    }
    else if (height == 300) {
      // widget is in expanded mode
    }
  }
  render() {
    console.log('render');
    return (
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onLayout={this.onLayout.bind(this)}
      >
        <Text>
          Groups
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    marginLeft: 15,
  },
});

export default Widget;
