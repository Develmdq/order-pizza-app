import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { Text, Card, Icon } from "@rneui/themed";
import AwesomeAlert from "react-native-awesome-alerts";
import styles from "../stylesGlobal/stylesGlobalScreen";
import Photos from "../../assets/photos";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Order = ({ order, setState }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { Crust, Flavor, Size, Table_No, Order_ID, id } = order;
  const navigation = useNavigation();
  // console.log(navigation.params)
  const Photo = Photos[Flavor];

  //Borrar una órden por su id
  useEffect(() => {
    const deleteOrder = async () => {
      if (confirmDelete) {
        try {
          await axios.delete(
            `https://order-pizza-api.herokuapp.com/api/orders/${Order_ID}`
            // `https://405e-2803-9800-9991-765e-d080-1497-7c0d-b380.ngrok.io/orders/${id}`
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    deleteOrder();
  }, [confirmDelete]);

  return (
    <View style={styles.card}>
      <Card style={styles.card}>
        <View style={styles.titleContainer}>
          <Card.Title>{Flavor}</Card.Title>
          <Icon
            raised
            size={20}
            name="trash"
            type="font-awesome"
            color="#f51929"
            onPress={() => setShowAlert(true)}
          />
        </View>
        <Card.Divider />

        <View style={styles.cardTextContainer}>
          <Image style={styles.image} resizeMode="contain" source={Photo} />
          <View>
            <Text style={styles.textCard}>
              Crust: <Text>{Crust}</Text>
            </Text>
            <Text style={styles.textCard}>
              Size: <Text>{Size}</Text>
            </Text>
            <Text style={styles.textCard}>
              Table_No: <Text>{Table_No}</Text>
            </Text>
          </View>
        </View>
      </Card>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Attention"
        message="Are you sure you want to delete this order?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        showCancelButton={true}
        confirmText="Yes, delete it"
        cancelText="No, cancel"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setConfirmDelete(true);
          setShowAlert(false);
          setState(false)//actualizamos la screen de listado de órdenes
        }}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
      />
    </View>
  );
};

export default Order;
