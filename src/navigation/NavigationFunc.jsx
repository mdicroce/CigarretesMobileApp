/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from "@react-navigation/native";
import { TabsNavigator } from "./Tabs/TabsNavigator";
import { useDatabase } from "../utils/DatabaseHandler";
import { useEffect } from "react";

export function NavigationFunc() {
  const { dataInicializer } = useDatabase();
  useEffect(() => {
    dataInicializer();
  }, []);
  return (
    <NavigationContainer>
      <TabsNavigator />
    </NavigationContainer>
  );
}
