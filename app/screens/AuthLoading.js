import React, {Component} from 'react';
import { StyleSheet, Button, Text, View, AsyncStorage, ActivityIndicator, StatusBar } from 'react-native';
import  CustomActivityIndicator  from '../components/Status/CustomActivityIndicator';



class AuthLoading extends React.Component{
  constructor(props){
    super(props);
    this._bootstrapAsync();
  }
  // Fetch the token from storage then navigate to appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(AsyncStorage.getAllKeys());
    // This will switch to the App screen or Auth screen and this loading screen will be unmounted and thrown away

    console.log("userToken: " + userToken);
    this.props.navigation.navigate(userToken? 'Auth': 'App');
  }
  // render any loading content that you like here
  render(){
    return (
      <CustomActivityIndicator/>
    );
  }
};

export default AuthLoading; 
  