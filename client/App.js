import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, SafeAreaView, StyleSheet, Text, View, Pressable, ScrollView, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import WorkoutList from './components/WorkoutList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';




const Stack = createStackNavigator();

function MainScreen({ navigation }) {
  const [date, setDate] = useState(new Date());

  const changeDate = (numDays) => {
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + numDays);
    setDate(newDate);
  };

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
        <WorkoutList selectedDate={date} />
        <Pressable styles={{ color: '#DDDDDD' }}>
          <Text styles={{ color: 'white' }}>Press me</Text>
        </Pressable>
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
      const response = await axios.post('http://localhost:8080/api/register', {
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
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
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

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password
      });

      if (response.status === 200) {
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
    <View style={styles.container2}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 18
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 18
  },
  registerButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  registerButtonText: {
    color: 'white',
    fontSize: 20
  }
});