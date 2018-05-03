import EStyleSheet from "react-native-extended-stylesheet"; 


export default EStyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    title:{ 
        textAlign: 'center', 
        fontSize: 20 
    }, 
    hours: {
        textAlign: 'center', 
        fontSize: 15
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        padding: 0,
        justifyContent: 'center',
        marginBottom: 30,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
    },
    coords: {
        textAlign: 'center', 
        fontSize: 15, 
        color:'blue'
    },
});