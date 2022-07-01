import { View, Text, Button } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import styles from "../stylesGlobal/stylesGlobalScreen";
import NewOrderForm from '../components/NewOrderForm'

const NewOrderScreen = () => {
  const navigation = useNavigation();
  return (
  <View style={styles.parentContainer}>
    <Text style={styles.textHome}>New Order</Text>
    <NewOrderForm />
    <View style={styles.button}>
      <Button
        color={"#c80210"}
        title="Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  </View>
)};

export default NewOrderScreen
