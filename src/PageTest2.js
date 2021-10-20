import React from 'react';
import 'react-native-gesture-handler';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DrawerPageTest1 from './DrawerPageTest1';

const Drawer = createDrawerNavigator();

function PageTest2() {
    return(
        <NavigationContainer independent={true}>
            <Drawer.Navigator>
                <Drawer.Screen name="Drawer Page 1" component={DrawerPageTest1}/>
                <Drawer.Screen name="Drawer Page 2" component={DrawerPageTest1} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default PageTest2;