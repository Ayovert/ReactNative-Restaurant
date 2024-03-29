import { SafeAreaView } from 'react-native-safe-area-context';
import React, { Component } from 'react';
import { View, FlatList, ScrollView,Text, Alert } from 'react-native';

import Swipeout from 'react-native-swipeout';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';



const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})



class Favorites extends Component{


    static navigationOptions = {
        title: 'My Favorites'
    };

   

    render(){
        const { navigate } = this.props.navigation;


        const renderMenuItem = ({item, index}) =>{

            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you want to delete this favorite dish?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(item.name + 'was not deleted'),
                                    style: 'cancel'
                                },
                                {
                                    text:'Ok',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            { cancelable: false } 
                        );
                    }
                }


                
            ];

            return(
                <Swipeout right = {rightButton} autoClose={true}>
                    <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000}>
                <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                leftAvatar={{source:{uri: baseUrl + item.image}}}
                
                />
                </Animatable.View>
                </Swipeout>
                
                
            );
        }

        

        if(this.props.dishes.isLoading){
            return(
                <Loading />
            );
        }

        else if(this.props.dishes.errMess){
            return(
                <Text>{this.props.dishes.errMess}</Text>
            );
        }
        
        else{
            return(
               // <SafeAreaView>
                    <View>
                <FlatList 
                data={this.props.dishes.dishes.filter(dish => this.props.favorites.some((el) => el === dish.id))}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
                </View>
               // </SafeAreaView>
            
             );
        }
        
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Favorites);
