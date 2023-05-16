import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { CigarreteForm } from "../components/CigarreteForm";
import { Button } from "react-native-elements";
import { useDatabase } from "../utils/DatabaseHandler";

export function AddChangeCigarrete({ navigation, route }) {
  const id = route.params?.id;
  const { addCigarreteDB, modifyCigarreteDB } = useDatabase();
  const stateCigarrete = useSelector((state) =>
    state.cigarrete.cigarretes.find((cig) => cig.id === id)
  );
  const [cigarrete, setCigarrete] = useState(
    id !== undefined
      ? stateCigarrete
      : {
          name: "",
          photo: "",
          price: 0.0,
        }
  );

  function addCigarrete() {
    addCigarreteDB(cigarrete);
    navigation.goBack();
  }

  function changeCigarrete() {
    modifyCigarreteDB(cigarrete);
    navigation.goBack();
  }

  let onSubmit = addCigarrete;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: id !== undefined ? "Cambiar Cigarrillo" : "Agregar Cigarrillo",
    });
  }, [id]);

  if (id != undefined) {
    onSubmit = changeCigarrete;
  }

  return (
    <View style={styles.container}>
      <CigarreteForm
        cigarreteToChange={cigarrete}
        onChange={(type, text) => {
          setCigarrete((cig) => ({ ...cig, [type]: text }));
        }}
      />
      <Button title={"Submit"} onPress={onSubmit} />
    </View>
  );
}
// 1.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#50273a",
    padding: 20,
  },
});
