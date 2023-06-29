import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import WorkoutList from './components/WorkoutList';
import Workout from './components/Workout';

export default function App() {

  const [date, setDate] = useState(new Date());

  const changeDate = (numDays) => {
    let newDate = new Date(date); // Create a new Date object from the current date
    newDate.setDate(date.getDate() + numDays); // Update the date by adding/subtracting the number of days
    setDate(newDate); // Update the state variable
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datePicker}>
        <AntDesign
          onPress={() => changeDate(-1)}
          name="left"
          size={20}
          color="#C3FF53"
        />
        <Text style={styles.date}>{date.toDateString()}</Text>
        <AntDesign
          onPress={() => changeDate(1)}
          name="right"
          size={20}
          color="#C3FF53"
        />
        
      </View>
      <WorkoutList selectedDate={date} />
      <Pressable styles={{color: '#DDDDDD'}}>
        <Text styles = {{color: 'white'}}>Press me</Text>
      </Pressable>
      <StatusBar style="auto" />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 12,
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 100,
  },
  datePicker: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  date: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    marginHorizontal: 20,
  },
});
