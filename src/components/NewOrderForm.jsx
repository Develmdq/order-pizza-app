import { useState, useEffect } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import styles from "../stylesGlobal/stylesGlobalScreen";

const LoginForm = () => {
  const [showAlert, setShowAlert] = useState(false);  
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Crust: "",
      Flavor: "",
      Size: "",
      Table_No: 5,
    },
  });
    

  //Registramos una nueva órden y resteteamos el formulario
  const onSubmit = (data) => {
     const setData = async () => {
      try {
        await axios.post(
          "https://order-pizza-api.herokuapp.com/api/orders", data
        //   "https://405e-2803-9800-9991-765e-d080-1497-7c0d-b380.ngrok.io/orders",
        //   data
         );
        setShowAlert(true);
      } catch (error) {
        console.log(error);
      }
    };
    setData();
    reset({
      Crust: "",
      Flavor: "",
      Size: "",
      Table_No: 5,
    });
  };

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Crust"
          />
        )}
        name="Crust"
        rules={{ required: true }}
      />
      {errors?.Crust?.type === "required" && (
        <Text style={styles.textMsgLoading}>This field is required</Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Flavor"
          />
        )}
        name="Flavor"
        rules={{ required: true }}
      />
      {errors?.Flavor?.type === "required" && (
        <Text style={styles.textMsgLoading}>This field is required</Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Size"
          />
        )}
        name="Size"
        rules={{ required: true }}
      />
      {errors?.Size?.type === "required" && (
        <Text style={styles.textMsgLoading}>This field is required</Text>
      )}
      <View style={styles.button}>
        <Button
          color={"#c80210"}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Success"
        message="Order created!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </View>
  );
};

export default LoginForm;
