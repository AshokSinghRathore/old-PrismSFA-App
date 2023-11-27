import React from "react";
import { Text, TouchableOpacity, ActivityIndicator} from "react-native";

const OnEnd=({loadMore, onEndReach})=>{
    return(
        <TouchableOpacity
        onPress={onEndReach}
        style={{ marginTop: 20,flexDirection:"row",justifyContent:"space-around",alignItems:"center",width:110,alignSelf:"center"}}>
      
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: 'black',
          }}>
          Load More{!loadMore?"...":" "}
        </Text>
      {loadMore&&  <ActivityIndicator size={'small'} color={'black'} />}
      </TouchableOpacity>
    )
}

export default OnEnd;