import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/Home';
import Current from './src/Current';
import Next5Day from './src/Next5Day';
import Weather24H from './src/Weather24H';
import FindPage from './src/FindPage';
import StoragePage from './src/StoragePage';
import PageTest from './src/PageTest';
import PageTest2 from './src/PageTest2';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {


  
  return (
    
    <NavigationContainer >
      <Drawer.Navigator>
        <Drawer.Screen  name="Accueil" component={Home}/>
        <Drawer.Screen name="Meteo Actuelle" component={Current} />
        <Drawer.Screen name="24H prochaines Heures" component={Weather24H} />
        <Drawer.Screen name="7 prochains jours" component={Next5Day} />
        <Drawer.Screen name="Recherche de Ville" component={FindPage} />
        <Drawer.Screen name="Test du Storage" component={StoragePage} />
        <Drawer.Screen name="Page avec un menu en bas" component={PageTest} />
        <Drawer.Screen name="Page avec un Drawer" component={PageTest2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  nav_container:{
    backgroundColor: "black",
  }
});
