import React from "react";
import {SafeAreaView, Text, Image, StyleSheet} from "react-native"

const NoDataScreen = ({caption})=>{
    return(
        <SafeAreaView style={styles.mainContainer}>
            <Image source={require('../../assets/images/noD.jpg')} style={styles.imageContiner}/>
            <Text style={styles.textContainer}>{caption}</Text>
        </SafeAreaView>
    )
}

export default NoDataScreen;

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    imageContiner:{
        width:200,
        height:200,
    },
    textContainer:{
        fontFamily:"Poppins-SemiBold",
        fontSize:16
    }
});