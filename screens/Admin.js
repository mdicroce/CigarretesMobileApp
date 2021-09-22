import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { FAB, Icon, Input } from "react-native-elements";
import {
  readAsStringAsync,
  writeAsStringAsync,
  documentDirectory,
  makeDirectoryAsync,
  getInfoAsync,
} from "expo-file-system";
import data from "../json/cigarretes.json";
import { images } from "../Images";
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
  }, []);
  React.useEffect(() => {
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
  }, [cigarretesList]);
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
      <FAB icon={<Icon type="antdesign" name="check" color="red" />} />
      <ScrollView>{cigarretesToShow}</ScrollView>
    </View>
  );
};

const CigarreteChart = (props) => {
  return (
    <View>
      <Image source={images.images[props.photo]} />
      <Text>{props.name}</Text>
      <Input
        keyboardType="decimal-pad"
        placeholder="Ingrese el precio actualizado"
        onChange={props.onChangeHandler}
      />
    </View>
  );
};
