import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

//images
import logo from "../assets/logo.png";

//api
import api from "../services/api";

//components
import Loading from "../components/Loading";
import Errors from "../components/Errors";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

    // AsyncStorage.clear()

  //   test if user is setted
  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) navigation.navigate("List");
    });
  }, []);

  async function handleSubmit() {
    setLoading(true);


    const res = await api.post("/sessions", {
      email
    });

    const { _id } = res.data;


    await AsyncStorage.setItem("user", _id);
    await AsyncStorage.setItem("techs", techs);

    setLoading(false);

    navigation.navigate("List");
    // else setError(true);

  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {loading ? <Loading></Loading> : null}
      {error ? <Errors></Errors> : null}
      <Image source={logo}></Image>
      <View style={styles.form}>
        <Text style={styles.label}>E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          keyboardType="email-address"
          autocorrect={false}
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
        ></TextInput>

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias do seu interesse"
          autocorrect={false}
          autoCapitalize="words"
          onChangeText={text => setTechs(text)}
        ></TextInput>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar Spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  form: {
    alignSelf: "stretch",
    marginTop: 20
  },

  label: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#444",
    marginBottom: 8,
    marginTop: 20
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    paddingHorizontal: 30,
    paddingVertical: 10
  },

  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  }
});
