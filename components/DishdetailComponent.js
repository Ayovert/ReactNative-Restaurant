import React, {Component} from 'react';
import { View, Text, ScrollView,FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import 'intl';
import 'intl/locale-data/jsonp/en';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

function RenderDish(props){
    const dish = props.dish;

    if(dish!=null){
        return(
            <Card 
            featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}
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
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
            favorite = {this.state.favorites.some((el) => el === dishId )}
            onPress = {() => this.markFavorite(dishId)} />
            <RenderComment comments ={this.props.comments.comments.filter((comment) => comment.dishId === dishId )} />
            </ScrollView>
        );
    }
    
}

export default connect(mapStateToProps)(Dishdetail);