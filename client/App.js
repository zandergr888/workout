import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, SafeAreaView, StyleSheet, Text, View, Pressable, ScrollView, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import WorkoutList from './components/WorkoutList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import UserContext from './components/UserContext';
import RingProgress from './components/RingProgress';
import Value from './components/Value';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';

const Stack = createStackNavigator();

function MainScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [totalSets, setTotalSets] = useState(0); // New state for total sets
  const { loggedInUser } = useContext(UserContext);

  const changeDate = (numDays) => {
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + numDays);
    setDate(newDate);
  };

  useEffect(() => {
    axios.get('http://ec2-34-238-42-150.compute-1.amazonaws.com:8080/api/workouts')
      .then(response => {

        const todayWorkoutsForUser = response.data.filter(workout =>
          workout.date === date.toDateString().substring(4) && workout.usersID === loggedInUser
        );


        const setsForToday = todayWorkoutsForUser.reduce((acc, workout) => acc + workout.sets.length, 0);
        setTotalSets(setsForToday);
      })
      .catch(error => {
        console.error("Error fetching workouts:", error);
      });
  }, [date, loggedInUser]);


  return (
    <SafeAreaView style={styles.container1}
      onTouchStart={e => this.touchX = e.nativeEvent.pageX}
      onTouchEnd={e => {
        if (touchX - e.nativeEvent.pageX < -40) {
          changeDate(-1);
        } else if (touchX - e.nativeEvent.pageX > 40) {
          changeDate(1);
        }
      }}>
      <ScrollView>
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

        {/* add status ring */}

        <RingProgress progress={(totalSets + 1) / 30} />

        <View style={styles.valuesContainer}>
          <Value label="Sets " value={totalSets.toString()} />
          <Value label="Goal Sets " value={30} />
        </View>
        <WorkoutList selectedDate={date} />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://ec2-34-238-42-150.compute-1.amazonaws.com:8080/api/register', {
        username,
        password
      });

      if (response.status === 201) {
        alert('Registered successfully');
        navigation.navigate('Login');
      } else {
        alert('Error during registration');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Error during registration');
      } else {
        alert('Unexpected error. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container2}>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#f0f0f0"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#f0f0f0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#f0f0f0"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={handleRegistration} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </Pressable>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setLoggedInUser } = useContext(UserContext);


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://ec2-34-238-42-150.compute-1.amazonaws.com:8080/api/login', {
        username,
        password
      });

      if (response.status === 200) {
        setLoggedInUser(username);
        navigation.navigate('Main');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Invalid username or password');
      } else {
        alert('Error logging in. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container1}>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#f0f0f0"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#f0f0f0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Register')} style={styles.registerLink}>
        <Text style={styles.linkText}>Don't have an account? Register here.</Text>
      </Pressable>
    </View>
  );
}



export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);


  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}


const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'black',
    padding: 12,
  },
  container2: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    paddingHorizontal: 20
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
  input: {
    borderColor: 'gray',
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 18
  },
  loginButton: {
    backgroundColor: '#37FD12',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  loginButtonText: {
    color: 'black',
    textAlign: 'center'
  },
  registerButton: {
    backgroundColor: '#37FD12',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  registerButtonText: {
    color: 'black',
    textAlign: 'center'
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // This will ensure they are spaced out evenly
    paddingHorizontal: 10,           // Some padding to ensure they are not right at the edge
  },

});