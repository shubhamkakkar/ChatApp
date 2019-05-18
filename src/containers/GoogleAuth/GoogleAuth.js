import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SocialAuthButtonHoc from "../../components/social-auth-button-hoc";

import { systemIP, backendPort } from "../../api";

class GoogleAuth extends PureComponent {
  handelGoogleAuth = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "<App-ID>",
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        console.log(result.user);
        const { name, email, photoUrl } = result.user;
        const password = "no password ; googleauth";
        const userDetail = { name, email };
        axios
          .post(`http://${systemIP}:${backendPort}/user`, credentials)
          .then(res => {
            if (res.status === 200) {
              this.props.navigation("User");
            } else {
              alert("Error");
            }
          })
          .catch(res => console.log(JSON.stringify(res)));
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  render() {
    return (
      <SocialAuthButtonHoc handleAuth={this.handelGoogleAuth} name="google" />
    );
  }
}

export default GoogleAuth;
