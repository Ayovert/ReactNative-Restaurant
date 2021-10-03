import React, { Component, createRef, useRef } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Platform, TextInput, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Card, Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as Notifications  from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async() => ({
        shouldShowAlert: true,
        shouldPlaySound:true,
        shouldSetBadge: false
    })
});

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: "",
            time: new Date(),
            expoPushToken: "",
            notification: false
           // showModal: false
        }

       // this.notificationListener = createRef();
        //this.responseListener = createRef();
        //const notificationListener = useRef();
        //const responseListener = useRef();
    }

    static navigationOptions = {
        title: 'Reserve A Table'
    }

    componentDidMount(){
        //registerForPushNotificationsAsync().then(token => this.setState({expoPushToken: token}));
    
        if(this.state.notification !=null)
        {
            let notificationListener = Notifications.addNotificationReceivedListener(notification => {
                this.setState({notification: notification});
              });

              let responseListener = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
              });
              Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        }
        
    
      
          
      }
        

    handleReservation() {
        console.log("{Guests: "+ JSON.stringify(this.state.guests)+ "," +
        "\nSmoking: "+ JSON.stringify(this.state.smoking)+ ","  +
        "\nDate: "+ JSON.stringify(this.state.date)+ "," +
        "\nTime: "+JSON.stringify(this.state.time.toLocaleTimeString('en-US')) + "}");
       // this.toggleModal();

    }
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: "",
            time: new Date(),
           // showModal: false
        });
    }


    /*async obtainNotificationPermission()
    {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)

        if(permission.status !== 'granted')
        {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status !== 'granted')
            {
                Alert.alert('Permission not granted to show notification');
            }

            return permission;

        }
    }*/

    async  registerForPushNotifications() {
        let permission = await Notifications.getPermissionsAsync();

        if(permission.status !== 'granted')
        {
            permission = await Notifications.requestPermissionsAsync();
            if(permission.status !== 'granted')
            {
                Alert.alert('Permission not granted to show notification');
            }

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                  name: 'default',
                  importance: Notifications.AndroidImportance.MAX,
                  vibrationPattern: [0, 250, 250, 250],
                  lightColor: '#FF231F7C',
                });
              }

            return permission;

        }

    }


    async schedulePushNotification(date) {
        await this.registerForPushNotifications();
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Your Reservation',
            body:  'Reservation for' + date + 'request',
            ios: {
                sound: true
            },

            android:{
                vibrate:true,
                sound:true
            }
          },
          trigger: { seconds: 2 },
        });
      }




    /*async presentLocalNotifications(date)
    {
        await this.obtainNotificationPermission();
        Notifications.getPresentedNotificationsAsync({
            title: 'Your Reservation',
            body: 'Reservation for' + date + 'request',
            ios: {
                sound: true
            },

            android:{
                vibrate:true,
                sound:true
            }
        })
    }*/
    
    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    render() {

        const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            this.setState({
                show: (Platform.OS === 'ios'),
                time: currentDate
            });
        }

        const showMode = (currentMode) => {
            this.setState({
                show: true,
                mode: currentMode
            });
        };

        const showTimepicker = () => {
            showMode('time');
        };

        const showDatepicker = () => {
            showMode('date');
        };



        const { show } = this.state;
        const { time } = this.state;
        const { mode } = this.state;

        const { onClose } = this.props;

        

        
       // const { show } = this.state;
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <View style={styles.formRow} onPress={onClose}>
                    <Text style={styles.formLabel}>Number of Guests</Text>

                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({ smoking: value })}

                    ></Switch>
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Pick a Date</Text>
                    <DatePicker
                        style={{ flex: 2, margin: 20 }}
                        date={this.state.date}
                        mode="date"

                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                top: 0,
                                left: 4,
                                marginLeft: 0
                            },

                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }

                        }
                    />


                </View>


                <View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Time</Text>

                        <Text style={styles.input}> {this.state.time.toLocaleTimeString('en-US')}</Text>
                    </View>
                    <View>
                        <Button onPress={showTimepicker} title="Pick a Time" />
                    </View>


                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>




                <View style={styles.formRow}>
                    <Button
                        title='Reserve'
                        color='#512DA8'
                        //onPress={() => this.handleReservation()}
                        onPress = {() => {
                            Alert.alert(
                                'Your Reservation OK?',
                                'Number of Guests: ' + this.state.guests +
                                '\nSmoking: ' + this.state.smoking +
                                '\nDate: ' + this.state.date +
                                '\nTime: ' + this.state.time.toLocaleTimeString('en-US'),
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => {this.resetForm(), console.log('Reservation was not completed')},
                                        style: 'cancel'
                                    },
                                    {
                                        text:'Ok',
                                        onPress: () => {
                                            
                                            this.handleReservation(),
                                            this.schedulePushNotification(this.state.date)
                                            
                                        this.resetForm()}
                                    }
                                ],
                                { cancelable: false } 
                            );
                        }}
                        accessibilityLabel='Learn more about this purple button'
                    />
                </View>

                
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },

    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    input: {
        alignItems: 'center',
        height: 40,
        width: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginRight: 22
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;

/*<Modal
                    transparent={false}
                    visible={this.state.showModal}
                    animationType={"slide"}
                    onRequestClose={() => this.toggleModal()}
                    onDismiss={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date: {this.state.date}</Text>
                        <Text style={styles.modalText}>Time: {this.state.time.toLocaleTimeString('en-US')}</Text>

                        <Button
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            color="#512DA8"
                            title="Close"
                        />
                    </View>
                </Modal>*/
