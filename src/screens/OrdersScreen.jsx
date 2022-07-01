import { useState, useEffect } from "react";
import { Text, View, ScrollView, Button, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../stylesGlobal/stylesGlobalScreen";
import Order from "../components/Order";
import axios from "axios";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]); //Estado del listado de órdenes
  const [state, setState] = useState(false); // Rerender del componente
  const [loading, setLoading] = useState(false) //Estado del spinner
  const navigation = useNavigation();

  // Traer el listado de órdenes
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const result = await axios.get(
          "https://order-pizza-api.herokuapp.com/api/orders"
          // "https://405e-2803-9800-9991-765e-d080-1497-7c0d-b380.ngrok.io/orders"
        );
        setOrders(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [state]);

  console.log(orders.length)
   
  return (
    <View style={styles.parentContainer}>
      {loading && <ActivityIndicator /> }
      {orders.length === 0 && (
        <Text style={styles.textHome}>There are no orders to show</Text>
      )}

      <View style={styles.orderListContainer}>
        <Text style={styles.textTitle}>Order List</Text>
        <ScrollView>
          <View>
            {orders.map((order) => (
              //:Todo cambiar id por  Order_ID
              <Order key={order.id} order={order} setState={setState} />
            ))}
          </View>
          <View style={styles.button}>
            <Button
              color={"#c80210"}
              title="Back"
              onPress={() => navigation.goBack()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default OrdersScreen;
