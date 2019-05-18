import React from "react";
import { Card, CardItem, Text } from "native-base";
export default ({ message }) => (
  <Card>
    <CardItem style={{ backgroundColor: "#ccc" }}>
      <Text>{message}</Text>
    </CardItem>
  </Card>
);
