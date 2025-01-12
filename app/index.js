import useGallery from "@/src/use-gallery";
import {
  Button,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const { images, pickImage } = useGallery();
  const onPressOpenGallery = () => {
    pickImage();
  };

  const renderItem = ({ item }) => {
    return <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="갤러리 열기" onPress={onPressOpenGallery} />

      <FlatList data={images} renderItem={renderItem} />
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
