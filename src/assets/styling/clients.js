import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export const ClientsStyles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: 'white',
    elevation: 7,
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    padding: 10,
    height: 170,
    borderRadius: 10,
    shadowColor: colors.prime1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  subCard: {
    borderRightWidth: 0.5,
    borderRightColor: 'grey',
    // marginVertical: 5,
    paddingRight: 10,
    justifyContent:"center"
  },
  subCardText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    fontFamily:"Poppins-SemiBold"
  },
  subCard2: {
    padding: 10,

  },
  subCard2Text: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    fontFamily:"Poppins-Mediun"
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



