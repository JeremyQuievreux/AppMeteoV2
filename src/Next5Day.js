import React , { useEffect , useState }from 'react';
import * as Location from 'expo-location';

import { StyleSheet, Text, View, ScrollView } from 'react-native';

import WeatherDay from './WeatherDay';



function Next5Day() {

    const [data, setData] = useState(null);
    const [dataFiveDay, setDataFiveDay] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    function getGeoloc() {
      (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let reslocation = await Location.getCurrentPositionAsync({});
          setLocation(reslocation);
        })();
    }

    function getDataFiveDay() {
      const lat = location?.coords.latitude;
        const lon = location?.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=5419b3c35aed4c8a44139b48aa78dccc&lang=fr`)
            
          .then((response) => {
            return response.json()      
          } )
          .then((responseObject) => {
            setDataFiveDay(responseObject)
          })
          .catch((err) => console.log(err))
    }

    function getData() {
      const lat = location?.coords.latitude;
      const lon = location?.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5419b3c35aed4c8a44139b48aa78dccc&lang=fr`)
        .then((response) => {
          return response.json()      
        } )
        .then((responseObject) => {
          setData(responseObject)
        })
        .catch((err) => console.log(err))
      }

    useEffect(() => {
        getGeoloc();
      }, []);
     
      let text = 'Waiting..';
      if (errorMsg) {
          text = errorMsg;
        } else if (location) {
            text = JSON.stringify(location);
        }

      if (location !== null && data === null) {
        getData();
        getDataFiveDay();
      }
      
    return (
          <View style={styles.container}>
              {data && <Text style={styles.city_name}>{data?.name}</Text>}
              <ScrollView horizontal={true}>
                {dataFiveDay?.daily.map((dayData, index) => {
                  return <WeatherDay key={index} dayData={dayData} index={index}/>
                })}
              </ScrollView>
          </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "lightblue",
    alignItems:"center",
    justifyContent:"center"
  },
  city_name:{
    textAlign:"center",
    fontSize:30,
    backgroundColor: "white",
    width:"75%",
    padding:10,
    borderRadius:20,
    margin:20
  },
})

export default Next5Day;