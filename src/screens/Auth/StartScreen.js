import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Divider,
  Snackbar,
} from "react-native-paper";
import FacebookSignIn from "../../components/Auth/FacebookSignIn";
import GoogleSignIn from "../../components/Auth/GoogleSignIn";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/Auth";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";

const StartScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { control, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const onSubmit = async ({ phoneNumber }) => {
    try {
      setIsLoading(true);
      await dispatch(authActions.signInUsingPhoneNumber(phoneNumber));
      setIsLoading(false);
      navigation.navigate("OTPPhoneNumber", {
        phoneNumber: phoneNumber,
      });
    } catch (error) {
      setIsLoading(false);
      return Alert.alert("Something went wrong");
    }
  };

  useEffect(() => {
    errors.phoneNumber ? onToggleSnackBar() : null;
  }, [errors]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Image
          source={require("../../../assets/backgroundLeaves.png")}
          resizeMode="cover"
          style={styles.imageStyle}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, marginBottom: 15 }}>Veggiee!!</Text>
        </View>

        <View style={styles.inputContainerStyle}>
          <Image
            style={styles.flagStyle}
            source={require("../../../assets/flag.jpg")}
          />
          <Text style={styles.prefixStyle}>+91 |</Text>

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder="Phone Number"
                place
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                keyboardType="phone-pad"
                value={value}
                textContentType="telephoneNumber"
                style={styles.inputStyle}
              />
            )}
            name="phoneNumber"
            rules={{
              required: true,
              minLength: 10,
              maxLength: 10,
              pattern: /^\d+$/,
            }}
            defaultValue=""
          />
        </View>

        <Button
          mode="contained"
          color={Colors.primary}
          onPress={handleSubmit(onSubmit)}
          contentStyle={{ paddingVertical: 5 }}
          style={{ margin: 20, borderRadius: 10 }}
        >
          Send OTP
        </Button>

        <Divider
          style={{
            marginVertical: 15,
            marginBottom: 25,
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.emailContainerStyle}
        >
          <MaterialIcons name="email" size={28} color="black" />
          <Text style={styles.emailTextStyle}> Continue with Email</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.oAuthTitleStyle}>Sign In With</Text>
          <View style={styles.oAuthComponentContainerStyle}>
            <FacebookSignIn setIsLoading={setIsLoading} isLoading={isLoading} />
            <GoogleSignIn setIsLoading={setIsLoading} isLoading={isLoading} />
          </View>
        </View>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={3000}
          style={{
            borderRadius: 10,
            backgroundColor: "#888",
          }}
        >
          Please give a valid number
        </Snackbar>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "white",
  },
  imageStyle: {
    width: "100%",
    height: "30%",
  },
  oAuthTitleStyle: {
    textAlign: "center",
    fontSize: 20,
    margin: 20,
    marginTop: 40,
  },
  oAuthComponentContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  inputContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    width: "90%",
    paddingVertical: 10,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#E3D7C5",
  },
  flagStyle: {
    width: 25,
    height: 18,
    borderRadius: 5,
    overflow: "hidden",
    marginLeft: 15,
  },
  prefixStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  inputStyle: {
    width: "60%",
    height: 30,
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  emailContainerStyle: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 55,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
  },
  emailTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginLeft: 25,
  },
  servicesAndPrivacyTextStyle: { color: Colors.tertiary, fontWeight: "bold" },
});

export default StartScreen;
