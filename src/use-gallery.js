import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export default () => {
  const defaultAlbum = {
    id: 1,
    title: "기본",
  };
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum); // 추가
  const [albums, setAlbums] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
      };
      setImages([...images, newImage]);
    }
  };

  const deleteImage = (imagesId) => {
    Alert.alert("이미지를 삭제하시겠어요?", "", [
      {
        text: "아니오",
        style: "cancel",
      },
      {
        text: "네",
        onPress: () => {
          const newImages = images.filter((images) => images.id !== imagesId);
          setImages(newImages);
        },
      },
    ]);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const addAlbun = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };
    setAlbums([...albums, newAlbum]);
  };
  const resetAlbumTitle = () => setAlbumTitle("");
  const imagesWithAddButton = [
    ...images,
    {
      id: -1,
      uri: "",
    },
  ];

  return {
    imagesWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    modalVisible,
    openModal,
    closeModal,
    albumTitle,
    setAlbumTitle,
    addAlbun,
    resetAlbumTitle,
  };
};
