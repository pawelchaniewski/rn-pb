import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import BasicButton from "./button";

class SignIn extends Component {
  state = {
    login: "",
    password: "",
    isPasswordValid: false,
    isLoginValid: false,
    canSubmit: false
  };

  /*
   * Dodaj walidację hasła: musi mieć conajmniej 8 znaków
   * canSubmit moe przyjąc true dopiero kiedy hasło jest poprawne oraz login nie jest pusty
   * niech dopiero wyswietla komunikat on change
   */

  validateForm = () => {
    this.state.canSubmit =
      this.state.isPasswordValid && this.state.isLoginValid;
    console.log(this.state.isPasswordValid && this.state.isLoginValid);
  };

  setAndValidateLogin = text => {
    const isLoginValid = text.length > 0;
    this.setState({ login: text, isLoginValid });

    this.validateForm();
  };

  setAndValidatePassword = text => {
    const isPasswordValid = text.length > 8;
    this.setState({ password: text, isPasswordValid });

    this.validateForm();
  };

  mockLogin = () => {
    console.log("Go to dashboard");
  };

  /*
   * Stworzyć mock logina
   * i hasła z przejsciem o do nowego ekranu
   *
   */

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={Platform.OS === "ios"}
      >
        <Text style={styles.title}> Zaloguj się do aplikacji</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Login"
          value={this.state.login}
          onChangeText={this.setAndValidateLogin}
          returnKeyType="next"
        />
        <TextInput
          style={[styles.inputContainer]}
          secureTextEntry
          placeholder="Hasło"
          value={this.state.password}
          // onChangeText={text => this.setState({ password: text })}
          onChangeText={this.setAndValidatePassword}
          returnKeyType="done"
        />
        {!this.state.isPasswordValid && (
          <Text style={styles.invalidPassword}>Hasło jest za krótkie</Text>
        )}
        <BasicButton
          title="Login"
          style={styles.loginButton}
          disabled={!this.state.canSubmit}
          onPress={this.mockLogin}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 32,
    justifyContent: "center"
  },
  loginButton: {
    marginTop: 16,
    backgroundColor: "#4E00B1"
  },
  inputContainer: {
    margin: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
    fontSize: 20
  },
  invalidPassword: {
    color: "red"
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center"
  }
});

export default SignIn;
