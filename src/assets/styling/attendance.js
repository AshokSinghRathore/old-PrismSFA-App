import {StyleSheet} from 'react-native';

const attendanceStyle = StyleSheet.create({
  buttonStyle: {
    width: 350,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    marginLeft:10,
    marginTop:5,
  },
  headerContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  mainContainer: {
    margin: 15,
    borderWidth: 2,
    borderColor: '#08ABF9',
paddingHorizontal:10,
paddingVertical:10,
    borderRadius: 10,
  },
  dateText: {
    color: '#08ABF9',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
  },
  timeText: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
  },
});

export default attendanceStyle;
