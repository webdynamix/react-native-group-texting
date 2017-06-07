/*
  #!Vimeo Video Gallery
  Webview that takes a URI prop from store
*/
import React, { PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, WebView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const parseString  = require('react-native-xml2js').parseString;
const WEBVIEW_REF = 'webview';

class Media extends Component {
  constructor(props) {
      super(props);

      this.state = {
        canGoBack: true,
      };

      this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          <View style={styles.topNav}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={this.onBack.bind(this)}
              >
              <Icon
                name="angle-left"
                type="font-awesome"
                size={15}
                color="black"
                style={styles.backIcon}
              />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          source={{ url: this.props.uri }}
          onNavigationStateChange={this.onNavigationStateChange}
          style={styles.webview}
        />
      </View>
    )
  }
}

Media.propTypes = {
  uri: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    uri: state.app.videosUri
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    marginTop: 0,
  },
  topbar: {
    height: 17,
    marginTop: 20,
    backgroundColor: 'white',
  },
  topNav: {
    flex: 1,
    flexDirection: 'row',
  },
  backButton: {
    flex: 1,
    flexDirection: 'row',
  },
  backIcon: {
    marginLeft: 10,
  },
  backText: {
    marginLeft: 5,
    marginTop: 2,
    color: '#333',
    fontWeight: '400',
    fontFamily: 'Helvetica neue',
    fontSize: 10,
  }
});

export default connect(
  mapStateToProps,
)(Media);
