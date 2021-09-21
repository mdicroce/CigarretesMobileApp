import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { FAB, Icon } from "react-native-elements";
import {
  readAsStringAsync,
  writeAsStringAsync,
  documentDirectory,
  makeDirectoryAsync,
  getInfoAsync,
} from "expo-file-system";
import { Asset, useAssets, AssetMetadata } from "expo-asset";
import { Input } from "react-native-elements";
import data from "../json/cigarretes.json";
export const readCigarretes = async (setStore, store) => {
  const folder = documentDirectory + "cigarretes/";
  const dirInfo = await getInfoAsync(folder);
  if (!dirInfo.exists) {
    await makeDirectoryAsync(folder, { intermediates: true });
  } else {
    const fileInfo = await getInfoAsync(folder + "cigarretes.json");
    if (fileInfo.exists && fileInfo.size !== 0) {
      const list = await readAsStringAsync(folder + "/cigarretes.json");

      await setStore([...JSON.parse(list)]);
    } else {
      await writeAsStringAsync(
        folder + "cigarretes.json",
        JSON.stringify(data)
      );
      await setStore([...data]);
    }
  }
};

export const AdminScreen = (props) => {
  const [cigarretesList, setCigarretesList] = React.useState([]);
  const [cigarretesToShow, setCigarretesToShow] = React.useState([]);
  React.useEffect(() => {
    readCigarretes(setCigarretesList, cigarretesList);
    setCigarretesToShow(
      cigarretesList.map((actualCigarrete) => {
        return (
          <CigarreteChart
            key={actualCigarrete.name}
            photo={actualCigarrete.photo}
            name={actualCigarrete.name}
            onChangeHandler={(input) => {
              setCigarretesList(
                cigarretesList.map((actualC) => {
                  if (actualC.name === actualCigarrete.name) {
                    return { ...actualC, price: input };
                  } else {
                    return actualC;
                  }
                })
              );
            }}
          />
        );
      })
    );
  }, []);
  const submitHandler = async () => {
    const folder = cacheDirectory + "cigarretes/";
    const dirInfo = await getInfoAsync(folder);
    if (!dirInfo.exists) {
      await makeDirectoryAsync(folder, { intermediates: true });
    } else {
      await writeAsStringAsync(
        folder + "cigarretes.json",
        JSON.stringify(cigarretesList)
      );
      props.navigation.navigate("CigarretesScreen");
    }
  };

  return (
    <View>
      <ScrollView>{cigarretesToShow}</ScrollView>
      <FAB icon={<Icon type="antdesign" name="check" color="red" />} />
    </View>
  );
};

const CigarreteChart = (props) => {
  return (
    <View>
      <Image source={{ uri: "../assets/IMG/" + props.photo }} />
      <Text>{props.name}</Text>
      <Input
        keyboardType="decimal-pad"
        placeholder="Ingrese el precio actualizado"
        onChange={props.onChangeHandler}
      />
    </View>
  );
};
