import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f51929",
    height: 100,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textHome: {
    color: "#fff",
    margin: 20,
    fontSize: 20,
  },
  textTitle: {
    color: "#fff",
    marginTop: 40,
    fontSize: 20,
    textAlign: "center",
  },
  textMsgLoading: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "white",
    borderColor: "red",
    borderRadius: 4,
    height: 40,
    marginBottom: 6,
    padding: 10,
    width: 300,
  },
  button: {
    marginTop: 10,
    width: 300,
  },
  card: {
    marginTop: 10,
    width: 300,
  },
  image: {
    height: 65,
    marginRight: 10,
    width: 100,
  },
  cardTextContainer: {
    flexDirection: "row",
  },
  textCard: {
    color: "#f51929",
    fontSize: 12,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  
});

export default styles;
