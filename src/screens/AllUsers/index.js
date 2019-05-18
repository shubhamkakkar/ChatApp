import React, { Fragment } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";

import axios from "axios";
import { StatusBar, HeaderComponent } from "../../components/Header";
import { connect } from "react-redux";
import mapStateToProps from "../mapUserIdStateToProps";

import User from "../../components/Users";

import { systemIP, backendPort } from "../../api";

class AllUser extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    users: []
  };

  async componentWillMount() {
    //polish - add this logic in redux saga
    await axios
      .get(`http://${systemIP}:${backendPort}/users`)
      .then(res => {
        if (res.data.data.length) {
          let users = res.data.data.map(({ email, name, _id }) => ({
            email,
            name,
            _id
          }));

          users = users.filter(user => user._id !== this.props.userID);

          this.setState({ users });
        } else {
          // move to add user
        }
      })
      .catch(er => console.log("er", JSON.stringify(er)));
  }
  openChat = index => {
    this.navigate("Chat", { user: this.state.users[index] });
  };

  navigate = (screen, obj) => this.props.navigation.navigate(screen, obj);

  render() {
    const { users } = this.state;
    return (
      <Fragment>
        <StatusBar />
        <ScrollView style={{ flexGrow: 1 }}>
          <HeaderComponent title="Users" />
          <View style={{ flex: 1 }}>
            {users.length ? (
              users.map(({ name, email }, index) => (
                <User
                  key={index}
                  id={index}
                  name={name}
                  email={email}
                  openChat={this.openChat}
                />
              ))
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(AllUser);
