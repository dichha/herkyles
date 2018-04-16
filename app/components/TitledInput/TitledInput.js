import React from "react";
import {TextInput, View,Text} from "react-native";  
import PropTypes from "prop-types"; 
import styles from "./styles"; 

const TitledInput = ({label,placeholder,value, onChangeText, secureTextEntry}) => (
    <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
        <TextInput
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            style={styles.textInput}
        />

    </View>
);

TitledInput.propTypes = {
    label: PropTypes.string, 
    placeholder: PropTypes.string, 
    value: PropTypes.string, 
    onChangeText: PropTypes.func, 
    secureTextEntry: PropTypes.bool, 
};

export default TitledInput; 