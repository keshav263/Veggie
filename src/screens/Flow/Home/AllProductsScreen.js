import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, BackHandler, Alert } from "react-native";
import Colors from "../../../constants/Colors";
import Header from "../../../components/General/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import fonts from "../../../constants/fonts";
import {
  useFocusEffect,
  useBackButton,
  TabActions,
  StackActions,
} from "@react-navigation/native";
import AllProducts from "../../../components/Home/AllProducts";

const AllProductsScreen = ({ route, navigation }) => {
  const { title, subCategory, categories } = route.params;

  const Tab = createMaterialTopTabNavigator();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        const jumpToAction = StackActions.replace("Home");
        navigation.dispatch(jumpToAction);
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header text={title} />
      <Tab.Navigator
        initialLayout={{ width: Dimensions.get("window").width }}
        lazy={true}
        tabBarOptions={{
          scrollEnabled: true,
          allowFontScaling: true,
          tabStyle: { height: 60, width: 80 },
          activeTintColor: Colors.primary,
          labelStyle: {
            textTransform: "capitalize",
            fontFamily: fonts.Bold,
            fontSize: 10,
          },
          indicatorStyle: { backgroundColor: Colors.tertiary },
        }}
      >
        {categories.map((cat) => {
          return (
            <Tab.Screen
              key={cat.name}
              name={cat.name}
              children={(props) => {
                return (
                  <AllProducts
                    category={cat.name}
                    subCategory={subCategory}
                    title={title}
                  />
                );
              }}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 25,
  },
});

export default AllProductsScreen;
