import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

class CodeScanner extends Component {
  static navigationOptions = {
    title: "Code Scanner", 
    headerStyle: {
        backgroundColor: "#000000",
    }, 
      headerTintColor: '#facf33',
  };

  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }    
  };

  handlePressUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => {
            Linking.openURL(this.state.lastScannedUrl),
            this.setState({ lastScannedUrl: null })
          },
        },
        { 
          text: 'No',
          onPress: () => { 
            this.setState({ lastScannedUrl: null })
          },
        },
      ],
      { cancellable: false }
    );
  };

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this.handleBarCodeRead}
                  style={{
                    height: 200,
                    width: 200,
                  }}
                />}

        {this.handlePressUrl()}

        <StatusBar hidden />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default CodeScanner;