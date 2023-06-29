import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import getWorkouts from '../data/workouts';
export default function WorkoutList({ selectedDate }) {

    //find the workout for the selected date
    
    //return the date * 2 in text
    selectedDate = selectedDate.toDateString().substring(4)

    //print out workout for the date
    const workoutsForDate = getWorkouts.filter(
        (workout) => workout.date === selectedDate
    );

    return workoutsForDate.length > 0 ? (
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
    );
}

const styles = StyleSheet.create({
    workout: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 10,
    },
    workoutName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    noWorkout: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
    },
});
