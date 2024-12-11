import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "342",
    title: "Order Food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];
const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(item.screen);
          }}
          className={`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 ${
            origin ? "opacity-1" : "opacity-60"
          }`}
          disabled={!origin}
        >
          <View>
            <Image
              className={"h-[120px] w-[140px] "}
              style={{ resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text className={"text-lg font-semibold mt-2"}> {item.title}</Text>
          </View>

          <View className={"p-2 bg-black rounded-full w-10 mt-4 "}>
            <Icon type="antdesign" name="arrowright" color={"white"} />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
