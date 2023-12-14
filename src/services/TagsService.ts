import axios from "axios";
import { Tag } from "../types/Tag";

export const server = "https://localhost:7000";
export const serverAPI = `${server}/api`;
const serverApiTags = `${serverAPI}/tags`;

export const getTagsFromApi = async (): Promise<Tag[]> => {
   const response = await axios.get(
      serverApiTags
      // , {headers: { "Access-Control-Allow-Origin": `${serverAPI}/**` },}
   );
   return response.data;
};
