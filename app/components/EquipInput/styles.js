import EStyleSheet from "react-native-extended-stylesheet"; 


export default EStyleSheet.create({
    container:{
        height: 45,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        borderColor: '#D4D4D4',
        borderBottomWidth: 1, 
        
    }, 
    text:{ 
        fontSize: 16,
        color: '$faintGrey',
        fontWeight: '400',
        flex: 1  
    }, 
    textInput:{
        
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '$textInput',
        fontSize: 18,
        fontWeight: "200",
        flex: 1,
        height: 40
    }
});