import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert} from "react-native";
import { auth } from "../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { async } from "firebase/util";

const SignUpScreen = ({navigation, route}) => {

    // state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // event handlers
    const onCreateAccountPressed = async() => {
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, username, password)
            console.log(`account created succesfullt ${userCredentials}`)
            Alert.alert(`Success`,`Account created succesfully!`)
        } catch(err){
            Alert.alert(`Error occured ${err}`)
        }
    }

    return(
        <View>

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
    inputStyle : {
        height: 50,
        margin: 10,
        padding: 5,
        borderColor: 'orangered',
        borderWidth: 1,
    },
    buttonStyle: {
        height: 50,
        margin: 10,
        padding: 5,
        backgroundColor:'orangered',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonTextStyle: {
        fontWeight: 'bold',
        color:'#fff',
    }
});

export default SignUpScreen;