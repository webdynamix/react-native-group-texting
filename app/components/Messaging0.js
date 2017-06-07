/*
  placeholder, nothing to see here
*/
import React, { PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';

class Messaging extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Nothing to see here
        </Text>
      </View>
    );
  }
}

Messaging.propTypes = {
  uri: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    uri: state.app.dashboardUri
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default connect(
  mapStateToProps,
)(Messaging);
