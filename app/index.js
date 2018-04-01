import React from 'react'; 
import EStyleSheet from 'react-native-extended-stylesheet'; 

//import Home from './screens/Home'; 
import HerkNav from './screens/HerkNav'; 

EStyleSheet.build({
    $white: '#FFFFFF',
    $black: '#000000',
    $gold: '#FFFF00',
    $grey: '#4C4C4C', 

});
//export default () => <Home/>;
export default () => <HerkNav/>;