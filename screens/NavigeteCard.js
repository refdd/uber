import { Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import vars from "../env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin, selectOrigin } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "../components/NavFavorites";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function NavigeteCard() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView className={"bg-white flex-1"}>
      <Text className={"text-center text-gray-900 font-medium text-xl py-3"}>
        Good Morning Refat
      </Text>
      <View className={"border-t border-gray-200 flex-shrink"}>
        <View className={""}>
          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0,
                backgroundColor: "white",
                paddingTop: 20,
              },
              textInput: {
                fontSize: 18,
                backgroundColor: "#dddddf",
                borderRadius: 0,
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0,
              },
            }}
            minLength={2}
            enablePoweredByContainer={false}
            nearbyPlacesAPI={"GooglePlacesSearch"}
            debounce={400}
            fetchDetails={true}
            placeholder="Where to ?"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // console.log(data);
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            query={{
              key: "AIzaSyBEyLYzv_7cx88FI1XAwp1xQj54Mj0IryM",
              language: "en",
            }}
          />
        </View>
        <NavFavorites />
      </View>
      <View className="flex-row bg-white justify-evenly py-2 me-auto border-t border-gray-100">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RideOptionsCard");
          }}
          className={
            "flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between"
          }
        >
          <FontAwesome name="car" size={16} color={"white"} />
          <Text className={"text-white text-center"}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={
            "flex flex-row  w-24 px-4 py-3 rounded-full justify-between"
          }
        >
          <Ionicons name="fast-food-outline" size={16} color={"black"} />
          <Text className={"text-black text-center"}>Rides</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
