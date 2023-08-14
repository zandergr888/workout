import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet, Modal, Button, Dimensions, TouchableWithoutFeedback, TextInput } from 'react-native';
import initialWorkouts from '../data/workouts';
import { EvilIcons } from '@expo/vector-icons'; 

import axios from 'axios';

export default function WorkoutList({ selectedDate }) {

    selectedDate = selectedDate.toDateString().substring(4)

    const [workouts, setWorkouts] = useState(initialWorkouts);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [addWorkoutVisible, setAddWorkoutVisible] = useState(false);
    const [newWorkoutName, setNewWorkoutName] = useState('');
    const [newWorkoutBestSet, setNewWorkoutBestSet] = useState('');
    const [newWorkoutSets, setNewWorkoutSets] = useState([]);
    const [newSetReps, setNewSetReps] = useState('');
    const [newSetWeight, setNewSetWeight] = useState('');

    useEffect(() => {
        axios.get('http://ec2-34-238-42-150.compute-1.amazonaws.com:8080/api/workouts')
            .then(res => {
                // workouts retrieved successfully
                setWorkouts(res.data);
            })
            .catch(err => {
                // something went wrong
                console.error(err);
            });
    }, []);

    const addSetToWorkout = () => {
        setNewWorkoutSets([
            ...newWorkoutSets,
            { reps: newSetReps, weight: newSetWeight }
        ]);
        setNewSetReps('');
        setNewSetWeight('');
    };


    const deleteWorkout = (id) => {
        axios.delete(`http://ec2-34-238-42-150.compute-1.amazonaws.com:8080/api/workouts/${id}`)
            .then(res => {
                // workout was deleted successfully
                console.log(res.data);
                setWorkouts(workouts.filter(workout => workout._id !== id));
            })
            .catch(err => {
                // something went wrong
                console.error(err);
            });
    };

    const addWorkout = () => {
        const newWorkout = {
            name: newWorkoutName,
            bestSet: newWorkoutBestSet,
            date: selectedDate,
            sets: newWorkoutSets,
            usersID: '1',
        };

        axios.post('http://ec2-34-238-42-150.compute-1.amazonaws.com:8080/api/workouts', newWorkout)
            .then(res => {
                // workout was created successfully
                console.log(res.data);
                setWorkouts([...workouts, res.data]);
            })
            .catch(err => {
                // something went wrong
                console.error(err);
            });

        setNewWorkoutName('');
        setNewWorkoutBestSet('');
        setNewWorkoutSets([]);
        setAddWorkoutVisible(false);
    };
    const workoutsForDate = workouts.filter(
        (workout) => workout.date === selectedDate
    );
    return (
        <View>
            {workoutsForDate.length > 0 ? (
                workoutsForDate.map((workout, index) => (
                    <View
                        key={index}
                        style={styles.workout}
                        onStartShouldSetResponder={() => {
                            setSelectedWorkout(workout);
                            return true;
                        }}
                    >
                        <View style={styles.workoutItem}>
                            <Text style={styles.workoutName}>{workout.name}</Text>
                            <Pressable style={styles.deleteButton}
                                onPress={() => deleteWorkout(workout._id)}
                            >
                                <EvilIcons name="trash" size={24} color="red" />
                            </Pressable>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noWorkout}>No workouts for this date</Text>
            )}

            <Pressable style={styles.addButton}
                onPress={() => setAddWorkoutVisible(true)}
            >
                <Text style={styles.addButtonText}>Add Workout</Text>
            </Pressable>

            {selectedWorkout && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={selectedWorkout != null}
                    onRequestClose={() => {
                        setSelectedWorkout(null);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => setSelectedWorkout(null)}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.exerciseName}>{selectedWorkout.name}</Text>
                                {selectedWorkout.sets.map((set, index) => (
                                    <View key={index} style={styles.setRow}>
                                        <Text>Set {index + 1}</Text>
                                        <Text>{set.weight} x {set.reps}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}


            {addWorkoutVisible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addWorkoutVisible}
                    onRequestClose={() => {
                        setAddWorkoutVisible(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => setAddWorkoutVisible(false)}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>New Workout</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setNewWorkoutName}
                                    value={newWorkoutName}
                                    placeholder="Workout Name"
                                />
                                {/* Remove sets, weight, reps TextInput */}
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setNewSetReps}
                                    value={newSetReps}
                                    placeholder="Set Reps"
                                />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setNewSetWeight}
                                    value={newSetWeight}
                                    placeholder="Set Weight"
                                />
                                <Button title="Add set" onPress={addSetToWorkout} />
                                <Button title="Add To Workout" onPress={addWorkout} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
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
        backgroundColor: "#A9A9A9", // Changed from "white" to "A9A9A9" for a gray color
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
    exerciseName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    setRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '60%',
    },
    workoutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deleteButton: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
});