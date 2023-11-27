import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../constants/colors';
import ModalLoading from '../../../components/UIComponents/ModalLoading';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {backgroundStyles} from '../../../assets/styling/backgroundstyles';
import Loading from '../../../components/UIComponents/Loading';
import {ClientsStyles} from '../../../assets/styling/clients';
import DatePickerClients from '../../../components/Clients/DatePickerClients';
import TextInputHeader from '../../../components/Clients/TextInputHeader';
import {useSelector} from 'react-redux';
import {createExpense, getAllExpense} from '../../../api/expense/expense-api';
import DatePicker from 'react-native-date-picker';
import { getLocation } from '../../../functions/fetch-location';
import Toast from "react-native-simple-toast"
import { useNavigation } from '@react-navigation/native';
import styles from '../../../assets/styling/expense-styles';

const AllExpenses = () => {
  const navigation = useNavigation()
  const Cred = useSelector(state => state.Cred);
  const [loading, setloading] = useState(false)
  const [isModal, setIsModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [expenseDate, setExpenseDate] = useState(null);
  const [isExpenseDateOpen, setIsExpenseDateOpen] = useState(false);
  const [expenseType, setExpenseType] = useState('');
  const [remark, setRemark] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [allExpense, setAllExpense] = useState([]);
  const [page, setPage] = useState(0);
  const [buttonLoader,setButtonLoader] = useState(false)
  const [coords,setCoords]=useState({})
  const [isMoreExpense,setIsMoreExpense]=useState(true);
  useEffect(() => {
    getExpense();
  }, []);

  const getExpense = async () => {
    setloading(true);
    try {
      // const coord = await getLocation()
      // console.log("coord done")
      // setCoords(coord)
      // setPage(0)
      const resp = await getAllExpense(Cred.token, Cred.sub,0);
      setAllExpense(resp);
    } catch (error) {
      console.log(error)
      Alert.alert('Something Went Wrong', 'Please Try After Sometime');
    }
    setloading(false);
  };

  async function addExpense() {
    if (!remark || !expenseDate || !expenseName || !expenseType) {
      Alert.alert('Incomplete Details. Please Fill All The Details');
      return;
    }
setButtonLoader(true)
    try {
      const payload = {
        spentAt: expenseName,
        date: expenseDate,
        amount: expenseAmount,
        location: coords,
        remark: remark,
        expenseType: expenseType,
      };
      const resp = await createExpense(Cred.token,payload);
      
      setAllExpense([...allExpense, payload]);
    } catch (error) {
      Alert.alert('Something Went Wrong', 'Please Try After Sometime');
      console.log(error)
    }
    setButtonLoader(false)
  }

  function closeModal() {
    setIsModal(false);
  }
  function openModal() {
    setIsModal(true);
  }
  function expenseOpenDatePicker() {
    setIsExpenseDateOpen(true);
  }
  function expenseCloseDatePicker() {
    setIsExpenseDateOpen(false);
  }
  function expenseCloseAndSetDatePicker(e) {
    setIsExpenseDateOpen(false);
    setExpenseDate(e);
    console.log(expenseDate)
  }
  async function onEndReach() {
    setLoadMore(true);
    try {
      const resp = await getAllExpense(Cred.token, page + 1);

      setPage(page + 1);
      if (resp.length > 0) {
        setAllExpense([...allExpense, ...resp]);
      } else {
        Toast.show('No More Expense to  load', Toast.SHORT);
        setIsMoreExpense(false)
      }
    } catch (error) {
      alert('Failed To Fetch More Clients. Try After Some Time');
    }
    setLoadMore(false);
  }

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
  }, []);

  return (
    <SafeAreaView style={backgroundStyles.whiteBackground}>
      {loading ? (
        <Loading text={'Please wait while we are fetching your expenses...'} />
      ) : (
        <View style={[backgroundStyles.whiteBackground]}>

        <>
          
          {allExpense.length>0&&<FlatList
            data={allExpense}
            ListFooterComponent={() => {
              return (
                <>
                  {isMoreExpense && (
                    <TouchableOpacity
                      onPress={onEndReach}
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          color: loadMore ? 'red' : 'white',
                          fontSize: 18,
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Load More{' '}
                      </Text>
                      {loadMore && (
                        <ActivityIndicator size={24} color={'red'} />
                        )}
                    </TouchableOpacity>
                  )}
                </>
              );
            }}
            renderItem={item => (
              <View style={styles.expenseCard}>
                {item.item.expenseType != null ? (
                  <Text style={styles.expenseType}>
                    {item.item.expenseType}
                  </Text>
                ) : (
                  <Text style={styles.expenseType}>No type selected</Text>
                )}
                <View style={styles.upperContainer}>
                  <Text style={styles.expenseName}>{item.item.spentAt}</Text>
                  <Text style={styles.expenseRemark}>{item.item.remark}</Text>
                </View>
                <View style={styles.belowContainer}>
                  <Text style={styles.expenseDate}>{item.item.date}</Text>
                  <Text style={styles.expenseAmount}>{item.item.amount}</Text>
                </View>
              </View>
            )}
            />}
          {
           allExpense.length<=0&&<View
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: "white",
              fontFamily: 'Poppins-SemiBold',
            }}>
            {' '}
            No Expense{' '}
          </Text>
        </View>}
         
        </>
      </View>
      )}
       <Modal
            isVisible={isModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.5}
            swipeDirection="down"
            onSwipeComplete={closeModal}
            style={ClientsStyles.modalStyle}
            onBackdropPress={closeModal}>
            <View style={ClientsStyles.modalContainerStyle}>
              <TouchableOpacity
                onPress={closeModal}
                style={{
                  borderWidth: 1,
                  height: 1,
                  borderColor: 'black',
                  width: 100,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}></TouchableOpacity>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={ClientsStyles.modalHeaderText}>Add Expense</Text>
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'grey',
                  }}></View>
                <View style={ClientsStyles.modalFormContainerStyle}>
                  <TextInputHeader
                    placeholder={'Enter which expense type'}
                    textHeader={'Expense Type'}
                    value={expenseType}
                    maxLen={250}
                    onChangeText={e => {
                      setExpenseType(e);
                    }}
                  />
                  <TextInputHeader
                    placeholder={'What is your expense'}
                    textHeader={'Name of Expense'}
                    value={expenseName}
                    maxLen={250}
                    onChangeText={e => {
                      setExpenseName(e);
                    }}
                  />
                  <TextInputHeader
                    placeholder={'Enter expense amount'}
                    textHeader={'Amount'}
                    keyBoardType={'numeric'}
                    value={expenseAmount}
                    onChangeText={e => {
                      setExpenseAmount(e);
                    }}
                  />

                  <TextInputHeader
                    placeholder={'Enter Remark'}
                    textHeader={'Remark'}
                    value={remark}
                    onChangeText={e => {
                      setRemark(e);
                    }}
                  />
                  <DatePickerClients
                    onPress={expenseOpenDatePicker}
                    value={expenseDate}
                    headerText={'Expense Date'}
                    placeHolder={'Expense Date'}
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
                    onPress={addExpense}
                  style={[
                    ClientsStyles.addButtonContainerStyle,
                    {marginLeft: 10,flexDirection:"row",justifyContent:"space-evenly"},
                  ]}>
                   {buttonLoader&& <ActivityIndicator size={21} color={"white"}/>}
                  <Text style={ClientsStyles.addButtonText}>{" "}Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
      <DatePicker
        open={isExpenseDateOpen}
        onCancel={expenseCloseDatePicker}
        modal
        mode="date"
        onConfirm={e => expenseCloseAndSetDatePicker(e)}
        date={expenseDate ? expenseDate : new Date()}
      />
    </SafeAreaView>
  );
};



export default AllExpenses;
