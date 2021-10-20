import React, { useState } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

function StoragePage() {

    //Mes states
    const [text_a_stocker, set_text_a_stocker] = useState("");
    const [text_a_afficher, set_text_a_afficher] = useState("");
    //Fonction préfaite pour ajouter une valeur au Storage
    const storeData = async (value) => {
        try {
            //Essaye de créer un clé -> valeur dans le Storage
          await AsyncStorage.setItem('@MonStorage', value)
          //Quand c'est fais
          console.log("Saved");
          //Modifie le message dans la pseudo Console
          set_text_a_afficher(value + " Save in Storage")
        } catch (e) {
          //Si ya une erreur
          console.log("Error on Save");
          //Modifie le message dans la pseudo Console
          set_text_a_afficher("Error to save in storage")
        }
    }
    //Fonction préfaite pour récupérer une valeur du Storage
    const getData = async () => {
        try {
            //Essaye de récupérer une valeur dans le Storage
          const value = await AsyncStorage.getItem('@MonStorage')
          if(value !== null) {
              console.log("Storage Récupéré");
              //Quand c'est fait
              //Modifie le message dans la pseudo console
              set_text_a_afficher(value + " Récupéré du Storage")
        }else {
            //Si il y rien dans le Storage
            console.log("Rien dans le Storage");
            //Modifie le message dans la console
            set_text_a_afficher("Rien dans le Storage")
          }
        } catch(e) {
            //Si il y a une erreur
            console.log("Error de récupération");
            //Modifie le message dans la Pseudo Console
            set_text_a_afficher("Error de récupération")
        }
      }
    //Fonction préfaite pour clear le Storage
    const removeValue = async () => {
        try {
            //Essaye de supprimer clé -> valeur du Storage
          await AsyncStorage.removeItem('@MonStorage')
        } catch(e) {
          // Si erreur
          console.log(e);
        }
        //Si non
        console.log('Done.')
        //Affiche un message dans la Pseudo Console
        set_text_a_afficher("Storage Vidé")
      }
    
    //Ma fonction pour stocker dans le Storage au click
    function handleStock(mon_text_a_stocker) {
        //Appel la fonction préfaite
        storeData(mon_text_a_stocker);
        //Et reset du input
        set_text_a_stocker("")
    }
    //Ma fonction pour récupérer le Storage
    function handleStorage() {
        //Appel la fonction préfaite
        getData();
    }
    //Ma fonction pour reset le Storage
    function handleReset() {
        //Appel de la fonction préfaite
        removeValue();
    }

      
  return (
    <View style={styles.container}>
        <Text>Valeur a stocker : </Text>
        <TextInput
            style={styles.input}
            onChangeText={set_text_a_stocker}
            value={text_a_stocker}
            placeholder={"valeur a stocker"}
        />
        <Pressable style={{width:"100%", alignItems:"center"}}
            onPress={()=> handleStock(text_a_stocker)}>
            <Text style={styles.button_stock}>Stocker dans le Storage</Text>
        </Pressable>
        <Pressable style={{width:"100%", alignItems:"center"}}
            onPress={()=> handleStorage()}>
            <Text style={styles.button_stock}>Récupérer le Storage</Text>
        </Pressable>
        <Pressable style={{width:"100%", alignItems:"center"}}
            onPress={()=> handleReset()}>
            <Text style={styles.button_stock}>Reset le Storage</Text>
        </Pressable>
        <View style={styles.console}>
            <Text style={styles.text_console}>Fake Console : </Text>
            <Text style={styles.text_console}>- {text_a_afficher} </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor: "lightblue",
    },
    input:{
        borderWidth:2,
        width:"80%",
        height:40,
        paddingLeft: 20,
        backgroundColor:"white",
    },
    button_stock:{
        backgroundColor: "darkcyan",
        height:40,
        width:"80%",
        textAlign:"center",
        margin:20,
        textAlignVertical:"center",
        fontSize:20,
        borderRadius:20,
    },
    console:{
        backgroundColor:"black",
        width:"80%",
        height:300
    },
    text_console:{
        color:"white",
        fontSize:20,
    }
})

export default StoragePage;