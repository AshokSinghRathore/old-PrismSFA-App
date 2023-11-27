import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export const ClientsStyles = StyleSheet.create({
  card: {
    margin:10,
 borderRadius:10,
 elevation:5,
    padding:10,
    flexDirection:"row",
    backgroundColor:"wheat"
  },
  imageContainer:{
    flexDirection:"column",
    padding:3
  },
  clientInfo:{
    marginLeft:"10%",
    justifyContent:"center"
  },
  image:{
    height:100,
    width:100,
    borderRadius:50 
  },
  buttonStyle: {
    backgroundColor: '#494D7E',
    width: 70,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  buttonTextStyle: {
    fontSize: 16,
    color: 'red',
  },
  modalStyle:{
    justifyContent: 'flex-end', 
    margin: 0,
  },
  modalContainerStyle:{
    backgroundColor: 'white',
    height: '90%', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeaderText:{
    fontFamily:"Poppins-Bold",
    fontSize:20,
    color:"black"
  }
  ,
  modalFormContainerStyle:{
    paddingTop:10,
    paddingHorizontal:5
  },
  modalFormTextInput:{
      borderWidth:0.5,
      borderRadius:5,
      borderColor:"grey",
      color:"black",
      fontSize:16,
      padding:10,
      marginTop:5,
      fontFamily:"Poppins-SemiBold"
  },
  modalFormHeaderTextStyle:{
    fontSize:18,
    color:"black",
    fontFamily:"Poppins-SemiBold",
    marginTop:10

  },
  addButtonContainerStyle:{
    alignSelf:"center",
    marginTop:10,
    backgroundColor:colors.prime1,
    width:100,
    padding:10,
    borderRadius:10
  },
  addButtonText:{
    textAlign:"center",
    fontFamily:"Poppins-SemiBold",
    color:"white",


  },
  error: {
    fontSize: 13,
    color: "red",
    paddingTop: 8,
  },
  
});



