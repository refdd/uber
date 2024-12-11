import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestiantion,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import vars from "../env";
import { useRef } from "react";
import { useEffect } from "react";

export default function Map() {
  const [viewMap, setViewMap] = useState(false);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestiantion);
  const mapRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!origin || !destination) return;
    var i = setInterval(() => {
      console.log("i Before", i);

      mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: {
          top: 100,
          right: 100,
          left: 100,
          bottom: 100,
          aimated: true,
        },
      });
      clearInterval(i);
      console.log("i After clear interval", i);
    }, 50);
  }, [origin, destination]);
  // console.log(origin.description);
  useEffect(() => {
    const getTravelTime = async () => {
      if (!origin || !destination) return;
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&units=imperial&key=AIzaSyBEyLYzv_7cx88FI1XAwp1xQj54Mj0IryM`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data?.rows[0].elements[0]));
          // console.log("travel data", data?.rows[0].elements[0]);
        });
    };
    getTravelTime();
  }, [origin, destination, vars.googleApiKey]);
  useEffect(() => {
    setTimeout(() => {
      setViewMap(true);
    }, 1000);
  }, []);
  return (
    <View className={"flex-1"}>
      {viewMap && (
        <MapView
          ref={mapRef}
          mapType="mutedStandard"
          initialRegion={{
            latitude: origin?.location?.lat ? origin?.location?.lat : 40.7614,
            longitude: origin?.location?.lng ? origin?.location?.lng : -73.9741,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          className={"w-full h-full"}
        >
          {origin && destination && (
            <MapViewDirections
              origin={{
                latitude: origin?.location?.lat
                  ? origin?.location?.lat
                  : 40.7614,
                longitude: origin?.location?.lng
                  ? origin?.location?.lng
                  : -73.9741,
              }}
              destination={{
                latitude: destination?.location?.lat
                  ? destination?.location?.lat
                  : 40.7614,
                longitude: destination?.location?.lng
                  ? destination?.location?.lng
                  : -73.9741,
              }}
              apikey={vars?.googleApiKey}
              strokeWidth={3}
              strokeColor="black"
            />
          )}
          {origin.location && (
            <Marker
              coordinate={{
                latitude: origin?.location?.lat
                  ? origin?.location?.lat
                  : 40.7614,
                longitude: origin?.location?.lng
                  ? origin?.location?.lng
                  : -73.9741,
              }}
              title={"origin"}
              description={origin?.description}
              identifier={"origin"}
            />
          )}
          {destination && (
            <Marker
              coordinate={{
                latitude: destination?.location?.lat
                  ? destination?.location?.lat
                  : 40.7614,
                longitude: destination?.location?.lng
                  ? destination?.location?.lng
                  : -73.9741,
              }}
              title={"destination"}
              description={destination?.description}
              identifier={"destination"}
            />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
