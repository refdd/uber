import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { FlatList } from "react-native";
import { Button, Icon } from "@rneui/themed";
const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destiation: "code street , london , UK",
  },
  {
    id: "1234",
    icon: "briefcase",
    location: "Work",
    destiation: "code Eye , london , UK",
  },
];
export class NavFavorites extends Component {
  render() {
    return (
      <FlatList
        ItemSeparatorComponent={() => (
          <View className="bg-gray-200 " style={{ height: 0.5 }} />
        )}
        data={data}
        renderItem={(item) => (
          <TouchableOpacity className={"flex-row  items-center p-5"}>
            <View className={"mr-4 rounded-full bg-gray-300 p-3 "}>
              <Icon name={item.item.icon} type="ionicon" color="#fff" />
            </View>
            <View>
              <Text className={"font-semibold text-lg"}>
                {item.item.location}
              </Text>
              <Text className={"text-gray-500 "}>{item.item.destiation}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }
}

export default NavFavorites;
