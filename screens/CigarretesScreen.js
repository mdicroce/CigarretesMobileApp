import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import { FAB, Icon, Input } from "react-native-elements";
import { readCigarretes } from "./Admin";
import { images } from "../Images";
import { Button } from "react-native-elements/dist/buttons/Button";

async function setCuantity(listOfCigarretes, setListWithCantity) {
  await setListWithCantity(
    listOfCigarretes.map((actualCigarrete) => {
      return { ...actualCigarrete, cuantity: 0 };
    })
  );
}

export const CigarretesScreen = (props) => {
  const [listOfCigarretes, setListOfCigarretes] = React.useState([]);
  const [listWithCuantity, setListWithCuantity] = React.useState([]);
  const [showListOfCigarretes, setShowListOfCigarretes] = React.useState([]);

  React.useEffect(() => {
    readCigarretes(setListOfCigarretes, listOfCigarretes);
  }, []);
  React.useEffect(() => {
    setCuantity(listOfCigarretes, setListWithCuantity);
  }, [listOfCigarretes]);
  React.useEffect(() => {
    setShowListOfCigarretes(
      listWithCuantity.map((actualCigarrete) => {
        return (
          <CigarreteToShow
            key={actualCigarrete.name}
            photo={actualCigarrete.photo}
            name={actualCigarrete.name}
            onPressHandler={(plus) => {
              listWithCuantity(
                listWithCuantity.map((aCigarrete) => {
                  if (aCigarrete.name === actualCigarrete.name) {
                    return {
                      ...aCigarrete,
                      cuantity: aCigarrete.cuantity + plus,
                    };
                  } else {
                    return { ...aCigarrete };
                  }
                })
              );
            }}
          />
        );
      })
    );
  }, [listWithCuantity]);
  return (
    <View>
      <ShowTotal cigarretesList={listWithCuantity} />
      <ScrollView>{showListOfCigarretes}</ScrollView>
    </View>
  );
};

const ShowTotal = ({ cigarretesList }) => {
  let total = 0;
  if (Array.isArray(cigarretesList) && cigarretesList.length > 0) {
    cigarretesList.forEach((actualCigarrete) => {
      total += actualCigarrete.cuantity * actualCigarrete.price;
    });
  }

  return (
    <View>
      <FAB
        title="Ver Total"
        onPress={() => {
          Alert.alert("Total", `El total de cigarros es ${total}$`);
        }}
      />
    </View>
  );
};
const CigarreteToShow = (props) => {
  return (
    <View>
      <Image source={images.images[props.photo]} />
      <Text>{props.name}</Text>
      <View>
        <Button
          onPress={() => {
            props.onPressHandler(-10);
          }}
        >
          -10
        </Button>
        <Button
          onPress={() => {
            props.onPressHandler(-5);
          }}
        >
          -5
        </Button>
        <Button
          onPress={() => {
            props.onPressHandler(-1);
          }}
        >
          -1
        </Button>
        <Button
          onPress={() => {
            props.onPressHandler(1);
          }}
        >
          +1
        </Button>
        <Button
          onPress={() => {
            props.onPressHandler(5);
          }}
        >
          +5
        </Button>
        <Button
          onPress={() => {
            props.onPressHandler(10);
          }}
        >
          +10
        </Button>
      </View>
    </View>
  );
};
