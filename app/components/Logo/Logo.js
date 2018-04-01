import React from 'react'; 
import {View, Image, Text} from 'react-native'; 
import styles from './styles';

const Logo = () => (
    <View style={styles.container}>
        <Image resizeMode="contain" style={styles.logo} source={require('./images/logo.png')}/>
        <Text style={styles.text}>Herkyles</Text>
    </View>
);

export default Logo; 