import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { ClientsStyles } from '../../assets/styling/clients';
const DatePickerClients = ({value,placeHolder,headerText,onPress}) => {
    function formatedDate(){
      const date = value.getDate();
      const year = value.getFullYear();
      const month = value.getMonth()+1;
      return `${date}-${month}-${year}`
    }
  return (

    <>
      <Text style={ClientsStyles.modalFormHeaderTextStyle}>{headerText}</Text>
      <TouchableOpacity onPress={onPress} style={ClientsStyles.modalFormTextInput}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: value ? 'black' : 'grey',
            fontSize: 16,
          }}>
          {value ? formatedDate() : placeHolder}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default DatePickerClients;
