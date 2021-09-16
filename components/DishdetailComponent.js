import React, { Component, useState } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment, postFavorite } from '../redux/ActionCreators';
import 'intl';
import 'intl/locale-data/jsonp/en';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {
    const dish = props.dish;
    const dishId = props.dishId;
    const toggleCommentModal = props.toggleCommentModal;
    const showCommentModal = props.showCommentModal;

    const rating = props.rating;
    const author = props.author;
    const comment = props.comment;
    
    const setRating = props.setRating;
    const setAuthor = props.setAuthor;
    const setComment = props.setComment;

    handleRefView = ref => this.view = ref; 
    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if ( dx < -200)
        return true;
        else
        return false;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished': 'not finished'))
        },
        onPanResponderEnd: (e, gestureState) => {
            if(recognizeDrag(gestureState))
            Alert.alert(
                'Add to Favorites?',
                'Are you sure you wish to add ' + props.dish.name + ' to your favorites?',
                [
                    {
                        text: 'Cancel',
                        onPress:() => console.log('Cancel button pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'Ok',
                        onPress:() => props.favorite ? console.log('Already Favorite dish') : props.onPress()
                    }
                    
                ],
                { cancelable: false } 

            )
            return true;
        }
    });
   
    

    if (dish != null) {
        return (
            <View>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleRefView}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                >
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={styles.formRow}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            color='#f50'
                            type="font-awesome"
                            onPress={() => props.favorite ? console.log('Already Favorite dish') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil-square-o'
                            type='font-awesome'
                            onPress={toggleCommentModal}
                        />

                        <Modal
                            transparent={false}
                            visible={showCommentModal}
                            animationType={"slide"}
                            onRequestClose={toggleCommentModal}
                            onDismiss={toggleCommentModal}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalTitle}>

                                <Rating
                                    type='star'
                                    ratingCount={5}
                                    imageSize={60}
                                    showRating
                                    onFinishRating={setRating}
                                    style={styles.input}
                                    value={rating}
                                />
                                </View>
                                <View style={styles.modalInput}>
                                <Input
                                    placeholder="Author"
                                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                                    style={styles.formRow}
                                    onChangeText={setAuthor}
                                    value={author}
                                />
                                </View>
                                <View style={styles.modalInput}>
                                <Input
                                    placeholder="Comment"
                                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                                    style={styles.formRow}
                                    onChangeText={setComment}
                                    value={comment}
                                />
                                </View>
                                <View style={styles.modalButton}>
                                <Button
                                style={styles.button}
                                    onPress={()=>props.handleCommentSubmit(dishId)}
                                    color="#512DA8"
                                    title="Submit"
                                    
                                />
                                </View>
                                <View style={styles.modalButton}>
                                <Button
                                
                                    onPress={toggleCommentModal}
                                    color="#512DA8"
                                    title="Close"
                                    
                                />
                                </View>
                            </View>
                        </Modal>

                    </View>
                </Card>
                </Animatable.View>


            </View>


        );
    }
    else {
        return (<View></View>);
    }

};

function RenderComment(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 14 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 14 }}>{'-- ' + item.author + ' ,'} {new Intl.DateTimeFormat('en-US',
                    { year: 'numeric', month: 'short', day: '2-digit' })
                    .format(new Date(Date.parse(item.date)))}
                </Text>


            </View>
        );


    }
    return (
        <Card title='Comments'>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={comments}
                renderItem={renderCommentItem} 
            />
        </Card>
        
    )
};
 

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCommentModal: false,
            author: "",
            comment: "",
            rating: 3
        }
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    toggleCommentModal(){
        this.setState({showCommentModal:!this.state.showCommentModal});
    }  

    setComment(value) {
        this.setState({ comment: value })
    }

    setAuthor(value) {
        this.setState({ author: value })
    }

    setRating(value) {
        this.setState({ rating: value })
    }

    handleCommentSubmit(dishId){
        this.toggleCommentModal();
        this.props.postComment( dishId, this.state.rating, this.state.author, this.state.comment);
           
        alert(this.state.rating + " " + this.state.author);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
                
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some((el) => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    postComment={this.props.postComment}
                 showCommentModal = {this.state.showCommentModal}
                 toggleCommentModal = {()=> this.toggleCommentModal()}
                handleCommentSubmit={() => this.handleCommentSubmit(dishId)}
                dishId={dishId}
                author ={this.state.author}
                rating = {this.state.rating}
                comment={this.state.comment}
                setAuthor= {(value) => this.setAuthor(value)}
                setComment= {(value) => this.setComment(value)}
                setRating= {(value) => this.setRating(value)}
                
                />
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                <RenderComment comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                </Animatable.View>
                
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20
    },
    modalInput: {
        margin: 10
    },
    modal:{
        justifyContent:"center",
        margin:20
    },
    modalButton:{
        fontSize:24,
        margin:10
    },
    modalTitle:{
        fontSize:24,
        fontWeight:'bold',
        backgroundColor:'#512DA8',
        textAlign:'center',
        color:'white',
        marginBottom:20,
        borderBottomColor:'#512DA8',
        borderBottomWidth:20
    } 
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);