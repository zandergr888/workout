import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet, Modal, Button, Dimensions, TouchableWithoutFeedback, TextInput } from 'react-native';
import initialWorkouts from '../data/workouts';
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
        axios.get('http://localhost:8080/api/workouts')
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

    const addWorkout = () => {
        const newWorkout = {
            name: newWorkoutName,
            bestSet: newWorkoutBestSet,
            date: selectedDate,
            sets: newWorkoutSets
        };

        axios.post('http://localhost:8080/api/workouts', newWorkout)
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
                    <Pressable
                        key={index}
                        style={styles.workout}
                        onPress={() => setSelectedWorkout(workout)}
                    >
                        <Text style={styles.workoutName}>{workout.name}</Text>
                    </Pressable>
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
                                <Text style={styles.modalText}>{selectedWorkout.name}</Text>
                                {selectedWorkout.sets.map((set, index) => (
                                    <View key={index}>
                                        <Text>Set {index + 1}</Text>
                                        <Text>Reps: {set.reps}</Text>
                                        <Text>Weight: {set.weight}</Text>
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
