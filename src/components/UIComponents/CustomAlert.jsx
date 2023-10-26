import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const CustomAlert = (props) => {
  return (
    <Modal
      transparent={true}
      visible={props.visible}
      animationType="slide"
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.alertTitle}>{props.title}</Text>
          <Text style={styles.alertMessage}>{props.message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={props.onCancel}
            >
              <Text style={styles.buttonText}>{props.cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={props.onConfirm}
            >
              <Text style={styles.buttonText}>{props.confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomAlert;
