import React from "react";
import { Image, View } from "react-native";
import { images } from "../../Images";

export function CigarreteImage({ image = "", style }) {
  const source = images.images[image];
  if (!source) {
    return (
      <View>
        <Image
          style={style}
          source={{
            uri: image,
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <Image style={style} source={images.images[image]} />
    </View>
  );
}
