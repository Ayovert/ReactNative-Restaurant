import React, {Component, useState} from 'react';
import {View, Button, Platform, TouchableHighlight} from 'react-native';
import {Text} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';





class DatetimeComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            date: new Date(1598051730000),
            mode: 'date',
            show: false
        }
    }

   
   

   render(){
    const onChange = (event, selectedDate) =>{
        const currentDate = selectedDate || date;
        this.setState({
            show: (Platform.OS === 'ios'),
            date: currentDate
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
      const { date } = this.state;
      const { mode } = this.state;
    return (
        <View>
          <View>
             <Text> { new Date().toLocaleTimeString('en-US')}</Text>
          </View>  
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          
          
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      );
   }

}
/* const DatetimeComponent = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};*/

export default DatetimeComponent;