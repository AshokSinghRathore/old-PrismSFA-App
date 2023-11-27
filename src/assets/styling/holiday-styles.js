import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
    holidayCard: {
        backgroundColor: "#F7E9E9",
        margin: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        elevation:1
    },
    holidayDateText: {
        color: "green",
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
      },
      holidayNameText: {
        color: "#262625",
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
    }
})

export default styles