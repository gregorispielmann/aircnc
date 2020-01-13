import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  AsyncStorage,
  StyleSheet,
  Alert
} from "react-native";
import socketio from "socket.io-client";

//images
import logo from "../assets/logo.png";

//components
import SpotList from "../components/SpotList";
import { ScrollView } from "react-native-gesture-handler";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://localhost:3333/", {
        query: { user_id }
      });

    socket.on("booking_res", b => {
      Alert.alert(
        `Sua reserva em ${b.spot.company} em ${b.date} foi ${
          b.approved ? "APROVADA!" : "REJEITADA"
        }`
      );
    });
  })}, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      const techsArray = storagedTechs.split(",").map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>
      <ScrollView>
        {techs.length > 0 ? (
          techs.map(tech => <SpotList key={tech} tech={tech}></SpotList>)
        ) : (
          <Text>Nenhum spots encontrado!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 35,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
