import React , { useEffect , useState }from 'react';
import * as Location from 'expo-location';

import { StyleSheet, Text, View, ScrollView } from 'react-native';

import WeatherDay from './WeatherDay';

function Next5Day() {
  //Les states
    //Données météo du jour J
  const [data, setData] = useState(null);
    //Données météo des jours d'aprés
  const [dataFiveDay, setDataFiveDay] = useState(null);
    //Données géoloc
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  // Fonction pour récup les données géoloc
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
  //Fonction pour récup les données météo des jours suivants
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
  //Fonction pour récupérer les données météo du jour (juste pour le nom de la ville)
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
  //Au chargement du composant récupére les données de géoloc
  useEffect(() => {
    getGeoloc();
  }, []);
     
  let text = 'Waiting..';
  if (errorMsg) {
      text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  //Si les données géoloc sont pas null, lance les 2 fonctions pour recupérer les données météo
  if (location !== null && data === null) {
    getData();
    getDataFiveDay();
  }
      
  return (
    <View style={styles.container}>
      {data && <Text style={styles.city_name}>{data?.name}</Text>}
      <ScrollView horizontal={true} style={styles.scroll}>
        {/*map sur les données météo des jours suivant*/}
        {dataFiveDay?.daily.map((dayData, index) => {
          return <WeatherDay key={index} dayData={dayData} index={index}/>
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scroll:{
    paddingLeft: 45,
  },
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