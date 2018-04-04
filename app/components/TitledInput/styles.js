import EStyleSheet from 'react-native-extended-stylesheet'; 


export default EStyleSheet.create({
    container:{
        height: 45,
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        borderColor: '#D4D4D4',
        borderBottomWidth: 1, 
    }, 
    text:{ 
        fontSize: 12,
        color: '#7F7D7D',
        fontWeight: '200',
        flex: 1  
    }, 
    textInput:{
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        flex: 1,
        height: 40
    }
});