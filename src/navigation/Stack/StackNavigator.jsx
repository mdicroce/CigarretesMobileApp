import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AddChangeCigarrete } from "../../screens/AddChangeCigarrete";
import { AdminScreen } from "../../screens/Admin";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Admin"
        component={AdminScreen}
        options={{
          title: "Administrador",
          headerStyle: { backgroundColor: "#26031e" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="AddChangeCigarrete"
        component={AddChangeCigarrete}
        options={{
          headerStyle: { backgroundColor: "#26031e" },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}
