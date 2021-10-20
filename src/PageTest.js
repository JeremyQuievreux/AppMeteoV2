import 'react-native-gesture-handler';

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabTest1 from './TabTest1';
import TabTest2 from './TabTest2';



const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function PageTest() {


  
  return (
    <View style={styles.container}>
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Tab Page 1" component={TabTest1}/>
                <Tab.Screen name="Tab Page 2" component={TabTest2}/>
            </Tab.Navigator>
        </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
      flex:1
  }
});
