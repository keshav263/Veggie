import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/Flow/Home/HomeScreen";
import AllProductsScreen from "../../screens/Flow/Home/AllProductsScreen";
import WIshlistScreen from "../../screens/Flow/Home/WIshlistScreen";
const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
      <HomeStackNavigator.Screen
        name="AllProducts"
        component={AllProductsScreen}
      />
      <HomeStackNavigator.Screen name="Wishlist" component={WIshlistScreen} />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeNavigator;
