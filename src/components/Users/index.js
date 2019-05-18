import React from "react";
import { TouchableOpacity } from "react-native";
import { ListItem, List, Text, Body, Left, Right, Title } from "native-base";

export default ({ id, name, email, openChat }) => (
  // <TouchableOpacity onPress={() => alert(id)}>
  <List>
    <ListItem avatar button={true} onPress={() => openChat(id)}>
      <Left>
        <Title style={{ color: "#43DAC6" }}> {name[0]} </Title>
      </Left>
      <Body>
        <Text style={{ color: "#6C77EE" }}>{name}</Text>
        <Text note>previus chat last msg</Text>
      </Body>
      <Right>
        <Text note>3:43 pm</Text>
      </Right>
    </ListItem>
  </List>
  // </TouchableOpacity>
);

//
