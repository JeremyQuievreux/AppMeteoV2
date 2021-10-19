import React ,{ useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View , Image , Pressable} from 'react-native';


function Current() {

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
      }

      function handlePress() {
        console.log("Click");
        getGeoloc();
        getData();

      }


    return (
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={()=>handlePress()}>
          <Text style={styles.button_text}>Refresh Géoloc</Text>
        </Pressable>
        <Image
        style={styles.icon}
        source={{
          uri: `http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`
        }}
        />
        <Text style={styles.city}>Lieu : {data?.name}</Text>
        <Text style={styles.temp}>Température : {data?.main.temp} °C</Text>
        <Text style={styles.wind}>Vitesse du vent : {data?.wind.speed} Km/h</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: "darkred",
    padding: 10,
    width:"60%",
    borderRadius: 20
  },
  button_text:{
    color: "white",
    fontSize: 30,
    textAlign:"center",
  },
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{
    height: 150,
    width: 150
  },
  city:{
    fontSize: 20,
    marginBottom: 10,  
  },
  temp:{
    fontSize: 20,
    marginBottom: 10,  
  },
  wind:{
    fontSize: 20,
    marginBottom: 10,  
  }
});

export default Current;