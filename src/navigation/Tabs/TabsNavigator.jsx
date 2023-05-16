import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CigarretesScreen } from "../../screens/CigarretesScreen";
import { AdminScreen } from "../../screens/Admin";
import { StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigator } from "../Stack/StackNavigator";

const TabsNav = createBottomTabNavigator();

export function TabsNavigator() {
  return (
    <TabsNav.Navigator sceneContainerStyle={styles.navigator}>
      <TabsNav.Screen
        name="CigarretesScreen"
        component={CigarretesScreen}
        options={{
          title: "Lista de Cigarros",
          headerStyle: { backgroundColor: "#26031e" },
          headerTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <TabsNav.Screen
        name="AdminStack"
        component={StackNavigator}
        options={{
          headerShown: false,
          title: "Administrador",
          headerStyle: { backgroundColor: "#26031e" },
          headerTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size} color={color} />
          ),
        }}
      />
    </TabsNav.Navigator>
  );
}

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: "#40273a",
  },
});
