import { configureStore } from "@reduxjs/toolkit";
import {
  userreducer,
  postOffollowingReducer,
  allUserreducer,
} from "./Reducers/user";
import {
  Mypostreducer,
  addcomment,
  addpost,
  changecaption,
  deletecomment,
  likereducer,
} from "./Reducers/post";

const store = configureStore({
  reducer: {
    user: userreducer,
    postoffollwing: postOffollowingReducer,
    allUsers: allUserreducer,
    like: likereducer,
    addcomment: addcomment,
    deletecomment: deletecomment,
    mypost: Mypostreducer,
    addpost: addpost,
    changecaption: changecaption,
  },
});

export default store;
