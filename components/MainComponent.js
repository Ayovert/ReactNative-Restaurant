import React , {Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { View, Platform } from 'react-native';
import Dishdetail from './DishdetailComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Constants from 'expo-constants';


const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
},
{
    initialRouteName: 'Menu',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
}
);

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    defaultNavigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8",
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    }
});

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
}, {
  defaultNavigationOptions: {
    headerStyle: {
        backgroundColor: "#512DA8",
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
  }
});
const AboutNavigator = createStackNavigator({
  About: { screen: About }
}, {
  defaultNavigationOptions: {
    headerStyle: {
        backgroundColor: "#512DA8",
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
  }
});

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        defaultNavigationOptionss: {
          title: 'Home',
          drawerLabel: 'Home'
        }
      },
    Menu: 
      { screen: MenuNavigator,
        defaultNavigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        }, 
      },
      Contact: 
      { screen: ContactNavigator,
        defaultNavigationOptions: {
          title: 'Contact Us',
          drawerLabel: 'Contact Us'
        }, 
      },
      About: 
      { screen: AboutNavigator,
        defaultNavigationOptions: {
          title: 'About Us',
          drawerLabel: 'About Us'
        }, 
      }
},{
  drawerBackgroundColor: '#D1C4E9'
});

const MainStack = createAppContainer(MainNavigator);

class Main extends Component {
   
    render() {
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
           <MainStack />
        </View>
            
            );
        }
}

export default Main;