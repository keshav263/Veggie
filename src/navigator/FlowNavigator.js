import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CartNavigator from "./Flow/CartNavigator";
import HomeNavigator from "./Flow/HomeNavigator";
import ProfileNavigator from "./Flow/ProfileNavigator";
import SearchNavigator from "./Flow/SearchNavigator";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RecipeNavigator from "./Flow/RecipeNavigator";

const tabOptions = {
  activeTintColor: Colors.tertiary,
  showLabel: false,
  inactiveTintColor: "gray",
  tabStyle: {
    backgroundColor: "#fff",
  },
};

const FlowTabNavigator = createBottomTabNavigator();

const FlowNavigator = () => {
  const items = useSelector((state) => state.Cart.cartProducts.length);
  return (
    <FlowTabNavigator.Navigator tabBarOptions={tabOptions}>
      <FlowTabNavigator.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => {
          let tabBarVisible;
          const routeName = getFocusedRouteNameFromRoute(route);

          if (routeName === "AllProducts") {
            tabBarVisible = false;
          } else {
            tabBarVisible = true;
          }

          return {
            tabBarVisible,
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={30} color={color} />
            ),
          };
        }}
      />
      <FlowTabNavigator.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={30} color={color} />
          ),
        }}
      />

      <FlowTabNavigator.Screen
        name="Recipe"
        component={RecipeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="pot-steam"
              size={30}
              color={color}
              style={{}}
            />
          ),
        }}
      />
      <FlowTabNavigator.Screen
        name="Cart"
        component={CartNavigator}
        options={({ route }) => {
          let tabBarVisible;
          const routeName = getFocusedRouteNameFromRoute(route);

          if (
            routeName === "PhoneNumber" ||
            routeName === "PaymentMethods" ||
            routeName === "Confirmation" ||
            routeName === "CheckOut"
          ) {
            tabBarVisible = false;
          } else {
            tabBarVisible = true;
          }

          return {
            tabBarVisible,
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={30} color={color} />
            ),
            tabBarBadge: items > 0 ? items : null,
          };
        }}
      />
      <FlowTabNavigator.Screen
        name="Profile"
        component={ProfileNavigator}
        options={({ route }) => {
          let tabBarVisible;
          const routeName = getFocusedRouteNameFromRoute(route);

          if (
            routeName === "EditProfile" ||
            routeName === "AddAddress" ||
            routeName === "SearchLocations" ||
            routeName === "Address" ||
            routeName === "PhoneNumber" ||
            routeName === "OTP" ||
            routeName === "Orders" ||
            routeName === "PaymentMethods" ||
            routeName === "AddCard"
          ) {
            tabBarVisible = false;
          } else {
            tabBarVisible = true;
          }

          return {
            tabBarVisible,
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={30} color={color} />
            ),
          };
        }}
      />
    </FlowTabNavigator.Navigator>
  );
};

export default FlowNavigator;
