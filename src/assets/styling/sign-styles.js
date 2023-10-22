import { colors } from "../../constants/colors";

const { StyleSheet } = require("react-native");

export const SignInStyles = StyleSheet.create({
    center:{

        alignItems:"center"
    },
    card:{
        width:"80%",
        height:"45%",
        backgroundColor:colors.prime1,
        borderRadius:10,
        padding:10
    },
    textHead:{
        color:"white",
        fontSize:20.,
        textAlign:"center",
        marginTop:10
    },
    texTitle:{
        color:"white",
        fontSize:14.,
        textAlign:"center",
        marginTop:10
    },
    subHeaderText:{
        color:"white",
        fontSize:12,
        
    },
    subViewStyles:{
        margin:10,
        marginTop:15
    },
    textInput:{
        fontSize:16,
        backgroundColor:"white",
        color:"black",
        height:40,
        borderRadius:10,
        paddingVertical:1,
        paddingLeft:10
    },
    signInButtonContainer:{
        backgroundColor:"white",
        width:90,
        alignSelf:"center",
        borderRadius:10,
        padding:10
    }

})