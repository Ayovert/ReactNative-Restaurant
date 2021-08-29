import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Platform, TextInput, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Card, Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import { Icon } from 'react-native-elements';


class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: "",
            time: new Date(),
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve A Table'
    }



    handleReservation() {
        console.log(JSON.stringify(this.state))
        this.toggleModal();

    }
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: "",
            time: new Date(),
            showModal: false
        });
    }

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
                        onPress={() => this.handleReservation()}
                        accessibilityLabel='Learn more about this purple button'
                    />
                </View>

                <Modal
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
                </Modal>
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
