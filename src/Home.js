import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function Home() {
        
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Le Bocal Météo</Text>
            <Image 
                source={require('../src/logo.png')}
                style={styles.logo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightblue",
    },
    logo:{
        height: 400,
        width:400
    },
    title:{
        backgroundColor: "white",
        width:"60%",
        fontSize: 30,
        textAlign: "center",
        padding: 10,
        borderRadius: 20
    }
  });

export default Home;