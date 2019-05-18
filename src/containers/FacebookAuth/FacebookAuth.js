import React, { PureComponent } from "react";
import { View, Text, Button } from "react-native";
import { Facebook } from "expo";

import SocialAuthButtonHoc from "../../components/social-auth-button-hoc";

import { systemIP, backendPort } from "../../api";

class FacebookAuth extends PureComponent {
  handleFacebookAuth = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "<App-ID>",
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        let response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        response = await response.json();
        console.log(JSON.stringify(response));

        // get name nd email from response

        //         const credentials = {
        //   name,
        //   email
        // }
        //         axios
        //         .post(`http://${systemIP}:${backendPort}/user`, credentials)
        //         .then(res => {
        //           if (res.status === 200) {
        //             this.props.navigation("User");
        //           } else {
        //             alert("Error");
        //           }
        //         })
        //         .catch(res => console.log(JSON.stringify(res)));
      } else {
        alert("Facebook Login Canceled");
      }
    } catch (er) {
      console.log(er);
      // alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <SocialAuthButtonHoc
        handleAuth={this.handleFacebookAuth}
        name="facebook"
      />
    );
  }
}

export default FacebookAuth;
