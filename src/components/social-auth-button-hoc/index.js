import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default props => (
  <TouchableOpacity
    style={{
      margin: 5,
      padding: 10,
      backgroundColor: "#007aff", borderRadius: 4, flexDirection: "row",
    }}
    onPress={() => props.handelAuth()} >
    <Text style={{ color: "white" }} >Login with |</Text>
    <View style={{ marginLeft: 5, justifyContent: "center", alignItems: "center" }}>
      <FontAwesome name={props.name} size={20} color="white" />
    </View>
  </TouchableOpacity>
)