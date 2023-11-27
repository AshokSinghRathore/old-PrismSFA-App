import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Images,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import Loading from '../../../components/UIComponents/Loading';
import {getAllHolidays} from '../../../api/holidays/all-holidays';
import {useSelector} from 'react-redux';
import {backgroundStyles} from '../../../assets/styling/backgroundstyles';
import styles from '../../../assets/styling/holiday-styles';
import NoDataScreen from '../../../components/UIComponents/NoDataScreen';
import OnEnd from '../../../components/UIComponents/OnEnd';

const HolidayList = () => {
  const [buttonLoader, setButtonLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allHolidays, setAllHolidays] = useState([]);
  const [page, setPage] = useState(0);
  const [paginationdData, setPaginationData] = useState({});
  const [loadMore, setLoadMore] = useState(false);
  const Cred = useSelector(state => state.Cred);
  useEffect(() => {
    getHolidayList();
  }, []);
  const getHolidayList = async () => {
    setLoading(true);
    try {
      const resp = await getAllHolidays(Cred.token, 0);
      setPage(0);
      setPaginationData(resp.paginationData);
      setAllHolidays(resp.data);
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again later');
      console.log(error);
    }
    setLoading(false);
  };
  async function onEndReach() {
    setLoadMore(true);
    try {
      const resp = await getAllHolidays(Cred.token, page + 1);
      setPage(page + 1);
      setPaginationData(resp.paginationData);
      setAllHolidays([...allHolidays,...resp.data]);
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again later');
      console.log(error);
    }
    setLoadMore(false);
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loading text={'Please wait while we fetching your details...'} />
      ) : (
        <View style={[backgroundStyles.whiteBackground]}>
          {allHolidays.length > 0 ? (
            <FlatList
              data={allHolidays}
              ListFooterComponent={() => {
                return<>
                
               {paginationdData.totalPages-1>page&&<OnEnd onEndReach={onEndReach} loadMore={loadMore} />}
               </> 
              }}
              keyExtractor={item => {
                return item.id;
              }}
              renderItem={({item}) => {
                return (
                  <View style={styles.holidayCard}>
                    {item.holidayName == '' || item.holidayName == null ? (
                      <Text style={styles.holidayNameText}>Holiday name</Text>
                    ) : (
                      <Text style={styles.holidayNameText}>
                        {item.holidayName}
                      </Text>
                    )}
                    {item.holidayDate == null || item.holidayDate == '' ? (
                      <Text style={styles.holidayDateText}>No Date</Text>
                    ) : (
                      <Text style={styles.holidayDateText}>
                        {item.holidayDate}
                      </Text>
                    )}
                  </View>
                );
              }}
            />
          ) : (
            <NoDataScreen caption={'No Holidays'} />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
export default HolidayList;
