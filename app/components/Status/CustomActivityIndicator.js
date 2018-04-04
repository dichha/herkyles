import React from 'react'; 
import {ActivityIndicator, StatusBar, View} from 'react-native'; 
import styles from './styles'; 

const CustomActivityIndicator = () => (
    <View style={styles.customActivityIndicator}> 
       <ActivityIndicator/>
        <StatusBar barStyle="default"/>
    </View>
); 

export default CustomActivityIndicator;