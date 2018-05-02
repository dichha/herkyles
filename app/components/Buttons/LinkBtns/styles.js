import EStyleSheet from "react-native-extended-stylesheet"; 

export default EStyleSheet.create({
    container:{
        alignItems: "center",
        backgroundColor: "$grey",
        padding: 10,
        marginBottom: 10, 
        borderRadius: 10,
        width: 150,
    }, 
    text:{ 
        fontSize: 18, 
        fontWeight: "600", 
        color: "$gold",
        alignItems: 'center',
        textAlign: 'center',
    }, 
    button:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
});