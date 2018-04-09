import React from "react"; 
import {View,Text} from "react-native"; 
import styles from "./styles";
import PropTypes from "prop-types"; 

const ErrorStatus = ({text}) => (
    <View>
        <Text style={styles.error}>{text}</Text>
    </View>
);

ErrorStatus.propTypes = {
<<<<<<< HEAD
    text: PropTypes.string,  
}
=======
    text: PropTypes.string, 
    
};
>>>>>>> 415384f79fd7cadc19fdfec7f49fd31b598e83ea

export default ErrorStatus; 