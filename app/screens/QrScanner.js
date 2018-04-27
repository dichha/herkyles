import React, { Component } from "react"; 
import { View, Text, AppRegistry, StyleSheet, TouchableOpacity, Linking, StatusBar} from "react-native"; 
import { StackNavigator } from "react-navigation"; 
 
import Container from "../components/Container/Container";
//import RNCamera from 'react-native-camera';
//import QRCodeScanner from 'react-native-qrcode-scanner';

class QrScanner extends Component {
    static navigationOptions = {
        title: "QR Scanner", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };

    render(){
        return (
            <Container>
                <Text style={{textAlign: 'center', fontSize: 15}}>QR Scanner</Text>
            </Container>
        );
    }

//     onSuccess(e) {
//         Linking
//         .openURL(e.data)
//         .catch(err => console.error('An error occurred', err));
//     }

//     render(){
//         return (
//             <QRCodeScanner
//                 onRead={this.onSuccess.bind(this)}
//                 topContent={
//                     <Text style={{textAlign: 'center', fontSize: 15}}>
//                         Scan the QR code.
//                     </Text>
//                 }
//                 bottomContent={
//                     <Text style={{textAlign: 'center', fontSize: 15}}>
//                         OK. Got it!
//                     </Text>
//                 }
//             />
//         );
//     }
}

export default QrScanner;

// AppRegistry.registerComponent('default', () => QrScanner);