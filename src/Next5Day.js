import React , { useEffect , useState }from 'react';
import * as Location from 'expo-location';

import { StyleSheet, Text, View, ScrollView } from 'react-native';

import WeatherStep from './WeatherStep';



function Next5Day() {

    const [data, setData] = useState(null);
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

    function getData() {
      const lat = location?.coords.latitude;
        const lon = location?.coords.longitude;
        console.log(lat);
        console.log(lon);
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=f4d66cadfa506cfc32ead4f8fbfba20a&lang=fr`)
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
        console.log(data?.city.name);
      }, []);
      

     
      let text = 'Waiting..';
      if (errorMsg) {
          text = errorMsg;
        } else if (location) {
            text = JSON.stringify(location);
        }

      if (location !== null && data === null) {
        getData();
      }
    
    return (
          <View style={styles.container}>
            <Text style={styles.city_name}>{data?.city.name}</Text>

            <ScrollView style={styles.scroll} horizontal={true}>
            {data?.list.map((step, index) => {
              return <WeatherStep key={index} step={step}/>
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
    scroll:{
      width:"100%",
    },
    city_name:{
      textAlign:"center",
      fontSize:30,
      backgroundColor: "white",
      width:"75%",
      padding:10,
      borderRadius:20,
      margin:20
    }
})

export default Next5Day;