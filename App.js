import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import Main from './components/MainComponent';

export default class App extends React.Component {
  render(){
    return(
      <SafeAreaProvider><Main /></SafeAreaProvider>
    );
  }
}


