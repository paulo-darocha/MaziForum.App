import axios from "axios";
import { serverAPI } from "./TagsService";
import { LoginResult } from "../types/User";

const serverApiUser = `${serverAPI}/users`;
const serverApiIdentity = `${serverAPI}/identity`;

export const createUser = async (data: any) => {
   const result = await axios.post(`${serverApiUser}`, data, {
      headers: { "Access-Control-Allow-Origin": `${serverAPI}/**` },
   });
   return result.data;
};

export const userLogin = async (data: any): Promise<LoginResult> => {
   const result = await axios.post(`${serverApiIdentity}/login`, data, {
      headers: { "Content-Type": "application/json" },
   });
   return result.data;
};

export const userLogout = async (): Promise<string> => {
   const result = await axios.post(`${serverApiIdentity}/logout`);
   return result.data;
};
