import {StyleSheet} from "react-native"
const expenseStyles = StyleSheet.create({

    expenseCard: {
      backgroundColor: '#F7E9E9',
      justifyContent: 'center',
      margin: 10,
      borderRadius: 10,
      padding: 10,
      elevation:1
    },
    expenseAmount: {
      color: 'black',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18,
      // textAlign:"right"
    },
    expenseDate: {
      color: '#bcbcbc',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
    },
    expenseRemark: {
      color: 'black',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
    },
    expenseName: {
      color: 'black',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18,
      textAlign: 'right',
    },
    expenseType: {
      color: '#444444',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 15,
    },
    belowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    upperContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
  });
export default expenseStyles;