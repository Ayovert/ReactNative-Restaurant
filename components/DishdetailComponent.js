import React, {Component} from 'react';
import { View, Text, ScrollView,FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import { Icon } from 'react-native-elements';

function RenderDish(props){
    const dish = props.dish;

    if(dish!=null){
        return(
            <Card 
            featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
                >
                    
                
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <Icon 
                raised
                reverse
                name={props.favorite ? 'heart' : 'heart-o' }
                color='#f50'
                type="font-awesome"
                onPress={() => props.favorite ? console.log('Already Favorite dish') : props.onPress() }
                />
            </Card>
        );
    }
    else {
        return(<View></View>);
    }

};

function RenderComment(props){
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize:14}}>{item.rating} Stars</Text>
                <Text style={{fontSize:14}}>{'-- ' + item.author + ' ,'} {new Intl.DateTimeFormat('en-US',
                                            { year: 'numeric', month: 'short', day: '2-digit' })
                                                .format(new Date(Date.parse(item.date)))}
                </Text>

                
            </View>
            );

            
    }
    return(
        <Card title='Comments'>
            <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
};



class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: []
        };
    }

    markFavorite(dishId){
        this.setState({favorites: this.state.favorites.concat(dishId)})
    }

    static navigationOptions = {
        title: 'Dish Details'
    };
    
    render(){
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
            <RenderDish dish={this.state.dishes[+dishId]}
            favorite = {this.state.favorites.some((el) => el === dishId )}
            onPress = {() => this.markFavorite(dishId)} />
            <RenderComment comments ={this.state.comments.filter((comment) => comment.dishId === dishId )} />
            </ScrollView>
        );
    }
    
}

export default Dishdetail;