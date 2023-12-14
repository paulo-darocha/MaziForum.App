import { createSlice } from "@reduxjs/toolkit";

type UserPayload = {
   id: string;
   token: string;
   nickName: string;
   email: string;
   imageUrl: string;
   isLogged: boolean;
};

type UserAction = { type: string; payload: UserPayload };

const initialState: UserPayload = {
   id: "",
   token: "x",
   nickName: "(visitor)",
   email: "",
   imageUrl: "",
   isLogged: false,
};

const userSlice = createSlice({
   name: "userSlice",
   initialState,
   reducers: {
      addUser: (state: UserPayload, action: UserAction) => {
         state.id = action.payload.id;
         state.token = action.payload.token ?? "x";
         state.nickName = action.payload.nickName;
         state.email = action.payload.email;
         state.imageUrl = action.payload.imageUrl ?? "";
         state.isLogged = false;
      },
      isLogged: (
         state: UserPayload,
         action: { type: string; payload: boolean }
      ) => {
         state.isLogged = action.payload;
      },
   },
});

export const { addUser, isLogged } = userSlice.actions;
export default userSlice.reducer;
