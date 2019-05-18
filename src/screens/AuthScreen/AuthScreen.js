import React, { PureComponent, Fragment } from "react";
import { View } from "react-native";

import { AsyncStorage } from "react-native";

import { connect } from "react-redux";
import mapDispatchToProps from "./mapDispatchToProps";

import LoginScreen from "../../containers/LoginSignup/LoginSignup";
import GoogleAuth from "../../containers/GoogleAuth/GoogleAuth";
import FacebookAuth from "../../containers/FacebookAuth/FacebookAuth";
import mapUserIdStateToProps from "../mapUserIdStateToProps";

class AuthScreen extends PureComponent {
  storeData = () => {
    try {
      AsyncStorage.getItem("userId").then(value => {
        if (value !== null) {
          this.getUserId(value);
          this.navigation("User");
        }
      });
    } catch (e) {
      // saving error
    }
  };

  componentWillMount() {
    this.storeData();
  }

  getUserId = id => {
    this.props.getUserId(id);
  };
  navigation = screen => {
    this.props.navigation.navigate(screen);
  };
  render() {
    return (
      <Fragment>
        <View style={{ flex: 3 }}>
          <LoginScreen
            navigation={this.navigation}
            getUserId={this.getUserId}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <GoogleAuth navigation={this.navigation} getUserId={this.getUserId} />
          <FacebookAuth
            navigation={this.navigation}
            getUserId={this.getUserId}
          />
        </View>
      </Fragment>
    );
  }
}

export default connect(
  mapUserIdStateToProps,
  mapDispatchToProps
)(AuthScreen);

// export default AuthScreen;
