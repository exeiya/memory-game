import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/loginService";

export const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setInitialLogin: (state) => {
      const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
      const user = loggedUser ? { username: loggedUser.username } : null
      return user
    },
    login: (state, action) => {
      const { username, token } = action.payload
      console.log(action.payload)
      const user = { username }
      return user
    },
    logout: (state) => {
      window.localStorage.removeItem("loggedUser")
      return null
    },
  },
});

export const { login, logout, setInitialLogin } = loginSlice.actions;

export const loginUser = (user) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login(user)
    window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
    dispatch(login(loggedUser))
  } 
}

export default loginSlice.reducer;