import { SafeAreaView } from 'react-native-safe-area-context';
import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
    }
}



class Menu extends Component{


    static navigationOptions = {
        title: 'Menu'
    };

    render(){
        const renderMenuItem = ({item, index}) =>{
            return(
                <View style={{flex:1,
                    }}>
                <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                imageSrc={{uri: baseUrl + item.image}}
                
                />
                </View>
                
            );
        }

        const { navigate } = this.props.navigation;

        return(
            <SafeAreaView>
                <View>
            <FlatList 
            data={this.props.dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
            </View>
            </SafeAreaView>
        
         );
    }
    
}

export default connect(mapStateToProps)(Menu);
