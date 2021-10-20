import 'react-native-gesture-handler';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function TabTest2() {


  
  return (
    <View style={styles.container}>
        <Text>Page Test Tab 2</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
      backgroundColor: "lightgray",
      flex:1,
      justifyContent:"center",
      alignItems: "center",
  }
});
