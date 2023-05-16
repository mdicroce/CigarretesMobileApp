import React, { useLayoutEffect } from "react";

import { StyleSheet, View, Alert, FlatList } from "react-native";

import { CigarreteToShow } from "../components/CigarreteToShow";
import { IconButton } from "../components/UI/IconButon";
import { useSelector } from "react-redux";

export const CigarretesScreen = function ({ navigation }) {
  const listOfCigarretes = useSelector((state) => {
    return state.cigarrete.cigarretes;
  });
  let total = 0;
  const changeTotal = (cuantity, price) => {
    total += price * cuantity;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButton}>
          <IconButton
            icon="calculator"
            color="#847c85"
            size={24}
            onPress={() => {
              Alert.alert("Total", `El total de cigarros es ${total}`);
            }}
          >
            Total
          </IconButton>
        </View>
      ),
    });
  }, [navigation, total]);

  return (
    <View style={styles.background}>
      <View>
        <FlatList
          data={listOfCigarretes}
          keyExtractor={(cig) => cig.id}
          renderItem={(itemData) => {
            const { item } = itemData;
            return (
              <CigarreteToShow
                name={item.name}
                image={item.photo}
                price={item.price}
                changeTotal={changeTotal}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cigarreteShow: {
    backgroundColor: "#847c85",
    borderRadius: 5,
    padding: 10,
    display: "flex",
    marginBottom: 10,
    justifyContent: "flex-start",
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
    justifyContent: "space-evenly",
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
  background: {
    paddingHorizontal: 12,
  },
  buttonStyle: {
    width: 45,
    marginRight: 5,
  },
  flowRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonAndInfo: {
    justifyContent: "flex-end",
  },
  scrollView: {
    paddingTop: 12,
  },
  headerButton: {
    margin: 4,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 8,
  },
});
