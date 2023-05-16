import React, { useLayoutEffect } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { CigarreteChart } from "../components/CigarreteChart";
import { IconButton } from "../components/UI/IconButon";
import { useDatabase } from "../utils/DatabaseHandler";

export const AdminScreen = ({ navigation }) => {
  const cigarretesList = useSelector((state) => state.cigarrete.cigarretes);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerButton}>
            <IconButton
              icon="add-circle"
              color="#847c85"
              size={24}
              onPress={() => {
                navigation.navigate("AddChangeCigarrete");
              }}
            >
              Agregar Nuevo
            </IconButton>
          </View>
        );
      },
    });
  }, [cigarretesList]);

  return (
    <View style={styles.background}>
      <FlatList
        data={cigarretesList}
        keyExtractor={(cig) => cig.id}
        renderItem={(itemData) => {
          const { item } = itemData;
          return (
            <CigarreteChart
              id={item.id}
              name={item.name}
              image={item.photo}
              price={item.price}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#40273a",
  },
  cigarreteShow: {
    backgroundColor: "#847c85",
    borderRadius: 5,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "space-between",
  },
  imageCigarrete: {
    overflow: "hidden",
    height: 100,
    width: 60,
    resizeMode: "cover",
  },
  textTitle: {
    fontSize: 18,
    textTransform: "uppercase",
    color: "white",
    marginLeft: 5,
  },
  textInfo: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  rowView: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: 20,
  },
  headerButton: {
    margin: 4,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 8,
  },
});
