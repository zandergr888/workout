import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet, Modal, TextInput, Button } from 'react-native';
import workouts from '../data/workouts';

export default function WorkoutList({ selectedDate }) {

    selectedDate = selectedDate.toDateString().substring(4)

    const [workoutsForDate, setWorkoutsForDate] = useState(workouts.filter(
        (workout) => workout.date === selectedDate
    ));
    const [showModal, setShowModal] = useState(false);
    const [workoutName, setWorkoutName] = useState("");
    const [bestSet, setBestSet] = useState("");

    const addWorkout = () => {
        const newWorkout = {
            name: workoutName,
            bestSet: bestSet,
            date: selectedDate,
            sets: [],
        };
        workouts.push(newWorkout);
        setWorkoutsForDate([...workoutsForDate, newWorkout]);
        setWorkoutName("");
        setBestSet("");
        setShowModal(false);
    }

    const deleteWorkout = (index) => {
        setWorkoutsForDate(workoutsForDate.filter((_, i) => i !== index));
    }

    return (
        <View>
            {workoutsForDate.length > 0 ? (
                workoutsForDate.map((workout, index) => (
                    <View style={styles.workout} key={index}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.workoutName}>{workout.name}</Text>
                            <Text style={styles.bestSet}>Best Set: {workout.bestSet}</Text>
                        </View>
                        <Pressable style={styles.deleteButton} onPress={() => deleteWorkout(index)}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </Pressable>
                    </View>

                ))
            ) : (
                <Text style={styles.noWorkout}>No workouts for this date</Text>
            )}
            <Pressable style={styles.addButton} onPress={() => setShowModal(true)}>
                <Text style={styles.addButtonText}>Add Workout</Text>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add a new workout</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setWorkoutName}
                            value={workoutName}
                            placeholder="Workout Name"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setBestSet}
                            value={bestSet}
                            placeholder="Best Set"
                        />
                        <Button
                            onPress={addWorkout}
                            title="Add Workout"
                            color="#841584"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    workout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333333',
        padding: 20,
        marginVertical: 2,
        borderRadius: 12
    },
    addButton: {
        backgroundColor: '#37FD12',
        padding: 20,
        marginVertical: 2,
        borderRadius: 12
    },
    addButtonText: {
        color: 'black',
        textAlign: 'center'
    },
    deleteButton: {
        backgroundColor: '#FD3737',
        padding: 5,
        borderRadius: 10
    },
    deleteButtonText: {
        color: 'white',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        height: 40,
        margin: 12,
    },
});
