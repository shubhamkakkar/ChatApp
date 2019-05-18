import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

import SentMessages from "../../components/SentMessages";
import RecievedMessages from "../../components/RecievedMessages";

import io from "socket.io-client";
import axios from "axios";

import { connect } from "react-redux";
import mapStateToProps from "../mapUserIdStateToProps";

import { systemIP, backendPort } from "../../api";

const API = `http://${systemIP}:${backendPort}`;

class ChatScreenJs extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    chatMessage: "",
    SentMessages: [],
    recievedMessages: [],
    _id: undefined
  };

  callForSentMessages = async () => {
    await axios
      .get(API + "/chats/" + this.state._id)
      .then(res =>
        res.data.chat.map(msg => {
          if (msg.userMessage.message.length) {
            this.setState({
              SentMessages: [
                ...this.state.SentMessages,
                ...msg.userMessage.message
              ]
            });
          }
        })
      )
      .catch(res => console.log(res));
  };

  callForRecievedMessages = async () => {
    await axios
      .get(API + "/chats/" + this.props.userID)
      .then(res =>
        res.data.chat.map(msg => {
          if (msg.userMessage.message.length) {
            this.setState({
              recievedMessages: [
                ...this.state.recievedMessages,
                ...msg.userMessage.message
              ]
            });
          }
        })
      )
      .catch(res => console.log(res));
  };

  componentWillMount() {
    this.setState(
      {
        _id: this.props.navigation.getParam("user")._id
        // this is the id of the user who chat is just opened
      },
      () => {
        this.callForSentMessages();
        this.callForRecievedMessages();
      }
    );
  }

  componentDidMount() {
    this.socket = io(API);
    this.socket.on("chat message", msgObj => {
      if (msgObj.id !== this.state._id) {
        const { recievedMessages } = this.state;
        this.setState({
          recievedMessages: [...recievedMessages, ...msgObj.msg]
        });
      }
    });
  }
  submitChatMessage() {
    const { _id, SentMessages, chatMessage } = this.state;
    this.setState(
      {
        SentMessages: [...SentMessages, chatMessage]
      },
      () => {
        const { _id, SentMessages } = this.state;
        //re introduced state elements as else they would be the old copy and as now we just updated the state, wo want new copy
        const chatObj = {
          userId: _id,
          //this id is of sender
          userMessage: {
            message: SentMessages
          }
        };
        this.socket.emit("chat message", chatObj);
      }
    );
    this.setState({ chatMessage: "" });
  }
  handleChange = chatMessage => {
    if (chatMessage.trim().length) {
      this.setState({ chatMessage });
    } else {
      this.setState({ chatMessage: "" });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderWidth: 2 }}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => this.handleChange(chatMessage)}
        />
        {this.state.SentMessages.map((SentMessage, index) => (
          <SentMessages key={index} message={SentMessage} />
        ))}
        {this.state.recievedMessages.map((recievedMessage, index) => (
          <RecievedMessages key={index} message={recievedMessage} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "center"
  }
});

export default connect(mapStateToProps)(ChatScreenJs);
