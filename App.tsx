import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Main from './src/components/Main';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Weather application'} />
       <Main/>
      <Footer text={'Stepaniuk Andrii 2024'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e7e3',
  },
  content: {
    flex: 1, // Take up remaining space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
});

export default App;
