import React, { useState, useEffect } from "react"
import { View, Text, SafeAreaView, Image, Alert, StyleSheet, ImageBackground } from "react-native"
import { useSelector } from "react-redux"
import TextInputHeader from "../../../components/Clients/TextInputHeader";
import { getAllClients } from "../../../api/clients/clients-api";
import { getMemberDetail } from "../../../api/member/member-api";
import Loading from "../../../components/UIComponents/Loading";


const MemberProfile = () => {
    const [userFname, setFname] = useState("");
    const [userLname, setLname] = useState("");
    const [mobileNumber, setMobileNumber] = useState("")
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState(null);
    const [joiningDate, setJoiningDate] = useState(null);
    const [memberId, setMemberId] = useState("")
    const [loading, setloading] = useState(false);
    const [memberDetail, setMemberDetail] = useState({})
    const Cred = useSelector(state => state.Cred);

    const getDetails = async () => {
        setloading(true)
        try {
            const resp = await getMemberDetail(Cred.sub, Cred.token);
            setFname(resp.firstName)
            setLname(resp.lastName)
            setDob(resp.dob)
            setEmail(resp.email)
            setMemberId(resp.employeeId)
            setMobileNumber(resp.mobile.toString())
            setJoiningDate(resp.joiningDate)
        }
        catch (error) {
            console.log(error)
            Alert.alert('Something Went Wrong', 'Please Try After Sometime');
        }
        setloading(false);
    }
    useEffect(() => {
        getDetails();
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>

            {loading ? (<Loading color={"white  "} text={'Please wait while we are fetching your details...'} />
            ) : (
                <ImageBackground style={{ alignItems: "center", flex: 1 }} source={require('../../../assets/images/bg.jpg')}>


                    <Image style={styles.userImage} source={require('../../../assets/images/user-profile.jpg')} />
                    <Text style={styles.userName}>{userFname + "" + userLname}</Text>
                    <View style={styles.detailContainer}>

                        <TextInputHeader
                            textHeader={'Memeber ID'}
                            keyBoardType={'numeric'}
                            value={memberId}
                            editable={false}
                            onChangeText={e => {
                                setMemberId(e);
                            }}
                        />
                        <TextInputHeader
                            textHeader={'Your Email'}
                            editable={false}
                            keyBoardType={'numeric'}
                            value={email}
                        // onChangeText={e => {
                        //   setExpenseAmount(e);
                        // }}
                        />
                        <TextInputHeader
                            editable={false}
                            textHeader={'Phone Number'}
                            keyBoardType={'numeric'}
                            value={mobileNumber}
                        // onChangeText={e => {
                        //   setExpenseAmount(e);
                        // }}
                        />


                        <TextInputHeader
                            textHeader={'Date Of Birth'}
                            editable={false}
                            keyBoardType={'numeric'}
                            value={dob}
                        // onChangeText={e => {
                        //   setExpenseAmount(e);
                        // }}
                        />
                        <TextInputHeader
                            editable={false}
                            textHeader={'Joining Date'}
                            keyBoardType={'numeric'}
                            value={joiningDate}
                        // onChangeText={e => {
                        //   setExpenseAmount(e);
                        // }}
                        />
                    </View>

                </ImageBackground>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    userImage: {
        height: 120,
        width: 130,
        borderRadius: 40,
        marginTop: 20,
        alignItems: "center"
    },
    mainContainer: {
        backgroundColor: "white",
        flex: 1,
    },
    userName: {
        fontFamily: "Poppins-Bold",
        color: "white",
        fontSize: 18,
        marginTop: 10,
        textAlign: "center",
        marginBottom: 10
    },
    detailContainer: {
        backgroundColor: "#faf9f5",
        padding: 20,
        borderRadius: 10,
        width: 350,
    }
})

export default MemberProfile;