import React, { useState, useEffect } from "react";
import {
  View,
  AsyncStorage,
  Text,
  Alert,
  KeyboardAvoidingView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
// import api from "../services/api";
import logo from "../assets/images/logo.png";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) {
        navigation.navigate("Home");
      }
    });
  }, []);

  async function handleSubmit() {
    try {
      const response = await api.get(
        `/login.php?login=${user.trim()}&senha=${pass}`
      );
      const { idusuario } = response.data[0];
      const { nome } = response.data[0];
      await AsyncStorage.setItem("user", idusuario);
      await AsyncStorage.setItem("username", nome);
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Atenção.", "Usuário ou senha incorretos.");
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}> USUÁRIO *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          value={user}
          onChangeText={setUser}
        />

        <Text style={styles.label}> SENHA *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={pass}
          onChangeText={setPass}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 9
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: "#001880",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
