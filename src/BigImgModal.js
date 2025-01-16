import { Image, Modal, Pressable, View } from "react-native";

export default ({ modalVisible, onPressBackdrop, selectedImage }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <Pressable
        onPress={onPressBackdrop}
        style={{
          flex: 1,
          //   backgroundColor: "lightblue",
          //   opacity: 0.5,
          backgroundColor: `rgba(77,75,75, 0.8)`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable>
          <Image
            source={{ uri: selectedImage?.uri }}
            style={{ width: 280, height: 280, backgroundColor: "white" }}
            resizeMode="contain"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};
