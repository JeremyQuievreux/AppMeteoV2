import React ,{ useEffect, useState } from 'react';
import * as Location from 'expo-location';


import { StyleSheet, Text, View } from 'react-native';

import WeatherBlock24H from './WeatherBlock24H';
import { ScrollView } from 'react-native-gesture-handler';


function Weather24H() {
//Les states
        //données météo
const [data, setData] = useState(null);
        //données géoloc
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);

//function qui recupere les données de géoloc
function getGeoloc() {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let reslocation = await Location.getCurrentPositionAsync({});
    // Sauvegarde les données de géoloc dans le state
    setLocation(reslocation);
  })();
}

//Fonction qui récupére les données météo
function getData() {
  const lat = location?.coords.latitude;
  const lon = location?.coords.longitude;
  console.log(lat);
  console.log(lon);
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=5419b3c35aed4c8a44139b48aa78dccc&lang=fr`)
    .then((response) => {
      return response.json()      
    } )
    .then((responseObject) => {
      setData(responseObject)
    })
    .catch((err) => console.log(err))
}

//Au render du composant recupére les infos géoloc
useEffect(() => {
    getGeoloc();
}, []);
    
let text = 'Waiting..';
if (errorMsg) {
    text = errorMsg;
} else if (location) {
    text = JSON.stringify(location);
}
//Quand les données géoloc sont pas null, lance la fonction qui recupere les données météo
if (location !== null && data === null) {
  getData();
}

data && console.log(data.city.name);
data && console.log(data.list[0]);

let filteredData = []

if (data !== null) {
   for (let i = 0; i < 8; i++) {
    filteredData.push(data.list[i]);
} 
}



      
  return (
    <View style={styles.container}>
        {data && <Text style={styles.city_name}>{data?.city.name}</Text>}
        <ScrollView style={styles.scroll}>
        {filteredData?.map((dayData, index) => {
          return <WeatherBlock24H key={index} step={dayData} index={index}/>
        })}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: "lightblue",
      alignItems:"center",
  },
  scroll:{
    width: "100%",
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

export default Weather24H;