import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, {Component} from 'react';
import Main from './components/MainComponent';



/*<style type="text/css">{`
  @font-face {
    font-family: 'MaterialIcons';
    src: url(${require('react-native-vector-icons/Fonts/MaterialIcons.ttf')}) format('truetype');
  }

  @font-face {
    font-family: 'FontAwesome';
    src: url(${require('react-native-vector-icons/Fonts/FontAwesome.ttf')}) format('truetype');
  }
`}</style>*/

export default class App extends Component {
  render(){
    return(
      <SafeAreaProvider><Main /></SafeAreaProvider>
    );
  }
}



