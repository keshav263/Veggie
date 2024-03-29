import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import Header from "../../../components/General/Header";
import { useSelector } from "react-redux";
import ProductItem from "../../../components/General/ProductItem";
import Colors from "../../../constants/Colors";
import useSearchGrocery from "../../../hooks/useSearchGrocery";
import fonts from "../../../constants/fonts";

const SearchGroceriesScreen = () => {
  const cartProducts = useSelector((state) => state.Cart.cartProducts);

  const [getSearchedGrocery, items, setItems] = useSearchGrocery("");

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 25 }}>
        <Header text="Search" textSize={30} />
        <Searchbar
          style={{
            marginVertical: 25,
            marginHorizontal: 15,
            borderRadius: 20,
            overflow: "hidden",
          }}
          placeholder="I want to buy.."
          onChangeText={(text) => {
            getSearchedGrocery(text);
          }}
        />

        {items.length === 0 && (
          <View style={styles.notFoundContainerStyle}>
            <Image
              resizeMode="contain"
              source={{
                uri: "https://img.icons8.com/nolan/2x/google-web-search.png",
              }}
              style={styles.imageStyle}
            />
            <Text style={styles.title}>
              We hope you find what you are looking for..
            </Text>
          </View>
        )}
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            let isKg;
            let i = cartProducts.findIndex(
              (product) => product._id === item._id
            );
            if (i === -1) {
              i = 0;
            } else {
              isKg = cartProducts[i].isKg;
              i = cartProducts[i].qty;
            }
            return (
              <ProductItem
                name={item.name}
                indianName={item.indianName}
                imageUrl={item.imageUrl}
                priceKg={item.priceKg}
                priceQty={item.priceQty}
                isKg={isKg}
                quantity={i}
                category={item.Category}
                _id={item._id}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bkg },
  imageStyle: { height: 200, width: 200 },
  notFoundContainerStyle: { height: 200, marginTop: 50, alignItems: "center" },
  title: {
    textAlign: "center",
    fontSize: 20,
    width: "70%",
    fontFamily: fonts.Bold,
  },
});

export default SearchGroceriesScreen;
