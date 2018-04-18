import React, {Component} from "react"; 

import Home from './Home';
import Login from './Login';
import GymStats from './GymStats'; 
import Welcome from './Welcome';  
import AuthLoading from './AuthLoading'; 
import Signup from './Signup';
import QrScanner from './QrScanner';

import {StackNavigator, SwitchNavigator} from "react-navigation"; 

const AppStack = StackNavigator({ 
    Home: {screen: Home}, 
    Login: {screen: Login}, 
    GymStats: {screen: GymStats},
    Signup: {screen: Signup},
    QrScanner: {screen: QrScanner},
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
/*
const RootStack = StackNavigator(
    {
        Home: {screen: Home}, 
        Login: {screen: Login}, 
        GymStats: {screen: GymStats},
        Welcome: {screen: Welcome},  

    },
);

class HerkNav extends Component{
    render(){
        return <RootStack/>
    }
}

export default HerkNav; 
*/
