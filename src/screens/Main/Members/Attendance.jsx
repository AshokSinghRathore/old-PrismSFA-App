import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Alert,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {backgroundStyles} from '../../../assets/styling/backgroundstyles';
import attendanceStyle from '../../../assets/styling/attendance';
import {useSelector} from 'react-redux';
import {getLocation} from '../../../functions/fetch-location';
import {
  getAttendance,
  markAttendanceCheckIn,
  markAttendanceCheckOut,
} from '../../../api/attendance/attendance-api';
import Toast from 'react-native-simple-toast';
import ModalLoading from '../../../components/UIComponents/ModalLoading';
import { getDateISOFormat } from '../../../helper/date-function';
const Attendance = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [coords, setCoords] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [attendanceId,setAttendanceId] = useState(null)
  const Cred = useSelector(state => state.Cred);
  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  async function get() {
    setloading(true);
    try {
      const coords = await getLocation();

      setCoords(coords);
      const resp = await getAttendance(
        Cred.sub,
        Cred.token,
        getDateISOFormat(currentTime,false),
        getDateISOFormat(currentTime,true),
      );
      if (resp){
        setAttendanceId(resp.id);
        setIsCheckedIn(resp.checkIn?true:false)
        setIsCheckedOut(resp.checkOut?true:false)
      }
      else {
        setIsCheckedIn(false)
        setIsCheckedOut(false)
      }
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Something went wrong',
        "Can't Fetch Data ( " + error.message + ')',
      );
    }
    setloading(false);
  }
useFocusEffect(
  useCallback(()=>{
    get()
  },[])
)
  function getCurrentTime(now) {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    return timeString;
  }

  async function checkIn() {
    setloading(true);
    try {
      const data = {

        memberId: Cred.sub,
        checkIn: currentTime,
        checkInLocation: {
          langitude: coords.latitude,
          latitude: coords.longitude,
        },
      };
      const resp = await markAttendanceCheckIn(Cred.token, data);
      setAttendanceId(resp.id)
      setIsCheckedIn(true);
    } catch (error) {
      Alert.alert(
        'Something went wrong',
        "Can't Mark Attendance ( " + error.message + ')',
      );
      
    }
    setloading(false);
  }
  async function checkOut() {
    setloading(true);
    try {
      const data = {
        memberId: Cred.sub,
        checkOut: currentTime,
        checkOutLocation: {
          langitude: coords.latitude,
          latitude: coords.longitude,
        },
      };
      const resp = await markAttendanceCheckOut(Cred.token, data,attendanceId);
      setIsCheckedOut(true);
    } catch (error) {
      setloading(false)
      Alert.alert(
        'Something went wrong',
        "Can't Mark Attendance ( " + error.message + ')',
      );
    }
    setloading(false);
  }

  return (
    <SafeAreaView style={[backgroundStyles.whiteBackground]}>
      <View style={[attendanceStyle.mainContainer]}>
        <Text style={attendanceStyle.dateText}>Today</Text>
        <Text style={attendanceStyle.timeText}>
          {getCurrentTime(currentTime)}
        </Text>
        {isCheckedOut ? (
          <TouchableOpacity
            onPress={() =>
              Toast.show(
                'Your Attendance Has Been Already Marked For Today',
                Toast.LONG,
              )
            }
            style={[
              attendanceStyle.buttonStyle,
              {backgroundColor:"grey"},
            ]}>
            <Text style={attendanceStyle.buttonTextStyle}>
             Attendance Already Marked For Today
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (!isCheckedIn) {
                checkIn();
              } else {
                checkOut();
              }
            }}
            style={[
              attendanceStyle.buttonStyle,
              {backgroundColor: isCheckedIn ? '#FF4B57' : '#08ABF9'},
            ]}>
            <MaterialCommunityIcons
              name="line-scan"
              size={28}
              style={{alignSelf: 'center'}}
              color={'white'}
            />
            <Text style={attendanceStyle.buttonTextStyle}>
              {isCheckedIn ? 'Check Out' : 'Check In'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ModalLoading isVisible={loading} message={'Please wait'} />
    </SafeAreaView>
  );
};

export default Attendance;
