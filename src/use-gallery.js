import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const defaultAlbum = {
  id: 1,
  title: "기본",
};

const ASYNC_KEY = {
  IMAGES: "images",
  ALBUMS: "albums",
};

export default () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum); // 추가
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textIntputModalVisible, setTextInputModalVisible] = useState(false);
  const [bigImgtModalVisible, setBigImgModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // 추가

  const _setImages = (newImages) => {
    setImages(newImages);
    AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages));
  };
  const _setAlbums = (newAlbums) => {
    setAlbums(newAlbums);
    AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbums));
  };

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
        albumId: selectedAlbum.id,
      };
      _setImages([...images, newImage]);
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
          _setImages(newImages);
        },
      },
    ]);
  };

  const openTextInputModal = () => setTextInputModalVisible(true);
  const closeTextInputModal = () => setTextInputModalVisible(false);
  const openBigImgModal = () => setBigImgModalVisible(true);
  const closeBigImgModal = () => setBigImgModalVisible(false);
  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const addAlbun = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };
    _setAlbums([...albums, newAlbum]);
  };
  const selectAlbum = (album) => {
    console.log("select! album", album);
    setSelectedAlbum(album);
  };
  const deleteAlbum = (albumId) => {
    if (albumId === defaultAlbum.id) {
      Alert.alert("기본 앨범은 삭제할 수 없어요!");
      return;
    }
    Alert.alert("앨범를 삭제하시겠어요?", "", [
      {
        text: "아니오",
        style: "cancel",
      },
      {
        text: "네",
        onPress: () => {
          const newAlbums = albums.filter((album) => album.id !== albumId);
          _setAlbums(newAlbums);
          setSelectedAlbum(defaultAlbum);
        },
      },
    ]);
  };
  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const filteredImages = images.filter(
    (image) => image.albumId === selectedAlbum.id
  );

  const moveToPreviousImage = () => {
    if (!selectedImage) return;
    // filteredImages;
    const selectedImageIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );
    const previousImageIdx = selectedImageIndex - 1;
    if (previousImageIdx < 0) return;
    const previousImage = filteredImages[previousImageIdx];
    setSelectedImage(previousImage);
  };
  const moveToNextImage = () => {
    if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );
    const nextImageIdx = selectedImageIndex + 1;
    if (nextImageIdx > filteredImages.length - 1 || nextImageIdx === -1) return;
    const nextImage = filteredImages[nextImageIdx];
    setSelectedImage(nextImage);
  };

  const showPreviousArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !== 0;
  const showNextArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !==
    filteredImages.length - 1;

  const resetAlbumTitle = () => setAlbumTitle("");

  const imagesWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "",
    },
  ];

  const intitValues = async () => {
    // images
    const imagesFromStorge = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
    if (imagesFromStorge !== null) {
      const parsed = JSON.parse(imagesFromStorge);
      setImages(parsed);
    }
    // albums
    const albumFromStorge = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS);
    if (albumFromStorge !== null) {
      console, log("albumFromStorge", albumFromStorge);
      const parsed = JSON.parse(albumFromStorge);
      setAlbums(parsed);
    }
  };
  useEffect(() => {
    intitValues();
  }, []);
  return {
    imagesWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    textIntputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbun,
    resetAlbumTitle,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImgtModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  };
};
