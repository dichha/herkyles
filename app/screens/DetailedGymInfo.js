import React, { Component } from 'react'; 
import {  StyleSheet, ScrollView, View, Alert, Image, Dimensions, TouchableOpacity, TouchableHighlight, Navigator } from 'react-native'; 

import {Container} from '../components/Container';

//import Chart from 'react-native-chart';

import { Ionicons } from '@expo/vector-icons';
import AutoHeightImage from 'react-native-auto-height-image';
import { Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {firebaseApp} from '../../db/DbConfig';

const deviceWidth = Dimensions.get('window').width;


var gymInfo=[];

class DetailedGymInfo extends Component{
    static navigationOptions = {
        title: "Gym Info", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };

    constructor(props) {
        super(props);
    }
    render(){
        
        const { state, navigate } = this.props.navigation;
        console.log("Index: "+state.params.index)
        state.params.data.forEach(function(data){
            gymInfo.push(data);
        })
        
        var screen = [];

        return (
            <Container>
	            <Content>
	                <ScrollView scrollsToTop={true} ref={(ref) => this.myScroll = ref}>

                        <AutoHeightImage width={deviceWidth} source={{uri:gymInfo[0].child("image").val()}} />

                        <Text style={{textAlign: 'center', fontSize: 30}}>{'\n' + gymInfo[0].child("name").val()}</Text>

                        <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>{'\nHours'}</Text>

                        <Text style={{textAlign: 'center', fontSize: 15}}>{gymInfo[0].child("hours/open/weekdays").val()}</Text>

                        <Text style={{textAlign: 'center', fontSize: 15}}>{gymInfo[0].child("hours/open/weekends").val()}</Text>

                        <Text style={{textAlign: 'center', fontSize: 15}}>
                        {gymInfo[0].child("page").val()}</Text>

                    </ScrollView>
	            </Content>
            </Container>            
        );
    }
}

/******************STYLING******************/

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      margin: 20,
      marginTop: 100
    },
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        padding: 0,
        justifyContent: 'center',
      marginBottom: 20,
      shadowColor: '#303838',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      shadowOpacity: 0.35,
    },
    title:{
        
    }
  });

export default DetailedGymInfo; 