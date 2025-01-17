import { SimpleLineIcons } from "@expo/vector-icons";
import { Image, Modal, Pressable, TouchableOpacity, View } from "react-native";

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        justifyContent: "center",
        paddingHorizontal: 20,
        height: "100%",
        color: disabled ? "transparent" : "black",
        // backgroundColor: "lightblue",
      }}
    >
      <SimpleLineIcons name={iconName} size={20} color="black" />
    </TouchableOpacity>
  );
};

export default ({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow,
}) => {
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/*  < 화살표 */}
          <ArrowButton
            iconName="arrow-left"
            onPress={onPressLeftArrow}
            disabled={!showPreviousArrow}
          />

          {/* 이미지 */}
          <Pressable>
            <Image
              source={{ uri: selectedImage?.uri }}
              style={{ width: 280, height: 280, backgroundColor: "white" }}
              resizeMode="contain"
            />
          </Pressable>

          {/*  > 화살표 */}
          <ArrowButton
            iconName="arrow-right"
            onPress={onPressRightArrow}
            disabled={!showNextArrow}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
