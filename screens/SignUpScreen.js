import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert} from "react-native";
import { auth, db } from "../config/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/app';
import 'firebase/firestore';


// import { async } from "firebase/util";

const SignUpScreen = ({navigation, route}) => {

    // state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    // event handlers
    const onCreateAccountPressed = async() => {
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, username, password)
            const newUserDoc = {
                email: username
            }
            const collectionRef = collection(db, "Users");
            const insertedDoc = await addDoc(collectionRef, newUserDoc);
            Alert.alert(`Success`,`Account created succesfully!`)
            navigation.navigate('Now Playing')
        } catch(err){
            Alert.alert(`Error occured ${err}`)
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput 
                style={styles.inputStyle}
                placeholder="Enter Username"
                textContentType="emailAddress"
                autoCapitalize="none"
                returnKeyType="next"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput 
                style={styles.inputStyle}
                placeholder="Enter Password"
                textContentType="password"
                autoCapitalize="none"
                returnKeyType="done"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
          
            <Pressable style={styles.buttonStyle} onPress={onCreateAccountPressed}>
                <Text style={styles.buttonTextStyle}>Create Account</Text>
            </Pressable>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
      },
    inputStyle : {
        width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
    buttonStyle: {
            backgroundColor: '#3f51b5',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginBottom: 10,
          
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default SignUpScreen;