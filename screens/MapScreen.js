import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Mpa from "../components/Mpa";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigeteCard from "./NavigeteCard";
import RideOptionsCard from "./RideOptionsCard";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigate = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigate.navigate("Home");
        }}
        className={
          "absolute top-16 left-8 bg-gray-100 p-3 rounded-full shadow-lg z-50"
        }
      >
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>
      <View className={"h-1/2"}>
        <Mpa />
      </View>
      <View className={"h-1/2"}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigeteCard"
            options={{ headerShown: false }}
            component={NavigeteCard}
          />
          <Stack.Screen
            name="RideOptionsCard"
            options={{ headerShown: false }}
            component={RideOptionsCard}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
