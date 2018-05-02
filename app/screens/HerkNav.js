import React, {Component} from "react"; 

import Home from "./Home";
import Login from "./Login";
import GymStats from "./GymStats";
import DetailedGymInfo from "./DetailedGymInfo";
import Welcome from "./Welcome";  
import AuthLoading from "./AuthLoading"; 

import {StackNavigator, SwitchNavigator} from "react-navigation"; 

const AppStack = StackNavigator({ 
    Home: {screen: Home}, 
    Login: {screen: Login}, 
    GymStats: {screen: GymStats},
    DetailedGymInfo: {screen: DetailedGymInfo},

}); 

const AuthStack = StackNavigator({
    Welcome: {screen: Welcome}
}); 
// wrapping AppStack & AuthStack in SwitchNavigator so that when a user logs in they aren't shown previously logged in fill-in-page in navigation. 

export default SwitchNavigator(
    {
        AuthLoading: AuthLoading, 
        App: AppStack, 
        Auth: AuthStack, 
    }, 
    {
        initialRouteName: "AuthLoading", 
    }
); 