import {
  View,
  Text,
  SafeAreaView,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Loading from '../../../components/UIComponents/Loading';
import {ClientsStyles} from '../../../assets/styling/clients';
import {backgroundStyles} from '../../../assets/styling/backgroundstyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../constants/colors';
import Modal from 'react-native-modal';
import TextInputHeader from '../../../components/Clients/TextInputHeader';
import {
  addClient,
  deleteClient,
  getAllClients,
  updateClient,
} from '../../../api/clients/clients-api';
import DatePickerClients from '../../../components/Clients/DatePickerClients';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import {emailValidator} from '../../../helper/emailValidator';
import {mobileNumberValidator} from '../../../helper/mobileValidator';
import ModalLoading from '../../../components/UIComponents/ModalLoading';
import { getCredentialAsync } from '../../../functions/asnyc';
const AllClients = ({navigation}) => {
  const Cred = useSelector(state => state.Cred);
  const [loading, setloading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [ClientsData, setClientsData] = useState([]);
  const [clientFirstName, setClientFirstName] = useState('');
  const [isMoreClient, setIsMoreClient] = useState(true);
  const [clientLastName, setClientLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [practiceSince, setPracticeSince] = useState(null);
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState('');
  const [clientCode, setClientCode] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [dob, setDob] = useState(null);
  const [dom, setDom] = useState(null);
  const [clinicName, setClinicName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [isDobOpen, setIsDobOpen] = useState(false);
  const [isPracticeSinceOpen, setIsPracticeSinceOpen] = useState(false);
  const [isDomOpen, setIsDomOpen] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [clientUpdateData, setClientUpdateData] = useState({});
  const [updateLoader, setUpdateLoader] = useState(false);
  const [modalLoading,setModalLoading]=useState(false)
  const [page, setPage] = useState(0);
  async function get() {
    setloading(true);
    try {
      const resp = await getAllClients(Cred.token, 0);

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

      setClientsData(resp);
    } catch (error) {
      Alert.alert(
        'Something went wrong',
        "Can't Fetch Data ( " + error.message + ')',
      );
    }
    setloading(false);
  }
  useEffect(() => {
    get();
  }, []);
  async function onEndReach() {
    setLoadMore(true);
    try {
      const resp = await getAllClients(Cred.token, page + 1);
      setPage(page + 1);
      if (resp.length > 0) {
        setClientsData([...ClientsData, ...resp]);
      } else {
        Toast.show('No More Clients to  load', Toast.SHORT);
        setIsMoreClient(false);
      }
    } catch (error) {
      alert('Failed To Fetch More Clients. Try After Some Time');
    }
    setLoadMore(false);
  }
  function openEditModal(data) {
    setClientUpdateData({
      clientLastName: data.clientLastName,
      mobile: data.mobile.toString(),
      email: data.email,
      category: data.category.toString(),
      gender: data.gender,
      region: data.region,
      clientCode: data.clientCode,
      id: data.id,
    });
    setIsEditModal(true);
  }
  function renderItem(data, index) {
    return (
      <View style={ClientsStyles.card}>
        <View style={ClientsStyles.subCard}>
          <Image
            source={require('../../../assets/images/lg/avatar10.jpg')}
            resizeMode="contain"
            style={{width: 70, height: 70}}
          />
          <Text style={ClientsStyles.subCardText}>{data.clientCode}</Text>
        </View>
        <View style={ClientsStyles.subCard2}>
          <Text style={ClientsStyles.subCard2Text}>
            {data.clientLastName} | {data.region}
          </Text>
          <Text style={ClientsStyles.subCard2Text}>{data.email}</Text>
          <Text style={ClientsStyles.subCard2Text}>{data.mobile}</Text>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity
              style={ClientsStyles.buttonStyle}
              onPress={() => openEditModal(data)}>
              <FontAwesome name="edit" color={'white'} size={18} />
              <Text style={{color: 'white', fontFamily: 'Poppins-Medium'}}>
                {' '}
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[ClientsStyles.buttonStyle,{marginLeft:10}]}
             onPress={()=>{
              Alert.alert("Are you sure ?",`You are about to delete client ${data.clientCode}`,[
                {
                  text:"Yes",
                  onPress:()=>DeleteClient(data.id,index),
                  style:"destructive"
                },{
                  text:"No",
                  style:"default"
                }
              ])
             }}
              >
              <MaterialCommunityIcons name="delete" color={'white'} size={18} />
              <Text style={{color: 'white', fontFamily: 'Poppins-Medium'}}>
                {' '}
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function closeModal() {
    setIsModal(false);
  }
  function openModal() {
    setIsModal(true);
  }
  function closeEditModal() {
    setIsEditModal(false);
    setClientUpdateData({});
  }
  function dobOpenDatePicker() {
    setIsDobOpen(true);
  }
  function dobCloseDatePicker() {
    setIsDobOpen(false);
  }
  function dobCloseAndSetDatePicker(e) {
    setIsDobOpen(false);
    setDob(e);
  }
  function practiceSinceOpenDatePicker() {
    setIsPracticeSinceOpen(true);
  }
  function practiceSinceCloseDatePicker() {
    setIsPracticeSinceOpen(false);
  }
  function practiceSinceCloseAndSetDatePicker(e) {
    setIsPracticeSinceOpen(false);
    setPracticeSince(e);
  }
  function DomOpenDatePicker() {
    setIsDomOpen(true);
  }
  function DomCloseDatePicker() {
    setIsDomOpen(false);
  }
  function DomCloseAndSetDatePicker(e) {
    setIsDomOpen(false);
    setDom(e);
  }

  async function AddClient() {
    const emailError = emailValidator(email);
    const mobileError = mobileNumberValidator(mobile);
    if (emailError) {
      Alert.alert('Invalid Email', emailError);
      return;
    }
    if (mobileError) {
      Alert.alert('Invalid Mobile Number', mobileError);
      return;
    }
    if (
      !clientFirstName ||
      !clientLastName ||
      !clientCode ||
      !mobile ||
      !email ||
      !dob ||
      !dom ||
      !practiceSince ||
      !address ||
      !clinicName ||
      !hospitalName ||
      !gender ||
      !region ||
      !category
    ) {
      Alert.alert('Incomplete Form', 'Please Fill All The Fields To Continue');
      return;
    }
    setIsModal(false);
    setloading(true);

    try {
      const payload = {
        clientFirstName: clientFirstName,
        clientLastName: clientLastName,
        clientCode: clientCode,
        mobile: mobile,
        email: email,
        dob: dob,
        dom: dom,
        practiceSince: practiceSince,
        address: address,
        clinicName: clinicName,
        hospitalName: hospitalName,
        gender: gender,
        region: region,
        category: category,
      };
      const resp = await addClient(payload, Cred.token);

      setClientsData([
        ...ClientsData,
        {
          clientLastName: clientLastName,
          clientCode: clientCode,
          clientCode: clientCode,
          email: email,
          gender: gender,
          category: category,
          region: region,
          mobile: mobile,
        },
      ]);
      setIsMoreClient(true);
      setClientFirstName('');
      setClientLastName('');
      setClientCode('');
      setMobile('');
      setEmail('');
      setDob(null);
      setDom(null);
      setPracticeSince(null);
      setAddress('');
      setClinicName('');
      setHospitalName('');
      setGender('');
      setRegion('');
      setCategory('');
    } catch (error) {
      Alert.alert(
        'Something went wrong',
        "Make sure client code, Mobile, Email is unique and all the fields have correct value.Can't Add Client ( " +
          error.message +
          ') ',
      );
    }
    setloading(false);
  }
  async function UpdateClient(data) {
    const emailError = emailValidator(data.email);
    const mobileError = mobileNumberValidator(data.mobile);
    if (emailError) {
      Alert.alert('Invalid Email', emailError);
      return;
    }
    if (mobileError) {
      Alert.alert('Invalid Mobile Number', mobileError);
      return;
    }
    if (
      !data.clientLastName ||
      !data.clientCode ||
      !data.mobile ||
      !data.email ||
      !data.gender ||
      !data.region ||
      !data.category
    ) {
      Alert.alert('Incomplete Form', 'Please Fill All The Fields To Continue');
      return;
    }
    setUpdateLoader(true);
    try {
      const resp = await updateClient(data, Cred.token);
      if (resp === 200) {
        const index = ClientsData.findIndex(e => e.id === data.id);
        if (index != -1) {
          const newArr = [...ClientsData];
          newArr[index] = data;
          setClientsData(newArr);
          closeEditModal();
        }
      }
    } catch (error) {
      console.log(error, error.response.data);
      Alert.alert(
        'Something Went Wrong',
        "Please ensure that you've provided a unique client code and mobile number, and double-check that the values in the other fields are correct. (error " +
          error.message +
          ')',
      );
    }
    setUpdateLoader(false);
  }
  async function DeleteClient(id,index){
    setModalLoading(true)
    try {
      const resp = await deleteClient(Cred.token,id)
      const  newClientArray = [...ClientsData]
      newClientArray.splice(index,1)
      setClientsData(newClientArray)

    } catch (error) {
      setModalLoading(false)
      console.log(error.message)
      Alert.alert(
        'Something Went Wrong',
        "Can't Delete Client. Please Try After Some Time(error " +
        error.message +
        ')',
        );
      }
      setModalLoading(false)
  }

  return (
    <SafeAreaView style={backgroundStyles.whiteBackground}>
      {loading ? (
        <Loading text={'Please wait while we fetch your details....'} />
      ) : (
        <>
          {ClientsData.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <>
                    {isMoreClient && (
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
                            color: loadMore ? 'red' : 'green',
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
              keyExtractor={item => {
                return item.clientCode;
              }}
              data={ClientsData}
              renderItem={item => renderItem(item.item, item.index)}
            />
          )}
          {ClientsData.length <= 0 && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: colors.prime1,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {' '}
                No Clients{' '}
              </Text>
            </View>
          )}
        </>
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
            <Text style={ClientsStyles.modalHeaderText}>Add Member</Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: 'grey',
              }}></View>
            <View style={ClientsStyles.modalFormContainerStyle}>
              <TextInputHeader
                placeholder={'First Name'}
                textHeader={'Client First Name'}
                value={clientFirstName}
                maxLen={250}
                onChangeText={e => {
                  setClientFirstName(e);
                }}
              />
              <TextInputHeader
                placeholder={'Last Name'}
                textHeader={'Client Last Name'}
                value={clientLastName}
                maxLen={250}
                onChangeText={e => {
                  setClientLastName(e);
                }}
              />
              <TextInputHeader
                placeholder={'Code'}
                textHeader={'Client Code'}
                maxLen={250}
                value={clientCode}
                onChangeText={e => {
                  setClientCode(e);
                }}
              />
              <TextInputHeader
                placeholder={'Mobile Number (without country code)'}
                textHeader={'Client Mobile Number'}
                maxLen={10}
                keyBoardType={'numeric'}
                value={mobile}
                onChangeText={e => {
                  setMobile(e);
                }}
              />
              <TextInputHeader
                placeholder={'Email'}
                textHeader={'Client Email'}
                maxLen={250}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <DatePickerClients
                onPress={dobOpenDatePicker}
                headerText={'Client DOB'}
                placeHolder={'DOB'}
                value={dob}
              />
              <DatePickerClients
                onPress={practiceSinceOpenDatePicker}
                headerText={'Clients Practice Since'}
                placeHolder={'Practice Since'}
                value={practiceSince}
              />
              <DatePickerClients
                onPress={DomOpenDatePicker}
                headerText={'Clients DOM'}
                placeHolder={'DOM'}
                value={dom}
              />
              <TextInputHeader
                placeholder={'Address'}
                textHeader={'Client Address'}
                value={address}
                maxLen={500}
                onChangeText={e => {
                  setAddress(e);
                }}
              />
              <TextInputHeader
                placeholder={'Clinic Name'}
                textHeader={'Client Clinic Name'}
                value={clinicName}
                maxLen={350}
                onChangeText={e => {
                  setClinicName(e);
                }}
              />

              <TextInputHeader
                placeholder={'Clinic Hospital Name'}
                textHeader={'Client Hospital Name'}
                value={hospitalName}
                maxLen={350}
                onChangeText={e => {
                  setHospitalName(e);
                }}
              />
              <TextInputHeader
                placeholder={'Male or Female'}
                textHeader={'Client Gender'}
                value={gender}
                maxLen={10}
                onChangeText={e => {
                  setGender(e);
                }}
              />
              <TextInputHeader
                placeholder={'Region'}
                textHeader={'Client Region'}
                value={region}
                maxLen={250}
                onChangeText={e => {
                  setRegion(e);
                }}
              />
              <TextInputHeader
                placeholder={'Category'}
                textHeader={'Client Category'}
                value={category}
                maxLen={250}
                onChangeText={e => {
                  setCategory(e);
                }}
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
              onPress={AddClient}
              style={[ClientsStyles.addButtonContainerStyle, {marginLeft: 10}]}>
              <Text style={ClientsStyles.addButtonText}>Add</Text>
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
        style={ClientsStyles.modalStyle}
        onBackdropPress={closeEditModal}>
        <View style={ClientsStyles.modalContainerStyle}>
          <TouchableOpacity
            onPress={closeEditModal}
            style={{
              borderWidth: 1,
              height: 1,
              borderColor: 'black',
              width: 100,
              alignSelf: 'center',
              marginBottom: 10,
            }}></TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={ClientsStyles.modalHeaderText}>Add Member</Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: 'grey',
              }}></View>
            <View style={ClientsStyles.modalFormContainerStyle}>
              <TextInputHeader
                placeholder={'Last Name'}
                textHeader={'Client Last Name'}
                value={clientUpdateData.clientLastName}
                maxLen={250}
                onChangeText={e => {
                  setClientUpdateData({
                    ...clientUpdateData,
                    clientLastName: e,
                  });
                }}
              />
              <TextInputHeader
                placeholder={'Code'}
                textHeader={'Client Code'}
                maxLen={250}
                value={clientUpdateData.clientCode}
                onChangeText={e => {
                  setClientUpdateData({
                    ...clientUpdateData,
                    clientCode: e,
                  });
                }}
              />
              <TextInputHeader
                placeholder={'Mobile Number (without country code)'}
                textHeader={'Client Mobile Number'}
                maxLen={10}
                keyBoardType={'numeric'}
                value={clientUpdateData.mobile}
                onChangeText={e => {
                  setClientUpdateData({
                    ...clientUpdateData,
                    mobile: e,
                  });
                }}
              />
              <TextInputHeader
                placeholder={'Email'}
                textHeader={'Client Email'}
                maxLen={250}
                value={clientUpdateData.email}
                onChangeText={e => {
                  setClientUpdateData({
                    ...clientUpdateData,
                    gender: e,
                  });
                }}
              />

              <TextInputHeader
                placeholder={'Male or Female'}
                textHeader={'Client Gender'}
                maxLen={10}
                value={clientUpdateData.gender}
                onChangeText={e => {
                  setClientUpdateData({
                    ...clientUpdateData,
                    gender: e,
                  });
                }}
              />
              <TextInputHeader
                placeholder={'Region'}
                maxLen={250}
                textHeader={'Client Region'}
                value={clientUpdateData.region}
                onChangeText={e => {
                  setClientUpdateData({
                    ...clientUpdateData,
                    region: e,
                  });
                }}
              />
              <TextInputHeader
                placeholder={'Category'}
                textHeader={'Client Category'}
                value={clientUpdateData.category}
                onChangeText={e => {
                  setClientUpdateData({
                    ...clientUpdateData,
                    category: e,
                  });
                }}
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
              onPress={() => UpdateClient(clientUpdateData)}
              style={[
                ClientsStyles.addButtonContainerStyle,
                {
                  marginLeft: 10,
                },
                updateLoader && {
                  flexDirection: updateLoader ? 'row' : 'column',
                  justifyContent: 'space-evenly',
                },
              ]}>
              <Text style={[ClientsStyles.addButtonText]}>Update</Text>
              {updateLoader && (
                <ActivityIndicator size={'small'} color={'white'} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <DatePicker
        open={isDobOpen}
        onCancel={dobCloseDatePicker}
        modal
        mode="date"
        onConfirm={e => dobCloseAndSetDatePicker(e)}
        date={dob ? dob : new Date()}
      />
      <DatePicker
        open={isPracticeSinceOpen}
        onCancel={practiceSinceCloseDatePicker}
        modal
        mode="date"
        onConfirm={e => practiceSinceCloseAndSetDatePicker(e)}
        date={practiceSince ? practiceSince : new Date()}
      />
      <DatePicker
        open={isDomOpen}
        onCancel={DomCloseDatePicker}
        modal
        mode="date"
        onConfirm={e => DomCloseAndSetDatePicker(e)}
        date={dom ? dom : new Date()}
      />
      <ModalLoading isVisible={modalLoading} />
    </SafeAreaView>
  );
};

export default AllClients;
