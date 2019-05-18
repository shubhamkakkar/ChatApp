import { USER_ID } from "./constants";

const getUserId = user_id => ({
  type: USER_ID,
  id: user_id
});

export { getUserId };
