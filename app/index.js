import MyDropdownPicker from "@/src/MyDropdownPicker";
import TextInputModal from "@/src/TextInputModal";
import useGallery from "@/src/use-gallery";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function Index() {
  const {
    pickImage,
    deleteImage,
    imagesWithAddButton,
    selectedAlbum,
    modalVisible,
    openModal,
    closeModal,
  } = useGallery();
  const onPressOpenGallery = () => {
    pickImage();
  };
  const onLongPressImage = (imagesId) => deleteImage(imagesId);
  const onPressAddAlbum = () => {
    openModal();
  };
  const renderItem = ({ item: { id, uri }, index }) => {
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgray",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "100", fontSize: 45 }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onLongPress={() => onLongPressImage(id)}>
        <Image
          source={{ uri: uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 Dropdown, 앨범 추가 버튼, 이미지 목록 */}
      <MyDropdownPicker
        selectedAlbumTitle={selectedAlbum.title}
        onPressAddAlbum={onPressAddAlbum}
      />

      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal modalVisible={modalVisible} />
      {/* 이미지 리스트 */}
      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
});
