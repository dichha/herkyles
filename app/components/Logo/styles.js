import EStyleSheet from 'react-native-extended-stylesheet'; 
import {Dimensions} from 'react-native';

const imageWidth = Dimensions.get('window').width/2;
export default EStyleSheet.create({
     
    container: {
        alignItems: 'center',
    }, 
    logo: {
        width: imageWidth,
        height: imageWidth,
    },
    text: {
        fontWeight: '600', 
        fontSize: 28, 
        letterSpacing: -0.5,
        marginTop: 5,
        marginBottom: 10, 
        color: '$black',
    }
});