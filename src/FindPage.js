import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import WeatherBlock from './WeatherBlock';

function FindPage() {
    const [city, setCity] = useState("");
    const [data, setData] = useState(null);

    

    function getData(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5419b3c35aed4c8a44139b48aa78dccc&lang=fr`)
          .then((response) => {
            return response.json()      
          } )
          .then((responseObject) => {
              setData(responseObject)
            })
          .catch((err) => console.log(err))
        }

      function getAndPrint(city) {
          setCity("");
          getData(city);
          console.log(data);
      }

    

     
        
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setCity}
                value={city}
                placeholder={'Entrez votre ville'}
            />
            <Pressable style={styles.button} onPress={() => getAndPrint(city)}>
                <Text style={styles.text_button}>Avoir la météo</Text>
            </Pressable>
            {data  && <> 
            <WeatherBlock step={data}/>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        width:"50%",
        height:30,
        backgroundColor: "darkcyan",
        alignItems:"center",
        justifyContent:'center',
        marginLeft:"auto",
        marginRight:"auto",
        borderRadius:20
    },
    text_button:{
        color:"white",
        fontSize: 20,
    },
    container:{
        flex:1,
        backgroundColor: "lightblue",
        alignItems:"center"
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor:"white"
      },
      icon:{
          height:150,
          width:150
      }
  });

export default FindPage;