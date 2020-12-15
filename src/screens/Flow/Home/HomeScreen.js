import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import * as profileActions from "../../../store/actions/Profile";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Button } from "react-native-paper";
import AddressHeader from "../../../components/General/AddressHeader";
import Colors from "../../../constants/Colors";

// import Categories from "../../components/Home/Categories";
// import * as productActions from "../../store/actions/Products";

import Carousel from "../../../components/Home/Carousel";
import ChooseLiveOrOtherLocation from "../../../components/General/ChooseLocationType";

const SCREEN_WIDTH = Dimensions.get("window").width;

const HomeScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);
  const address = useSelector(
    (state) => state.Profile.selectedLocation.address
  );
  const [isLoading, setIsLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (!token) {
          throw new Error();
        }
        await dispatch(profileActions.getProfileData(token));
        //   await dispatch(productActions.getAllProducts(token));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        return Alert.alert(
          "Something Went Wrong!",
          "Please check your internet connection",
          [
            {
              text: "Try Again",
              onPress: async () => {
                fetchData();
              },
            },
          ]
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (address.length === 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [setIsVisible, address]);

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: Colors.bkg,
        }}
      >
        <ActivityIndicator size="large" color={Colors.tertiary} />
        <Text style={{ fontSize: 20, marginVertical: 15, fontStyle: "italic" }}>
          Getting credentials...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <ChooseLiveOrOtherLocation
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
        <AddressHeader setIsVisible={setIsVisible} address={address} />

        <Carousel />

        {/* <Categories /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.bkg,
    // top: -20,
    // borderWidth: 1,
  },
});

export default HomeScreen;
