import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Image } from "react-native";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import vars from "../env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin, selectOrigin } from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";
const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="bg-white h-full">
      <View className={"p-5 "}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          className={"h-[100px] w-[100px]"}
          source={{ uri: "https://links.papareact.com/gzs" }}
        />
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          minLength={2}
          enablePoweredByContainer={false}
          nearbyPlacesAPI={"GooglePlacesSearch"}
          debounce={400}
          fetchDetails={true}
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data);
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          query={{
            key: "AIzaSyBEyLYzv_7cx88FI1XAwp1xQj54Mj0IryM",
            language: "en",
          }}
        />
        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
