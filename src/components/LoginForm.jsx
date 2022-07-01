import { useState, useEffect } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styles from "../stylesGlobal/stylesGlobalScreen";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const LoginForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [postData, setPostData] = useState({});
  const [dataLogin, setDataLogin] = useState(false);
  const [auth, setAuth] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
 
  const navigation = useNavigation();

  // Enviamos la autenticación a la api 
  useEffect(() => {
    const getData = async () => {
      if (dataLogin) {
        try {
          await axios.post(
            "https://order-pizza-api.herokuapp.com/api/auth",
            postData
          );
          setAuth(true);
        } catch (error) {
          setShowAlert(true);
        }
      }
    };
    getData();
  }, [postData]);


  const onSubmit = (data) => {
    setDataLogin(true);
    setPostData(data);
    reset({
      username: "",
      password: "",
    });
  };
  return (
    <View style={styles.formContainer}>
      {auth ? (
        <>
          <Text style={styles.textHome}>Welcome</Text>
          <View style={styles.button}>
            <Button
              color={"#c80210"}
              title="Create New Order"
              onPress={() => navigation.navigate("NewOrder")}
            />
          </View>
          <View style={styles.button}>
            <Button
              color={"#c80210"}
              title="See orders exists"
              onPress={() => navigation.navigate("Orders")}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.textHome}>Enter your access data</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="User Name"
              />
            )}
            name="username"
            rules={{ required: true }}
          />
          {errors?.username?.type === "required" && (
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
                placeholder="Password"
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {errors?.password?.type === "required" && (
            <Text style={styles.textMsgLoading}>This field is required</Text>
          )}
          <View style={styles.button}>
            <Button
              color={"#c80210"}
              title="Sign In"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Error"
            message="The data entered is not valid!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Ok"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              setShowAlert(false);
            }}
          />
        </>
      )}
    </View>
  );
};

export default LoginForm;
