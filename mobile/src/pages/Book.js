import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";

import Loading from "../components/Loading";

import api from '../services/api'

export default function Book({ navigation }) {
  const id = navigation.getParam("id");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleBook() {
    const user_id = await AsyncStorage.getItem("user");

    await api.post(
      `/spots/${id}/bookings`,
      {
        date
      },
      {
        headers: { user_id }
      }
    );

    Alert.alert("Solicitação de reserva enviada com sucesso!");

    navigation.navigate("List");
  }

  function handleCancel() {
    navigation.navigate("List");
  }

  return (
    <View style={styles.container}>
      {loading ? <Loading></Loading> : null}
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        autocorrect={false}
        autoCapitalize="none"
        onChangeText={text => setDate(text)}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleBook}>
        <Text style={styles.buttonText}>Reservar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.cancel]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30
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
    marginTop: 30,
    padding: 20,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },

  cancel: {
    marginTop: 10,
    backgroundColor: "#999"
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  }
});
