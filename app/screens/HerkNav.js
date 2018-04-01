import React, {Component} from 'react'; 

import Home from './Home';
import Login from './Login';
import GymStats from './GymStats'; 

import {StackNavigator} from 'react-navigation'; 

const RootStack = StackNavigator(
    {
        Home: {screen: Home}, 
        Login: {screen: Login}, 
        GymStats: {screen: GymStats}, 

    },
);

class HerkNav extends Component{
    render(){
        return <RootStack/>
    }
}

export default HerkNav; 

