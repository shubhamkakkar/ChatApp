import { USER_ID } from "../../actions/constants";

import { AsyncStorage } from "react-native";

const storeData = async id => {
  try {
    await AsyncStorage.setItem("userId", id);
  } catch (e) {
    // saving error
  }
};

export default (state = "", { type, id }) => {
  switch (type) {
    case USER_ID: {
      state = id;
      storeData(id);
      return state;
    }
    default: {
      return state;
    }
  }
};
