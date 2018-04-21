import React, { Component } from "react"; 
import { View, Text, AppRegistry, StyleSheet, TouchableOpacity, Linking, StatusBar} from "react-native"; 
import { StackNavigator } from "react-navigation"; 
 
import Container from "../components/Container/Container";

class QR extends Component {
    static navigationOptions = {
        title: "Home", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };

    render(){
        return (
            <Container>
                <StatusBar transclucent={false} barStyle="light-content"/>
                <Text style={{textAlign: 'center', fontSize: 15}}>QR Scanner</Text>
            </Container>
        );
    }
};

export default QR;