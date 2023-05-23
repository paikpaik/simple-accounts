/*
  *****************************************************************************
  *                         redux만을 이용한 상태관리                          *
  ***************************************************************************** 
*/
/*
import React from "react";
import Accounts from "../Component/Accounts";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// 초기상태설정
const initialState = {
  users: [],
  globalID: 0,
};

function reducer(state, action) {
  switch (action.type) {
    // 지시사항에 따라 계정 정보 관리를 위한 reducer를 정의.
    case "accounts/register":
      return {
        ...state,
        users: [
          ...state.users,
          {
            key: state.globalID,
            id: action.payload.id,
            password: action.payload.password,
          },
        ],
        globalID: state.globalID + 1
      };
    case "accounts/delete":
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id),
      };
    default:
      return state;
  }
}

// 초기 상태와 정의한 reducer로 store를 구성.
const store = createStore(reducer, initialState);

const ACCOUNTS_REGISTER = "accounts/register";
const ACCOUNTS_DELETE = "accounts/delete";

export const ACTIONS = {
  // registerUser와 deleteUser 액션 생성함수를 정의.
  registerUser: (id, pwd) => ({
    type: ACCOUNTS_REGISTER,
    payload: {
      id: id,
      password: pwd,
    },
  }),
  deleteUser: (id) => ({
    type: ACCOUNTS_DELETE,
    payload: {
      id: id
    },
  }),
};

// selector를 정의하고 export.
export const usersSelector = (state) => state.users;

export default function AccountsContainer() {
  // Accounts 컴포넌트가 store에 접근할 수 있도록 코드를 추가.
  return (
    <Provider store={store}>
      <Accounts />
    </Provider>
  );
}
*/
/*
  *****************************************************************************
  *                      redux-toolkit을 이용한 상태관리                       *
  ***************************************************************************** 
*/
import React from "react";
import Accounts from "../Component/Accounts";
import { Provider } from "react-redux";
import { createSlice, configureStore } from '@reduxjs/toolkit';

// 초기상태설정
const initialState = {
  users: [],
  globalID: 0,
};

// createSlice를 사용해 slice를 생성.
const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    register(state, action) {
      state.users = [
        ...state.users,
        {
          key: state.globalID,
          id: action.payload.id,
          password: action.payload.password,
        },
      ];
      state.globalID++
    },
    delete(state, action){
      state.users = state.users.filter(user => user.id !== action.payload.id);
    },
  },
})

// configureStore를 사용해 store를 구성.
const store = configureStore({ reducer: accountsSlice.reducer });

// slice를 참고해 2가지 action 생성함수를 export.
export const ACTIONS = {
  registerUser: accountsSlice.actions.register,
  deleteUser: accountsSlice.actions.delete,
};

export const usersSelector = (state) => state.users;

export default function AccountsContainer() {
  return (
    <Provider store={store}>
      <Accounts />
    </Provider>
  );
}