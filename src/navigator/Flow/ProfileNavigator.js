import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/Flow/Profile/ProfileScreen";
import EditProfileScreen from "../../screens/Flow/Profile/PersonalInfo/EditProfileScreen";
import AddressScreen from "../../screens/Flow/Profile/PersonalInfo/AddressScreen";
import AddAddressScreen from "../../screens/Flow/Profile/PersonalInfo/AddAddressScreen";
import SearchLocationsScreen from "../../screens/Flow/Profile/PersonalInfo/SearchLocationsScreen";
import PhoneNumberScreen from "../../screens/Flow/Profile/PersonalInfo/Edit PhoneNumber/PhoneNumberScreen";
import OTPScreen from "../../screens/Flow/Profile/PersonalInfo/Edit PhoneNumber/OTPScreen";
import OrdersScreen from "../../screens/Flow/Profile/OrdersScreen";
import OrderDetailScreen from "../../screens/Flow/Profile/OrderDetailScreen";
import PaymentMethodsScreen from "../../screens/Flow/Profile/Payments/PaymentMethodsScreen";
import AddCardScreen from "../../screens/Flow/Profile/Payments/AddCardScreen";
const ProfileStackNavigator = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStackNavigator.Screen name="Profile" component={ProfileScreen} />

      <ProfileStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />

      <ProfileStackNavigator.Screen name="Address" component={AddressScreen} />
      <ProfileStackNavigator.Screen
        name="AddAddress"
        component={AddAddressScreen}
      />
      <ProfileStackNavigator.Screen name="Orders" component={OrdersScreen} />
      <ProfileStackNavigator.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
      />
      <ProfileStackNavigator.Screen
        name="SearchLocations"
        component={SearchLocationsScreen}
      />

      <ProfileStackNavigator.Screen
        name="PhoneNumber"
        component={PhoneNumberScreen}
      />
      <ProfileStackNavigator.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
      />
      <ProfileStackNavigator.Screen name="AddCard" component={AddCardScreen} />
      <ProfileStackNavigator.Screen name="OTP" component={OTPScreen} />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileNavigator;
