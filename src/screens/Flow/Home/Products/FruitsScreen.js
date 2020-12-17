import React, { useEffect } from "react";
import { TouchableOpacity, FlatList, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Searchbar } from "react-native-paper";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
import ProductItem from "../../../../components/General/ProductItem";
import Colors from "../../../../constants/Colors";
import useSearchGrocery from "../../../../hooks/useSearchGrocery";
import ViewCart from "../../../../components/Cart/ViewCart";

const FruitsProductsScreen = ({ route, navigation }) => {
  let { title } = route.params;
  const products = useSelector((state) =>
    state.Products.products.filter(
      (product) =>
        product.Category === "Fruits" && product.subCategory === title
    )
  );

  const [getSearchedGrocery, items, setItems] = useSearchGrocery(title);

  const cartProducts = useSelector((state) => state.Cart.cartProducts);
  useEffect(() => {
    setItems(products);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 35,
              }}
            >
              <TouchableOpacity
                style={{ marginHorizontal: 15 }}
                onPress={() => navigation.goBack()}
              >
                <BackButton />
              </TouchableOpacity>
              <Header text={title} textSize={30} />
            </View>

            <Searchbar
              style={{ marginVertical: 15, marginHorizontal: 15 }}
              onChangeText={(text) => {
                getSearchedGrocery(text);
              }}
              placeholder="Search here..."
            />
          </>
        }
        renderItem={({ item }) => {
          let i = cartProducts.findIndex(
            (product) => product.productId === item._id
          );
          if (i === -1) {
            i = 0;
          } else {
            i = cartProducts[i].quantity;
          }
          return (
            <ProductItem
              name={item.name}
              indianName={item.indianName}
              imageUrl={item.imageUrl}
              price={item.price}
              quantity={i}
              category="Fruits"
              _id={item._id}
            />
          );
        }}
      />
      {cartProducts.length > 0 && <ViewCart navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
});

export default FruitsProductsScreen;
