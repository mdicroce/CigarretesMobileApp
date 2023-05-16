import React, { useEffect } from "react";
import { NavigationFunc } from "./src/navigation/NavigationFunc";
import { StatusBar } from "expo-status-bar";
import { documentDirectory } from "expo-file-system";
import { dataInicializer, useDatabase } from "./src/utils/DatabaseHandler";
import { Provider } from "react-redux";
import { cigarretesStore } from "./src/store/CigarretesStore";

export default function App() {
  

  return (
    <>
      <StatusBar style="inverted" />
      <Provider store={cigarretesStore}>
        <NavigationFunc />
      </Provider>
    </>
  );
}
