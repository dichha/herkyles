import React from "react"; 
import EStyleSheet from "react-native-extended-stylesheet"; 
//import RecOptions from './screens/RecOptions'; 
//import Home from "./screens/Home"; 
import HerkNav from "./screens/HerkNav"; 

EStyleSheet.build({
    $white: '#FFFFFF',
    $black: '#000000',
    $gold: '#facf33',
    $grey: '#4C4C4C',
    $faintGrey: '#7F7D7D',  
    $red: '#ff0000',
    $textInput: '#262626',
    $success: '#006600', 
    $border: '#E2E2E2', 
    $darkText: '#343434',
    $primaryBlue: '#4F6D7A',
    $primaryOrange: '#D57A66', 
    $primaryGreen: '#00BD9D', 
    $primaryPurple: '#9E768F',
});
//export default () => <Home/>;
console.disableYellowBox = true; 
export default () => <HerkNav/>;
// export default() => <RecOptions/>; 