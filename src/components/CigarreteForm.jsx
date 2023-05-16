import * as React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";
import { ImagePicker } from "./ImagePicker";

export function CigarreteForm({ cigarreteToChange, onChange }) {
  function onChangePrice(text) {
    onChange("price", Number(text));
  }
  return (
    <KeyboardAvoidingView>
      <Input
        onChangeText={onChange.bind(this, "name")}
        label="Nombre"
        value={cigarreteToChange.name}
        inputMode="text"
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
      />
      <Input
        onChangeText={onChangePrice.bind(this)}
        label="Precio"
        value={String(cigarreteToChange.price)}
        inputMode="decimal"
        keyboardType="decimal-pad"
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
      />
      <ImagePicker
        pickedImage={cigarreteToChange.photo}
        setPickedImage={onChange.bind(this, "photo")}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    color: "#eee",
  },
  labelStyle: {
    color: "#ddd",
  },
});
