import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

// const Scanner = ({text, onPress}) => (
//     <Text style={styles.text}>{text}</Text>
// );

Scanner.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
}

export default Scanner;

