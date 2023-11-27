import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import Loading from '../../../components/UIComponents/Loading';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../constants/colors';
import Modal from 'react-native-modal';
import DatePickerClients from '../../../components/Clients/DatePickerClients';
import TextInputHeader from '../../../components/Clients/TextInputHeader';
import {ClientsStyles} from '../../../assets/styling/clients';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {
  createLeave,
  deleteLeave,
  getAllLeaves,
  getLeaveTypes,
} from '../../../api/member/members-leave-api';
import CheckBox from '@react-native-community/checkbox';
import {Dropdown} from 'react-native-element-dropdown';
import {backgroundStyles} from '../../../assets/styling/backgroundstyles';
import styles from '../../../assets/styling/leave-styles';
import ModalLoading from '../../../components/UIComponents/ModalLoading';
import NoDataScreen from '../../../components/UIComponents/NoDataScreen';
import OnEnd from '../../../components/UIComponents/OnEnd';
const AllLeaves = () => {
  const Cred = useSelector(state => state.Cred);
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState();
  const [leaveId, setLeaveId] = useState(null);
  const [endDate, setEndDtate] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allLeaves, setAllLeaves] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [isHalfDay, setHalfDay] = useState(false);
  const [startDate, setstartDate] = useState(null);
  const [allLeaveType, setAllLeaveType] = useState([]);
  const [isEditModal, setIsEditModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [paginationData, setPaginationData] = useState({});
  const [isEndDateOpen, setisEndDateOpen] = useState(false);
  const [isStartDateOpen, setisStartDateOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerRight: ({}) => {
        return (
          <Ionicons
            name="add"
            size={25}
            color={colors.prime1}
            style={{padding: 10}}
            onPress={openModal}
          />
        );
      },
    });
    fetchAllLeaves();
    getAllLeaveTypes();
  }, []);

  function getDateFormat(currentDate) {
    currentDate = new Date(currentDate);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  const getAllLeaveTypes = async () => {
    setLoading(true);
    try {
      const resp = await getLeaveTypes(Cred.token);
      setAllLeaveType(resp);
    } catch (error) {
      Alert.alert('Something went wrong', 'please try again later');
    }
    setLoading(false);
  };
  const deleteAppliedLeave = async item => {
    setButtonLoader(true);
    try {
      const res = await deleteLeave(Cred.token, item.id);
      let newLeaveArray = [...allLeaves];
      newLeaveArray = newLeaveArray.filter(e => e.id != item.id);
      setAllLeaves(newLeaveArray);
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong', 'Please try again later');
    }
    setButtonLoader(false);
  };
  const fetchAllLeaves = async () => {
    setLoading(true);
    try {
      const resp = await getAllLeaves(Cred.token, Cred.sub, 0);
      setPage(0);
      setPaginationData(resp.page);
      setAllLeaves(resp.data);
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again later');
      console.log(error);
    }
    setLoading(false);
  };
  const addLeave = async () => {
    if (
      !selectedLeaveType ||
      !startDate ||
      !endDate ||
      !reason ||
      !duration
    ) {
      Alert.alert('Oops', 'Please complete all fields');
      return;
    }
    setButtonLoader(true);
    try {
      const payload = {
        employeeId: Cred.sub,
        leaveType: selectedLeaveType.id,
        startAt: startDate,
        endAt: endDate,
        reason: reason,
        status: 0,
        duration: duration,
        remarks: "",
        halfDay: isHalfDay,
      };
      const resp = await createLeave(Cred.token, payload);
      setAllLeaves([...allLeaves, resp]);
      setIsModal(false);
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again later');
      console.log(error);
    }
    setButtonLoader(false);
  };
  async function updateLeave() {
    setButtonLoader(true);
    try {
      const payload = {
        employeeId: Cred.sub,
        leaveType: selectedLeaveType.id,
        startAt: startDate,
        endAt: endDate,
        reason: reason,
        status: 0,
        duration: duration,
        remarks: "",
        halfDay: isHalfDay,
        id: leaveId,
      };
      const resp = await createLeave(Cred.token, payload);
      let newAllLeaves = [...allLeaves];
      newAllLeaves = newAllLeaves.map(e => (e.id == leaveId ? payload : e));
      setAllLeaves(newAllLeaves);
      closeEditModal();
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again later');
      console.log(error);
    }
    setButtonLoader(false);
  }
  const closeModal = async () => {
    setIsModal(false);
  };
  const closeEditModal = async () => {
    setIsEditModal(false);
    setSelectedLeaveType(null);
    setDuration('');
    setReason('');
    setEndDtate(null);
    setstartDate(null);
    setLeaveId(null);
    setHalfDay(false);
  };
  function startAtOpenDatePicker() {
    setisStartDateOpen(true);
  }
  function endAtOpenDatePicker() {
    setisEndDateOpen(true);
  }
  function startDateCloseDatePicker() {
    setisStartDateOpen(false);
  }
  function endDateCloseDatePicker() {
    setisEndDateOpen(false);
  }
  function startDateCloseAndSetDatePicker(e) {
    setisStartDateOpen(false);
    setstartDate(e);
  }
  function endDateCloseAndSetDatePicker(e) {
    setisEndDateOpen(false);
    setEndDtate(e);
  }
  function openModal() {
    setIsModal(true);
  }
  function openEditModal(item) {
    const leaveTypeValue = allLeaveType.find(e => e.id == item.leaveType);
    console.log(item)
    setSelectedLeaveType(leaveTypeValue);
    setDuration(item.duration.toString());
    setReason(item.reason);
    setEndDtate(item.endAt ? new Date(item.endAt) : new Date());
    setstartDate(item.startAt ? new Date(item.startAt) : new Date());
    setHalfDay(item.halfDay);
    setLeaveId(item.id);
    setIsEditModal(true);
  }
  
  async function onEndReach() {
    setLoadMore(true);
    try {
      const resp = await getAllLeaves(Cred.token, Cred.sub, page + 1);
      setPage(1 + page);
      setPaginationData(resp.page);
      console.log(resp.data)
      if (resp.data.length>0){

        setAllLeaves([...allLeaves,resp.data]);
      }
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again later');
      console.log(error);
    }
    setLoadMore(false);
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading ? (
        <Loading text={'Please wait while we fetching your details...'} />
      ) : (
        <View style={[backgroundStyles.whiteBackground]}>
          <DatePicker
            open={isStartDateOpen}
            onCancel={startDateCloseDatePicker}
            modal
            mode="date"
            onConfirm={e => startDateCloseAndSetDatePicker(e)}
            date={startDate ? startDate : new Date()}
          />
          <DatePicker
            open={isEndDateOpen}
            onCancel={endDateCloseDatePicker}
            modal
            mode="date"
            onConfirm={e => endDateCloseAndSetDatePicker(e)}
            date={endDate ? endDate : new Date()}
          />
          {allLeaves.length <= 0 ? (
            <NoDataScreen caption={"You haven't created any leave"} />
          ) : (
            <>
              <FlatList
                data={allLeaves}
                keyExtractor={item => {
                  return item.id;
                }}
                ListFooterComponent={() => {
                  return (
                    <>
                      {page < paginationData.totalPages-1 && (
                       <OnEnd loadMore={loadMore} onEndReach={onEndReach}/>
                      )}
                    </>
                  );
                }}
                renderItem={({item}) => {
                  return (
                    <View style={styles.leaveContainer}>
                      <View style={styles.leaveCard}>
                        <Text style={styles.cardText}>
                          {getDateFormat(item.startAt)}
                        </Text>
                        <Text style={styles.cardText}>To</Text>
                        <Text style={styles.cardText}>
                          {getDateFormat(item.endAt)}
                        </Text>
                      </View>
                      <View style={styles.optionButton}>
                        <Text style={[styles.cardText, {marginLeft: 10}]}>
                          Status: Approved
                        </Text>
                        <TouchableOpacity
                          onPress={() => openEditModal(item)}
                          style={styles.editButtonBackground}>
                          <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteAppliedLeave(item)}
                          style={styles.deleteButtonBackground}>
                          <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </>
          )}
        </View>
      )}
      <Modal
        isVisible={isModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        swipeDirection="down"
        onSwipeComplete={closeModal}
        style={[ClientsStyles.modalStyle]}
        onBackdropPress={closeModal}>
        <View style={[ClientsStyles.modalContainerStyle, {padding: 10}]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={ClientsStyles.modalHeaderText}>Apply Leave</Text>
            <View style={styles.upperBoderLine}></View>
            <View style={ClientsStyles.modalFormContainerStyle}>
              <Dropdown
                style={styles.dropDownContainer}
                data={allLeaveType}
                labelField="name"
                valueField="name"
                value={selectedLeaveType}
                itemTextStyle={{color: 'black'}}
                placeholder="Select Leave Type"
                onChange={item => {
                  setSelectedLeaveType(item);
                }}
              />
              <TextInputHeader
                placeholder={'Duration in days'}
                textHeader={'Duration'}
                value={duration}
                onChangeText={e => {
                  setDuration(e);
                }}
              />
              <TextInputHeader
                placeholder={'Write your reason here'}
                textHeader={'Reason'}
                value={reason}
                onChangeText={e => {
                  setReason(e);
                }}
              />
              <DatePickerClients
                onPress={startAtOpenDatePicker}
                value={startDate}
                headerText={'Start Date'}
                placeHolder={'Start Date'}
              />
              <DatePickerClients
                onPress={endAtOpenDatePicker}
                value={endDate}
                headerText={'End Date'}
                placeHolder={'End Date'}
              />
            </View>
            <View style={styles.chekBoxConatiner}>
              <Text style={styles.chekBoxText}>Halfday Leave</Text>
              <CheckBox value={isHalfDay} onValueChange={setHalfDay} />
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginBottom: -10,
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              onPress={closeModal}
              style={[
                ClientsStyles.addButtonContainerStyle,
                {backgroundColor: colors.prime2},
              ]}>
              <Text style={[ClientsStyles.addButtonText, {color: 'black'}]}>
                Done
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={addLeave}
              style={[
                ClientsStyles.addButtonContainerStyle,
                {
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                },
              ]}>
              {buttonLoader && <ActivityIndicator size={21} color={'white'} />}
              <Text style={ClientsStyles.addButtonText}> Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={isEditModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        swipeDirection="down"
        onSwipeComplete={closeEditModal}
        style={[ClientsStyles.modalStyle]}
        onBackdropPress={closeEditModal}>
        <View style={[ClientsStyles.modalContainerStyle, {padding: 10}]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={ClientsStyles.modalHeaderText}>Edit Leave</Text>
            <View style={styles.upperBoderLine}></View>
            <View style={ClientsStyles.modalFormContainerStyle}>
              <Dropdown
                style={styles.dropDownContainer}
                data={allLeaveType}
                labelField="name"
                valueField="name"
                value={selectedLeaveType}
                itemTextStyle={{color: 'black'}}
                placeholder="Select Leave Type"
                onChange={(item)=>setSelectedLeaveType(item)}
              />
              <TextInputHeader
                placeholder={'Duration in days'}
                textHeader={'Duration'}
                value={duration}
                onChangeText={(e) => {setDuration(e)}}
              />
              <TextInputHeader
                placeholder={'Write your reason here'}
                textHeader={'Reason'}
                value={reason}
                onChangeText={(e) => {setReason(e)}}
              />
              <DatePickerClients
                onPress={startAtOpenDatePicker}
                value={startDate}
                headerText={'Start Date'}
                placeHolder={'Start Date'}
              />
              <DatePickerClients
                onPress={endAtOpenDatePicker}
                value={endDate}
                headerText={'End Date'}
                placeHolder={'End Date'}
              />
            </View>
            <View style={styles.chekBoxConatiner}>
              <Text style={styles.chekBoxText}>Halfday Leave</Text>
              <CheckBox
                value={isHalfDay}
                onValueChange={() => setHalfDay(!isHalfDay)}
              />
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginBottom: -10,
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              onPress={closeEditModal}
              style={[
                ClientsStyles.addButtonContainerStyle,
                {backgroundColor: colors.prime2},
              ]}>
              <Text style={[ClientsStyles.addButtonText, {color: 'black'}]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={updateLeave}
              style={[
                ClientsStyles.addButtonContainerStyle,
                {
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                },
              ]}>
              <Text style={ClientsStyles.addButtonText}> Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ModalLoading isVisible={buttonLoader} message={'Please Wait...'} />
    </SafeAreaView>
  );
};

export default AllLeaves;
