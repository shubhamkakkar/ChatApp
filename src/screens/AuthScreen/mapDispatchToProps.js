import { getUserId } from "../../store/actions/actions";

export default dispatch => ({
  getUserId: id => dispatch(getUserId(id))
});
