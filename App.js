import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./screens/MapScreen";
import { KeyboardAvoidingView } from "react-native";
// 1) Set up redux
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <KeyboardAvoidingView
          behavior="height"
          keyboardVerticalOffset={0}
          style={{ flex: 1 }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="MapScreen"
              options={{ headerShown: false }}
              component={MapScreen}
            />
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </Provider>
  );
}
