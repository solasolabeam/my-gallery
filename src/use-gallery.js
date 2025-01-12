import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default () => {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };
  return {
    images,
    pickImage,
  };
};
