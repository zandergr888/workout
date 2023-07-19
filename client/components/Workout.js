import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const Workout = ({ workout }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable onPress={() => setExpanded(!expanded)}>
      <Text>{workout.name}: Best Set - {workout.bestSet}</Text>
      {expanded && (
        <View>
          {workout.sets.map((set, index) => <Text key={index}>Set {index+1}: {set.reps} x {set.weight}</Text>)}
        </View>
      )}
    </Pressable>
  );
};
