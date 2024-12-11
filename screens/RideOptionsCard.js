import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multipLier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-546",
    title: "Uber XL",
    multipLier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-324",
    title: "Uber LUX",
    multipLier: 1.57,
    image: "https://links.papareact.com/7pf",
  },
];
// if we have surge pricing this goes UP
const SURGE_CHARGE_RATE = 1.5;
const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView className={"bg-white flex-1"}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NavigeteCard");
          }}
          className={"absolute top-3 left-5 z-50 p-3 rounded-full bg-slate-50"}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className={"text-center py-5 text-xl capitalizes "}>
          selecet a Ride {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { image, title, multipLier, id }, item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
            }}
            className={`flex-row justify-between items-center px-4 ${
              selectedItem?.id == id && "bg-gray-200"
            } `}
          >
            <Image
              className="w-[100px] h-[90px] object-contain"
              source={{ uri: image }}
            />
            <View className={"-ml-6"}>
              <Text className={"text-xl font-semibold"}>{title}</Text>
              <Text className={"text-[12px]"}>
                {" "}
                {travelTimeInformation?.duration?.text} Travel Time...{" "}
              </Text>
            </View>
            <Text className="text-3xl ">
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "GBP",
              }).format(
                (travelTimeInformation?.duration?.value *
                  SURGE_CHARGE_RATE *
                  multipLier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View className={"mt-auto border-t border-gray-200 "}>
        <TouchableOpacity
          disabled={!selectedItem}
          className={`bg-black py-3 m-3  ${!selectedItem && "bg-gray-300"}`}
        >
          <Text className="text-center text-white text-xl ">
            {" "}
            Chouse {selectedItem?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
