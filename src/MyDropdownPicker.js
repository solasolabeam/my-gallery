import { Text, TouchableOpacity, View } from "react-native";

const headerheight = 50;

export default ({ selectedAlbumTitle, onPressAddAlbum }) => {
  return (
    <View
      style={{
        height: headerheight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{selectedAlbumTitle}</Text>
      <TouchableOpacity
        onPress={onPressAddAlbum}
        style={{
          position: "absolute",
          right: 0,
          height: headerheight,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 12 }}>앨범 추가</Text>
      </TouchableOpacity>
    </View>
  );
};
