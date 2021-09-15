import { SafeAreaView } from 'react-native-safe-area-context';
import React, { Component } from 'react';
import { View, FlatList, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';



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
                 <View style={{flex:1}}>
                     <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000}>
                 <ListItem
                 key={index}
                 title={item.name}
                 subtitle={item.description}
                 hideChevron={false}
                 onPress={() => navigate('Dishdetail', { dishId: item.id })}
                 leftAvatar={{source:{uri: baseUrl + item.image}}}
                
                />
                </Animatable.View>
                </View>
                
            );
        }

        const { navigate } = this.props.navigation;

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
              //  <SafeAreaView>
                    <View>
                <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
                </View>
            //    </SafeAreaView>
            
             );
        }
        
    }
    
}

export default connect(mapStateToProps)(Menu);
