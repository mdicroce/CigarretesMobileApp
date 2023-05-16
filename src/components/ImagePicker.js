import React from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { CigarreteImage } from "./CigarreteImage";
import { IconButton } from "./UI/IconButon";

export function ImagePicker({ pickedImage, setPickedImage }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      aspect: [5, 3],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <CigarreteImage style={styles.image} image={pickedImage} />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.imagePreview}>{imagePreview}</View>
        <View style={styles.button}>
          <IconButton
            icon="camera"
            color="#40273a"
            size={24}
            onPress={takeImageHandler}
          >
            Change Photo
          </IconButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  image: {
    height: 200,
    width: 120,
  },
  button: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    overflow: "hidden",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    backgroundColor: "#26031e",
    padding: 10,
  },
});
