import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import getWorkouts from '../data/workouts';
import addWorkout from './workoutListFunctions';

export default function WorkoutList({ selectedDate }) {

    //find the workout for the selected date

    //return the date * 2 in text
    selectedDate = selectedDate.toDateString().substring(4)

    //print out workout for the date
    const workoutsForDate = getWorkouts.filter(
        (workout) => workout.date === selectedDate
    );
    return (
        <View>
            {workoutsForDate.length > 0 ? (
                workoutsForDate.map((workout, index) => (
                    <Pressable
                        key={index}
                        onPress={() => setSelectedWorkout(workout)}
                        style={styles.workout}
                    >
                        <Text style={styles.workoutName}>{workout.name}</Text>
                        <Text style={styles.bestSet}>Best Set: {workout.bestSet}</Text>
                    </Pressable>
                ))
            ) : (
                <Text style={styles.noWorkout}>No workouts for this date</Text>
            )}
            <Pressable style={{
                backgroundColor: '#37FD12',
                padding: 20,
                marginVertical: 2,
                borderRadius: 12
            }}
                onPress={() => addWorkout()}
            >   
                <Text style={styles.addWorkout}>Add Workout</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    workout: {
        backgroundColor: '#333333',
        padding: 20,
        marginVertical: 2,
        borderRadius: 12
    },
    addWorkout: {
        backgroundColor: '#37FD12',
        color: 'black',
        borderRadius: 23,
    },
    workoutName: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 18,
    },
    noWorkout: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    bestSet: {
        color: 'white',

        marginTop: 10,
    },
});
