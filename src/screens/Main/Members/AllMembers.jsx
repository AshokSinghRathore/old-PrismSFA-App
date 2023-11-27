// import {
//   View,
//   Text,
//   FlatList,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {getAllMembers} from '../../../api/member/member-api';
// import {useDispatch, useSelector} from 'react-redux';
// import {removeCredentialAsync} from '../../../functions/asnyc';
// import {deleteCredentials} from '../../../redux/reducers';
// import {backgroundStyles} from '../../../assets/styling/backgroundstyles';
// import {MembersStyles} from '../../../assets/styling/members';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {colors} from '../../../constants/colors';
// import Modal from 'react-native-modal';
// import Loading from '../../../components/Loading';
// import TextInputHeader from '../../../components/TextInputHeader';
// const AllMembers = ({navigation}) => {
//   const Cred = useSelector(state => state.Cred);
//   const [loading, setloading] = useState(false);
//   const [isModal, setIsModal] = useState(false);
//   const [MembersData, setMembersData] = useState([]);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [joiningDate, setJoiningDate] = useState("");
//   const [password, setPassword] = useState("");
//   const [designation, setDesignation] = useState("");
//   const [employeeId, setEmployeeId] = useState("");
//   const Dispatch = useDispatch();
//   async function get() {
//     setloading(true);
//     try {
//       const resp = await getAllMembers(Cred.token);
//       setMembersData(resp.data);
//     } catch (error) {
//       await removeCredentialAsync();
//       Dispatch(deleteCredentials());
//     }
//     setloading(false);
//   }
//   useEffect(() => {

//     get();
//   }, []);

//   function renderItem(data, index) {
//     return (
//       <View style={MembersStyles.card}>
//         <View style={MembersStyles.subCard}>
//           <Image
//             source={require('../../../assets/images/lg/avatar9.jpg')}
//             resizeMode="contain"
//             style={{width: 70, height: 70}}
//           />
//           <Text style={MembersStyles.subCardText}>{data.employeeId}</Text>
//         </View>
//         <View style={MembersStyles.subCard2}>
//           <Text style={MembersStyles.subCard2Text}>
//             {data.firstName + ' ' + data.lastName}
//           </Text>
//           <Text style={MembersStyles.subCard2Text}>
//             Joining Date {data.joiningDate}
//           </Text>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <TouchableOpacity style={MembersStyles.buttonStyle}>
//               <FontAwesome name="edit" color={'white'} size={18} />
//               <Text style={MembersStyles.buttonTextStyle}> Edit</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[MembersStyles.buttonStyle, {left: -15, width: 80}]}>
//               <Fontisto size={16} color={'white'} name="person" />
//               <Text style={MembersStyles.buttonTextStyle}> Profile</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   }
//   function closeModal() {
//     setIsModal(false);
//   }
//   return (
//     <SafeAreaView style={[backgroundStyles.whiteBackground]}>
//       {loading ? (
//         <Loading />
//       ) : (
//         <FlatList
//           data={MembersData}
//           renderItem={item => renderItem(item.item, item.index)}
//         />
//       )}
//       <Modal
//         isVisible={isModal}
//         animationIn="slideInUp"
//         animationOut="slideOutDown"
//         backdropOpacity={0.5}
//         // swipeDirection="down"
//         // onSwipeStart={closeModal}  

//         style={MembersStyles.modalStyle}
//         onBackdropPress={closeModal}>
//         <View style={MembersStyles.modalContainerStyle}>
//           <TouchableOpacity onPress={closeModal} style={{borderWidth:1,height:1,borderColor:"black",width:100,alignSelf:"center",marginBottom:10}}></TouchableOpacity>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <Text style={MembersStyles.modalHeaderText}>Add Member</Text>
//             <View
//               style={{
//                 borderBottomWidth: 0.5,
//                 borderBottomColor: 'grey',
//               }}></View>
//             <View style={MembersStyles.modalFormContainerStyle}>
//               <TextInputHeader
//                 placeholder={'First Name'}
//                 textHeader={'Member First Name'}
//                 value={firstName}
//                 onChangeText={(e)=>{setFirstName(e)}}
//               />
//               <TextInputHeader
//                 placeholder={'Last Name'}
//                 textHeader={'Member Last Name'}
//                 value={lastName}
//                 onChangeText={(e)=>{setLastName(e)}}
//               />
//               <TextInputHeader placeholder={'ID'} textHeader={'Member ID'} />
//               <TextInputHeader
//                 placeholder={'Mobile Number (without country code)'}
//                 textHeader={'Member Mobile Number'}
//                 value={mobile}
//                 onChangeText={(e)=>{setMobile(e)}}
//               />
//               <TextInputHeader
//                 placeholder={'Password'}
//                 textHeader={'Member Password'}
//                 value={password}
//                 onChangeText={(e)=>{setPassword(e)}}
//               />
//               <TextInputHeader
//                 placeholder={'Email'}
//                 textHeader={'Member Email'}
//                 value={email}
//                 onChangeText={(e)=>{email(e)}}
//               />
//               <TextInputHeader
//                 placeholder={'Joining Date'}
//                 textHeader={'Member Joining Date'}
//                 value={joiningDate}
//                 onChangeText={(e)=>{joiningDate(e)}}
//               />
//               <TextInputHeader placeholder={'DOB'} textHeader={'Member DOB'} onChangeText={(e)=>setDo}/>
//             </View>
//             <View style={{flexDirection:"row",alignSelf:"center",justifyContent:"space-between"}}>

           
//             <TouchableOpacity style={[MembersStyles.addButtonContainerStyle,{backgroundColor:colors.prime2}]}>
//               <Text style={[MembersStyles.addButtonText,{color:"black"}]}>Done</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[MembersStyles.addButtonContainerStyle,{marginLeft:10}]}>
//               <Text style={MembersStyles.addButtonText}>Add</Text>
//             </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default AllMembers;
