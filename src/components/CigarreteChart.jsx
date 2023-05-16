/* eslint-disable react/prop-types */
import React from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CigarreteImage } from "./CigarreteImage";
import { useNavigation } from "@react-navigation/native";
import { useDatabase } from "../utils/DatabaseHandler";

export function CigarreteChart({ id, price, name, image }) {
  const navigation = useNavigation();
  const { deleteCigarreteDB } = useDatabase();
  const onPressHandler = () => {
    navigation.navigate("AddChangeCigarrete", { id: id });
  };

  return (
    <Pressable onPress={onPressHandler} style={styles.cigarreteShow}>
      <View style={styles.flowRow}>
        <View style={{ flex: 4 }}>
          <Text style={styles.textTitle}>{name}</Text>
          <Text style={{ color: "#ff89d6", ...styles.textInfo }}>
            Precio: {price}
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrap}>
              <Button
                title="Eliminar cigarrillo"
                color="#872020"
                onPress={() => {
                  Alert.alert(
                    "Eliminar",
                    "¿Desea eliminar este cigarrillo de la lista?",
                    [
                      {
                        text: "Si",
                        style: "destructive",
                        onPress: () => {
                          deleteCigarreteDB(id);
                        },
                      },
                      {
                        text: "No",
                        style: "cancel",
                      },
                    ]
                  );
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <CigarreteImage image={image} style={styles.imageCigarrete} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cigarreteShow: {
    backgroundColor: "#847c85",
    borderRadius: 5,
    padding: 10,
    display: "flex",
    marginBottom: 10,
    justifyContent: "flex-start",
    margin: 10,
  },
  imageCigarrete: {
    overflow: "hidden",
    height: 100,
    width: 60,
    resizeMode: "cover",
  },
  cigarretesShowButtons: {
    padding: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textTitle: {
    fontSize: 20,
    textTransform: "uppercase",
    color: "white",
  },
  textInfo: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  background: {},
  buttonStyle: {
    width: 45,
    marginRight: 5,
  },
  flowRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceButton: {
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 16,
  },
  buttonWrap: { width: "80%" },
});
