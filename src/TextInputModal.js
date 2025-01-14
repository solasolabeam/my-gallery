import { Modal, View } from "react-native";

export default ({ modalVisible }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={{ flex: 1, backgroundColor: "lightgreen" }}></View>
    </Modal>
  );
};
