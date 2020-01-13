import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

import api from "../services/api";

import Loading from "../components/Loading";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Item } from "react-native/Libraries/Components/Picker/Picker";

function SpotList({ tech, navigation }) {
  const [loading, setLoading] = useState(false);
  const [spots, setSpots] = useState();

  useEffect(() => {
    async function loadSpots() {
      setLoading(true);

      const res = await api.get("/spots", {
        params: { tech }
      });

      setSpots(res.data);
      setLoading(false);
    }
    loadSpots();
  }, []);

  function handleNavigate(id){
      navigation.navigate('Book', {id})
  }

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <View style={styles.container}>
        <Text style={styles.title}>
          Empresas que usam <Text style={styles.bold}>{tech}</Text>
        </Text>
        <FlatList
          style={styles.list}
          data={spots}
          keyExtractor={spot => spot._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image
                style={styles.thumbnail}
                source={{ uri: item.thumbnail_url }}
              ></Image>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.price}>
                {item.price ? `R$ ${item.price}/dia` : "Gratuito"}
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => handleNavigate(item._id)}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20
  },

  title: {
    fontSize: 20,
    color: "#444",
    marginBottom: 15
  },

  bold: {
    fontWeight: "bold"
  },

  list: {
  },

  listItem: {
    marginRight: 15
  },

  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: "cover",
    borderRadius: 5
  },

  company: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10
  },

  price: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
  },

  button: {
    marginTop: 10,
    padding: 10,
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


export default withNavigation(SpotList)