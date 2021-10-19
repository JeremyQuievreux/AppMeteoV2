import React from 'react';

import { StyleSheet, Text, View, Image} from 'react-native';


function WeatherStep({step}) {
    

    return(
        <View style={styles.weatherBlock}>
            <Text style={styles.day}> Le {step.dt_txt}</Text>
            <View style={styles.icon_line}>
                <View style={styles.icon_container}>
                    <Image
                        style={styles.icon}
                        source={{
                        uri: `http://openweathermap.org/img/wn/${step.weather[0].icon}@2x.png`
                        }}
                    />
                </View>
                <Text style={styles.description}>{step.weather[0].description}</Text>
            </View>
            <View style={styles.temp_line}>
                <View>
                    <Text style={styles.cold}>Min : </Text>
                    <Text style={styles.temp}>{step.main.temp_min} °C</Text>
                </View>
                <View>
                    <Text style={styles.hot}>Max : </Text>
                    <Text style={styles.temp}>{step.main.temp_max} °C</Text>
                </View>
            </View>
            <Text style={styles.wind}>{step.wind.speed} Km/h</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherBlock:{
        width: 300,
        height:400,
        backgroundColor: "white",
        margin: 10,
        alignItems:"center",
        borderRadius: 20,
    },
    day:{
        textAlign:"center",
        fontSize:20,
        backgroundColor:"darkred",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width:"100%",
        color:"white"
    },
    icon_line:{
        flex:1,
        width:"100%",
        alignItems:"center",
    },
    icon_container:{
        height:150,
        width:"50%",
        justifyContent:'center',
        alignItems:"center",
    },
    icon:{
        height: 150,
        width: 150,
    },
    description:{
        fontSize: 20,
        marginBottom:20,
        textTransform: "capitalize"
    },
    wind:{
        width: "50%",
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:20,
        marginBottom:20,
        marginTop:20
    },
    temp_line: {
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
    },
    temp:{
        fontSize:18
    },
    cold:{
        color:"blue",
        fontSize: 18
    },
    hot:{
        color:"red",
        fontSize: 18
    }
  });

export default WeatherStep;