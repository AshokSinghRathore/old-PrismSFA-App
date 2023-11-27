import {View, Text,TextInput} from 'react-native';
import React from 'react';
import { ClientsStyles } from '../../assets/styling/clients';

const TextInputHeader = ({placeholder,textHeader,value,onChangeText,maxLen,keyBoardType, editable}) => {
  return (
    <>
      <Text style={ClientsStyles.modalFormHeaderTextStyle}>{textHeader}</Text>
      <TextInput
        placeholder={placeholder}
        maxLength={maxLen?maxLen:150}
        onChangeText={(e)=>onChangeText(e)}
        value={value}
        editable={editable}
        keyboardType={keyBoardType?keyBoardType:"default"}
        style={ClientsStyles.modalFormTextInput}
      />
    </>
  );
};

export default TextInputHeader;
