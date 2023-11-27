import {StyleSheet} from "react-native"
const styles = StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    backgroundContainer: {
      alignItems: "center",
      flex: 1
    },
    upperBoderLine: {
      borderBottomWidth: 0.5,
      borderBottomColor: 'grey',
    },
    chekBoxConatiner: {
      justifyContent: 'space-between',
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      margin: 8
  
    },
    optionButton:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
    },
    deleteButtonBackground:{
      backgroundColor:"#fa1702",
      margin:10,
      borderRadius:10
    },
    editButtonBackground:{
      backgroundColor:"#48f06f",
      margin:10,
      borderRadius:10,
      left:25
    },
    deleteButtonText:{
      color:"white",
      fontFamily:"Poppins-SemiBold",
      fontSize:14,
      margin:5
    },
    editButtonText:{
      color:"black",
      fontFamily:"Poppins-SemiBold",
      fontSize:14,
      margin:5,
      width:40,
      textAlign:"center"
    },
    dropDownContainer: {
      padding: 10,
      height: 50,
      borderWidth: 0.5,
      borderBottomColor: "grey",
      borderRadius: 10
    },
    chekBoxText: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
      color: "black"
    },
    leaveCard: {
      backgroundColor: "#e8e8e6",
      margin: 10,
      borderRadius: 10,
      flexDirection:"row",
      justifyContent:"space-between",
      alignContent: "stretch",
      padding: 12,
      elevation:1
  
    },
    leaveContainer:{
      backgroundColor:"#F7E9E9",
      margin:10,
      borderRadius:10 ,
    },
    headerContainer: {
      backgroundColor: "#fafaf7",
      marginHorizontal: 10,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: "stretch",
      padding: 12,
    },
    headerText: {
      fontSize: 18,
      fontFamily: "Poppins-Bold",
      color: "#232324"
    },
    cardText:{
      fontSize: 15,
      fontFamily: "Poppins-Bold",
      color: "#232324",
      textAlign:"center"
    }
  })

export default styles