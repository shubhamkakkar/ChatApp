import React from "react";
import { Right, Body, Left, Header, View, Icon, Text } from "native-base";
import { Constants } from "expo";

const StatusBar = props => (
  <View
    style={{
      backgroundColor: "#6174E850",
      height: Constants.statusBarHeight
    }}
  />
);

const HeaderComponent = ({ title }) => (
  <Header style={{ backgroundColor: "#6174E8" }}>
    {/* <Left><Icon name="arrow-back" style={{ color: "white" }} /></Left> */}
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white" }}> {title} </Text>
    </View>
    {/* <Right /> */}
  </Header>
);

export { StatusBar, HeaderComponent };
