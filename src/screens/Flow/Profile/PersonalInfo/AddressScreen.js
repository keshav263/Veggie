import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
import SingleAddress from "../../../../components/General/SingleAddress";
import AddLocation from "../../../../components/Profile/AddLocation";
import Colors from "../../../../constants/Colors";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from "react-native-paper";
import { useForm } from "react-hook-form";
import GetExtraLocationDetails from "../../../../components/Profile/GetExtraLocationDetails";
import * as profileActions from "../../../../store/actions/Profile";

const AddressScreen = ({ navigation }) => {
  const addresses = useSelector((state) => state.Profile.locations);
  const token = useSelector((state) => state.Auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();
  const [editAddress, setEditAddress] = useState({
    _id: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const { handleSubmit, control, errors } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editAddress._id.length > 0) {
      refRBSheet.current.open();
    }
  }, [editAddress]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      let restAddress;
      restAddress = editAddress.address.split(",")[2];
      restAddress = editAddress.address.slice(
        editAddress.address.indexOf(restAddress)
      );

      setIsLoading(true);
      await dispatch(
        profileActions.editAddress(
          editAddress._id,
          `${data.building},${data.landmark},${restAddress}`,
          token
        )
      );

      setIsLoading(false);
      refRBSheet.current.close();
    } catch (error) {
      console.log(error);
    }
  };

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
          Hold on...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="My Addresses" textSize={25} />
      </View>
      <AddLocation navigation={navigation} />
      <FlatList
        data={addresses}
        keyExtractor={(Item) => Item._id}
        renderItem={({ item }) => {
          return (
            <SingleAddress
              address={item.address}
              _id={item._id}
              setIsLoading={setIsLoading}
              setEditAddress={setEditAddress}
              latitude={item.latitude}
              longitude={item.longitude}
            />
          );
        }}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
            shadowOpacity: 10,
            backfaceVisibility: "visible",
          },
          draggableIcon: {
            backgroundColor: Colors.sub,
          },
        }}
      >
        <Text style={styles.simpleText}>Edit</Text>
        <GetExtraLocationDetails
          errors={errors}
          control={control}
          editAddress={editAddress}
        />
        <Button
          style={styles.buttonStyle}
          mode="contained"
          color={Colors.tertiary}
          onPress={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  simpleText: {
    fontSize: 24,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 15,
    fontStyle: "italic",
  },
  buttonStyle: {
    margin: 10,
    paddingVertical: 10,
    bottom: 0,
    position: "absolute",
    width: "95%",
    borderRadius: 5,
  },
});

export default AddressScreen;