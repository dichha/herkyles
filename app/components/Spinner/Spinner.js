import React from 'react'; 
import {View, Text, ActivityIndicator} from 'react-native'; 
import PropTypes from 'prop-types'; 
import styles from './styles'; 

const Spinner = () => (
    <View style={styles.horizontal}> 
        <ActivityIndicator size='small' color='#00ff00' />
    </View>
); 

export default Spinner; 

