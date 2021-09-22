import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import { FAB, Icon, Input } from "react-native-elements";
import { readCigarretes } from "./Admin";
import { images } from "../Images";
import { Button } from "react-native-elements/dist/buttons/Button";

export const CigarretesScreen = (props) => {
  const [listOfCigarretes, setListOfCigarretes] = React.useState([]);
  const [showListOfCigarretes, setShowListOfCigarretes] = React.useState([]);

  React.useEffect(() => {
    readCigarretes(setListOfCigarretes, listOfCigarretes).then((response) => {
      setListOfCigarretes(
        listOfCigarretes.map((actualCigarrete) => {
          return { ...actualCigarrete, cuantity: 0 };
        })
      );
    });
  }, []);
  React.useEffect(() => {
    setShowListOfCigarretes(
      listOfCigarretes.map((actualCigarrete) => {
        return (
          <CigarreteToShow
            key={actualCigarrete.name}
            photo={actualCigarrete.photo}
            name={actualCigarrete.name}
            onPressHandler={(plus) => {
              setListOfCigarretes(
                listOfCigarretes.map((aCigarrete) => {
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
  }, [listOfCigarretes]);
  return (
    <View>
      <ShowTotal cigarretesList={listOfCigarretes} />
      {/* <ScrollView>{showListOfCigarretes}</ScrollView> */}
    </View>
  );
};

const ShowTotal = (props) => {
  console.log(props.cigarretesList);
  const total = props.cigarretesList.reduce(
    (previus, current) => {
      return (previus += current.price * current.cuantity);
    },
    [0]
  );
  return (
    <View>
      {/* <FAB
        title="Ver Total"
        onPress={() => {
          console.log("hola");
        }}
      /> */}
      <Button
        onPress={() => {
          console.log("hola");
        }}
        title="hola"
      >
        hola
      </Button>
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
