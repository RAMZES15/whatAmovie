import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch {
    return;
  }
};

const initialState = loadState() || {
  isLogin: false,
  userName: null,
  userSearch: null,
  userSearchType: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLogin = true;
      saveState(state);
    },
    logOut: (state) => {
      state.isLogin = false;
      saveState(state);
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
      saveState(state);
    },
    removeUserName: (state) => {
      state.userName = null;
      saveState(state);
    },
    setUserSearch: (state, action) => {
      state.userSearch = action.payload;
      saveState(state);
    },
    setUserSearchType: (state, action) => {
      state.userSearchType = action.payload;
      saveState(state);
    },
    removeUserSearch: (state) => {
      state.userSearch = null;
      state.userSearchType = null;
      saveState(state);
    },
  }
});

export const { logIn, logOut, setUserName, removeUserName,setUserSearch, removeUserSearch, setUserSearchType } = appSlice.actions;

export default appSlice.reducer;
