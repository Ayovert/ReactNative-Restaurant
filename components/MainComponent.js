import React , {Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Dishdetail from './DishdetailComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Constants from 'expo-constants';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
      navigationOptions: ({ navigation }) => ({
      
        headerLeft:()=> <Icon 
        name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()}
      />
    })
    },
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
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8",
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: ()=><Icon 
      name='menu' size={24}
      color='white'
      onPress={() => navigation.toggleDrawer()}
      />  
    })
});

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
}, {
  defaultNavigationOptions:({ navigation}) => ({
    headerStyle: {
        backgroundColor: "#512DA8",
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: () => <Icon 
    name='menu' size={24}
    color='white'
    onPress={() => navigation.toggleDrawer()}
    />
  })
});
const AboutNavigator = createStackNavigator({
  About: { screen: About }
}, {
   defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8",
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: () =><Icon 
    name='menu' size={24}
    color='white'
    onPress={() => navigation.toggleDrawer()}
    />  
  })
});

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites,
    navigationOptions: ({ navigation }) => ({
    
      headerLeft:()=> <Icon 
      name='menu' size={24}
      color='white'
      onPress={() => navigation.toggleDrawer()}
    />
  })
  },
  Dishdetail: { screen: Dishdetail }
},
{
  initialRouteName: 'Favorites',
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


const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8",
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: ()=><Icon 
    name='menu' size={24}
    color='white'
    onPress={() => navigation.toggleDrawer()}
    />  
  })
});


const LoginNavigator = createStackNavigator({
  Login: { screen: Login }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8",
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: ()=><Icon 
    name='menu' size={24}
    color='white'
    onPress={() => navigation.toggleDrawer()}
    />  
  })
});

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} 
        style={styles.drawerImage}/>
        </View>
        <View style={{flex:2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View >

      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height:140,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    flexDirection:'row'
  },
  drawerHeaderText:{
    color:'white',
    fontSize:24,
    fontWeight:'bold'
  },
  drawerImage:{
    margin:10,
    width:80,
    height:60
  }
});

const MainNavigator = createDrawerNavigator({
  Login: 
      { screen: LoginNavigator,
        navigationOptions: {
          title: 'Login',
          drawerLabel: 'Login',
          drawerIcon: ({ tintColor }) => (
            <Icon 
            name="sign-in"
            type="font-awesome"
            size={24}
            color={tintColor}
            />
          )
        }
      },
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor }) => (
            <Icon 
            name="home"
            type="font-awesome"
            size={24}
            color={tintColor}
            />
          )
        }
      },
      About: 
      { screen: AboutNavigator,
        navigationOptions: {
          title: 'About Us',
          drawerLabel: 'About Us',
          drawerIcon: ({ tintColor }) => (
            <Icon 
            name="info-circle"
            type="font-awesome"
            size={24}
            color={tintColor}
            />
          )
        }, 
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor }) => (
            <Icon 
            name="list"
            type="font-awesome"
            size={24}
            color={tintColor}
            />
          )
        }, 
      },
      Contact: 
      { screen: ContactNavigator,
        navigationOptions: {
          title: 'Contact Us',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor }) => (
            <Icon 
            name="address-card"
            type="font-awesome"
            size={24}
            color={tintColor}
            />
          )
        }, 
      },
      Favorites: 
      { screen: FavoritesNavigator,
        navigationOptions: {
          title: 'My Favorites',
          drawerLabel: 'Favorites',
          drawerIcon: ({ tintColor }) => (
            <Icon 
            name="heart"
            type="font-awesome"
            size={24}
            color={tintColor}
            />
          )
        }, 
      },
      Reservation: 
      { screen: ReservationNavigator,
        navigationOptions: {
          title: 'Reserve a Table',
          drawerLabel: 'Reserve a Table',
          drawerIcon: ({ tintColor }) => (
            <Icon 
            name="cutlery"
            type="font-awesome"
            size={24}
            color={tintColor}
            />
          )
        }, 
      }
      
},{
  initialRouteName:'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});

const MainStack = createAppContainer(MainNavigator);

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
   
    render() {
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
           <MainStack />
        </View>
            
            );
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);