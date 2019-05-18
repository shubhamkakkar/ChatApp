import React from "react";
import { Card, CardItem, Text } from "native-base";
export default ({ message }) => (
  <Card>
    <CardItem style={{ backgroundColor: "red" }}>
      <Text>{message}</Text>
    </CardItem>
  </Card>
);
