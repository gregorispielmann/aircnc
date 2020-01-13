import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//routes
import Routes from './src/routes'

export default function App() {

  //remove warnings from expo
  console.disableYellowBox = true;
  console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

  return <Routes></Routes>
}


