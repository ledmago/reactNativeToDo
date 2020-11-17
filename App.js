/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Home from './Views/Home';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App: () => React$Node = () => {

  useEffect(() => {
    initializeStorage();
  }, [])
  const initializeStorage = async () => {

    const getList = await AsyncStorage.getItem('list');

    if (!getList) {
      console.log('yok')
      await AsyncStorage.setItem('list', '[]');
    }

  }

  return (
    <Home />
  );
};


export default App;
